<template>
  <div>
    <v-container fluid>
      <v-card>
        <v-card color="primary" dark>
          <v-row align="center">
            <v-col cols="2">
              <v-btn color="error" text tile large @click="goBack">
                <v-icon left :dense="bPoint.xsOnly"> mdi-arrow-left </v-icon>
                <span
                  v-if="!bPoint.xsOnly"
                  :class="`ml-2 text-${sizes.standardText} font-weight-bold`"
                >
                  back
                </span>
              </v-btn>
            </v-col>
            <v-col cols="7" class="d-flex justify-center align-center">
              <div :class="`ml-2 text-${sizes.headerText} font-weight-bold`">
                Megaphone header
              </div>
            </v-col>
            <v-col cols="2" class="d-flex justify-center align-center">
              <v-avatar :size="sizes.avatarSize">
                <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  alt="John"
                />
              </v-avatar>
              <span
                :class="`ml-2 text-${sizes.standardText}`"
                v-if="!bPoint.xsOnly"
              >
                {{ agentData.name }}
              </span>
            </v-col>
          </v-row>
        </v-card>
        <v-card-text>
          <v-row no-gutters>
            <!-- List -->
            <v-col cols="12" md="3" order="2" order-md="1">
              <ValidationObserver
                ref="observer"
                v-slot="{ handleSubmit, invalid }"
              >
                <form @submit.prevent="handleSubmit(onSubmitEvent)" id="form">
                  <v-card :height="height" class="scroll">
                    <v-card-text>
                      <div v-for="(item, index) of listingData" :key="index">
                        <template v-if="item.Type === 'TextBox'">
                          <ValidationProvider
                            v-slot="{ errors }"
                            :name="item.VariableName"
                            :vid="`${item.Type}` + `${index}`"
                            :rules="item.rules"
                          >
                            <v-text-field
                              dense
                              outlined
                              v-model="item.Value"
                              :label="item.VariableName"
                              :disabled="item.disabled"
                              :error-messages="errors"
                              :id="`${item.Type}` + `${index}`"
                            ></v-text-field>
                          </ValidationProvider>
                        </template>
                        <template
                          v-if="item.type === 'text_area' && !item.hiden"
                        >
                          <v-textarea
                            dense
                            flat
                            auto-grow
                            outlined
                            placeholder="Insert comment"
                            :name="item.id"
                            :label="item.label"
                            :disabled="item.disabled"
                            :rules="[
                              (v) =>
                                (v || '').length <= 200 ||
                                'Description must be 200 characters or less',
                            ]"
                            :value="item.value"
                          ></v-textarea>
                        </template>
                      </div>
                      <template>
                        <ImageUploadSimple></ImageUploadSimple>
                      </template>
                    </v-card-text>
                  </v-card>
                  <v-row class="mt-4" justify="space-around">
                    <v-btn
                      color="primary"
                      rounded
                      outlined
                      class="font-weight-bold"
                      :disabled="invalid"
                      @click="onSubmitEvent"
                      >Save</v-btn
                    >
                    <v-btn
                      color="error"
                      rounded
                      outlined
                      class="font-weight-bold"
                      @click="onPreviewEvent"
                    >
                      Preview</v-btn
                    >
                  </v-row>
                </form>
              </ValidationObserver>
            </v-col>

            <!-- Preview -->
            <v-col cols="12" md="9" order="1" order-md="2" class="px-2 pb-2">
              <v-card :height="height" class="scroll">
                <div v-if="loading">
                  <v-progress-circular
                    :size="50"
                    color="primary"
                    indeterminate
                    class="centered"
                  ></v-progress-circular>
                  <!-- <v-skeleton-loader
                  class="mx-auto"
                  type="card@2"
                  elevation="2"
                  min-height="1000"
                  width="auto"
                ></v-skeleton-loader> -->
                </div>
                <div v-else-if="!loading && previewFileTypesExtension === 'pdf'">
                  <v-row justify="center">
                    <v-btn
                      @click="changePdfPage(0)"
                      color="primary"
                      class="mx-2"
                      >Prew</v-btn
                    >
                    <v-btn
                      @click="changePdfPage(1)"
                      color="primary"
                      class="mx-2"
                      >next</v-btn
                    >
                  </v-row>

                  <pdf
                    :src="previewFile"
                    :page="currentPage"
                    @num-pages="pageCount = $event"
                    @page-loaded="currentPage = $event"
                    @loaded="loadPdfHandler"
                  >
                  </pdf>
                </div>
                <div v-else>
                  <v-img
                    lazy-src="https://picsum.photos/id/11/10/6"
                    :src="previewFile"
                    aspect-ratio="1.7"
                    :height="height"
                    :min-height="height"
                  ></v-img>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-footer padless>
        <v-col class="text-center" cols="12">
          {{ new Date().getFullYear() }} — <strong>Megaphone</strong>
        </v-col>
      </v-footer>
    </v-container>
  </div>
</template>

<script>
import dataJson from "@/resources/dataSource.json";
import data from "@/resources/data.json";
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import { required, email, max } from "vee-validate/dist/rules";
import ImagePicker from "@/components/ImagePicker.vue";
import ImageUploadSimple from "@/components/ImageUploadSimple.vue";
import ImageUpload from "@/components/ImageUpload.vue";
import pdf from "vue-pdf";

extend("max", max);
extend("email", email);
extend("required", {
  validate(value) {
    return {
      required: true,
      valid: ["", null, undefined].indexOf(value) === -1,
    };
  },
  computesRequired: true,
});

export default {
  name: "AssetContainer",
  components: {
    ValidationProvider,
    ValidationObserver,
    ImagePicker,
    ImageUploadSimple,
    ImageUpload,
    pdf,
  },
  data() {
    return {
      loading: true,
      currentPage: 0,
      pageCount: 0,
      //   pdfFile:
      //     '"https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=1867&q=80"',
      //   pdfLink:
      //     "http://www.nsz.gov.rs/live/digitalAssets/0/106_Propratno_pismo_i_Kontaktno_pismo.pdf",
      //   pdfLocal: "./pdf/Test.pdf",
    };
  },
  props: {
    listingData: {
      type: Array,
      default: () => dataJson[0].listData,
    },
    agentData: {
      type: Object,
      default: () => dataJson[0].agentData1,
    },
    statusData: {
      type: Object,
      default: () => dataJson[0].statusData,
    },
    previewFile: {
      type: String,
    },
  },
  methods: {
    loadPdfHandler() {
      this.currentPage = 1;
    },
    changePdfPage(val) {
      // console.log(val)
      if (val === 0 && this.currentPage > 1) {
        this.currentPage--;
        // console.log(this.currentPage)
      }
      if (val === 1 && this.currentPage < this.pageCount) {
        this.currentPage++;
        // console.log(this.currentPage)
      }
    },
    onSubmitEvent() {
      console.log("form is submited");
    },
    onPreviewEvent() {
      this.loading = true;
      if (process.env.NODE_ENV === "development") {
        setTimeout(() => {
          this.loading = false;
        }, 500);
      }
    },
    goBack() {
      window.history.back();
    },
  },
  computed: {
    sizes() {
      const bpName = this.$vuetify.breakpoint.name;
      switch (bpName) {
        case "xs":
          return {
            headerText: bpName + "-body-1",
            avatarSize: 25,
            standardText: bpName + "-body-1",
          };
        case "sm":
          return {
            headerText: bpName + "-subtitle-1",
            avatarSize: 30,
            standardText: bpName + "-body-1",
          };
        case "md":
          return {
            headerText: bpName + "-h5",
            avatarSize: 35,
            standardText: bpName + "-body-1",
          };
        case "lg":
          return {
            headerText: bpName + "-h4",
            avatarSize: 40,
            standardText: bpName + "-subtitle-1",
          };
        case "xl":
          return {
            headerText: bpName + "-h3",
            avatarSize: 45,
            standardText: bpName + "-subtitle-1",
          };
      }
    },
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 220;
        case "sm":
          return 400;
        case "md":
          return 500;
        case "lg":
          return 600;
        case "xl":
          return 800;
      }
    },
    bPoint() {
      return this.$vuetify.breakpoint;
    },
    previewFileTypesExtension() {
      const re = /(?:\.([^.]+))?$/;
      const ext = re.exec(this.previewFile)[1];
      return ext;
    },
  },
  watch: {
    previewFile: {
      handler() {
        this.loading = false;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.scroll {
  overflow-y: scroll;
}
.centered {
  position: fixed;
  top: 50%;
  left: 60%;
  transform: translate(-50%, -50%);
}
</style>
