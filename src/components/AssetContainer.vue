<template>
  <div>
    <v-container fluid>
      <v-card>
        <v-card-title >
          <v-row >
            <v-col class="d-flex justify-end align-center xs-10">
              <div class="headline font-weight-bold">Megaphone</div>
            </v-col>
            <v-col class="d-flex justify-center align-center xs-2">
              <v-avatar>
                <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  alt="John"
                />
              </v-avatar>
              <div class="ml-2">
              {{ agentData.name }}
              </div>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-row no-gutters>
            <!-- List -->
            <v-col cols="12" md="3" order="2" order-md="1">
              <v-card :height="height" class="scroll">
                <v-card-text>
                  <v-text-field
                    v-for="item in listingData"
                    dense
                    v-model="item.value"
                    :label="item.label"
                    outlined
                    :key="item.id"
                  ></v-text-field>
                </v-card-text>
              </v-card>
              <v-row class="mt-4" justify="space-around">
                <v-btn color="primary" rounded outlined class="font-weight-bold">Cancel</v-btn>
                <v-btn color="error" rounded outlined class="font-weight-bold"> Preview</v-btn>
              </v-row>
            </v-col>
            <!-- Preview -->

            <v-col cols="12" md="8" order="1" order-md="2">
              <v-img
                lazy-src="https://picsum.photos/id/11/10/6"
                src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=1867&q=80"
                aspect-ratio="1.2"
                :height="height"
                :min-height="height"
                min-width="100%"
              ></v-img
            ></v-col>
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
export default {
  name: "AssetContainer",
  props: {
    listingData: {
      type: Object,
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
    partData: {
      type: Object,
      default: () => dataJson[0].part,
    },
  },
  computed: {
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
  },
};
</script>

<style lang="scss" scoped>
.scroll {
  overflow-y: scroll;
}
</style>