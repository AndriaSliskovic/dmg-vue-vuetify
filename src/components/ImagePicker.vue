<template>
  <div class="mb-6">
    <v-menu :close-on-content-click="closeOnClick" :close-on-click="false">
      <template v-slot:activator="{ on: menu }">
        <v-btn color="primary" @click="getAllImages" v-on="menu" >
          Pick image
        </v-btn>
      </template>
      <v-card>
        <v-card-title v-show="imagesToPreview">
          <v-row justify="start" class="mt-2">
            <v-btn color="error" @click="onCloseHandler" class="mx-2"
              >Cancel</v-btn
            >
            <v-btn color="primary" @click="onSubmitHandler">Submit</v-btn>
          </v-row>
        </v-card-title>
        <v-row justify="start" class="px-4">
          <v-col
            :cols="imgSizes.numberOfColums"
            v-for="img in imagesToPreview"
            v-bind:key="img.id"
          >
            <ImageCardPicker
              :img="img"
              :imgSizes="imgSizes"
              @status="onClickHandler"
            ></ImageCardPicker>
          </v-col>
        </v-row>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
// import axiosClient from '@/api/httpClient'
import axios from "axios";
import ImageCardPicker from "@/components/ImageCardPicker.vue";

export default {
  data() {
    return {
      domain: process.env.VUE_APP_API_DOMAIN,
      picsumPath: "https://picsum.photos/v2/list",
      imagesToPreview: null,
      selectedImages: [],
      closeOnClick: false,
      selected: null,
      multiple: false,
    };
  },
  components: {
    ImageCardPicker,
  },
  methods: {
    onClickHandler(id) {
      let selected = this.imagesToPreview.find((el) => el.id == id);
      //If image has not status
      if (!selected.status) {
        this.$set(selected, "status", true);
        console.log("on click selected", selected.status);
        //in single mode - unselect previus
        if (!this.multiple && this.selected && this.selected.id != id) {
          console.log("if selected", selected.id);
          this.unselectImage(this.selected.id);
        }
        //Last selected item
        this.selected = selected;
        // in multiple mode
        if (this.multiple) {
          this.setSelectedImages(id);
        }
      } else {
        this.$set(selected, "status", false);
        // in multiple mode
        if (this.multiple) {
          this.selectedImages = this.selectedImages.filter((el) => el !== id);
        }
      }
      this.imagesToPreview
        .filter((e) => e.id === selected.id)
        .map((el) => (el = selected));
    },
    setSelectedImages(id) {
      this.selectedImages.push(id);
      //Add unique ids in array
      this.selectedImages = [...new Set(this.selectedImages)];
    },
    unselectImage(id) {
      this.imagesToPreview
        .filter((e) => e.id === id)
        .map((el) => (el["status"] = false));
    },
    async getAllImages() {
      this.closeOnClick = false;
      if (this.endPoint) {
        await this.client.get(this.endPoint).then((response) => {
          this.imagesToPreview = response.data;
          this.addPathToImgFile();
        });
      } else {
        //Fake image server
        console.log("else getAllImages");
        await axios.get(this.picsumPath).then((response) => {
          console.log("respose picsum", response);
          this.imagesToPreview = response.data;
          this.addPathToImgFile();
        });
      }
    },
    addPathToImgFile() {
      //If endPoint is defined
      if (this.endPoint) {
        for (const img of this.imagesToPreview) {
          let path = domain + this.endPoint + "/" + img.fileName;
          this.$set(img, "imgPath", path);
        }
      } else {
        for (const img of this.imagesToPreview) {
          let path = img.download_url;
          this.$set(img, "imgPath", path);
        }
      }
    },
    onCloseHandler() {
      this.closeOnClick = true;
      this.imagesToPreview = null;
      this.selectedImages = [];
    },
    onSubmitHandler() {
      if (this.multiple) {
        console.log("submit multiple", this.selectedImages);
        //Handle array of objects
      } else {
        console.log("single", this.selected);
      }
    },
  },
  computed: {
    // client: function () {
    //   return axiosClient(this.baseUrl)
    // },
    // baseUrl: function () {
    //   if (this.endPoint) {
    //     return process.env.VUE_APP_BACKEND_URL
    //   }
    //   return this.picsumPath
    // },
    imgSizes() {
      //const containerHeight = this.bPoint.height / 3
      const imgHeight = function (mobile, height) {
        if (mobile) {
          return height / 8;
        } else {
          return height / 4;
        }
      };
      const numberOfColums = function (mobile) {
        // return mobile
        if (mobile) {
          return 4;
        } else {
          return 2;
        }
      };
      const obj = {
        imgHeight: imgHeight(
          this.$vuetify.breakpoint.mobile,
          this.$vuetify.breakpoint.height
        ),
        numberOfColums: numberOfColums(this.$vuetify.breakpoint.mobile),
      };
      return obj;
    },
    bPoint() {
      return this.$vuetify.breakpoint;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
