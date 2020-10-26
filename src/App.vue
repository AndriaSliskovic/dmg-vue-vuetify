<template>
  <v-app>
    <v-main>
      <!-- <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
        v-if="!loaded"
        class="centered"
      ></v-progress-circular>
      <template v-else> <AssetContainer :listingData="assets" :previewFile="previewFile"/> </template> -->
      <dmg-button></dmg-button>
    </v-main>
  </v-app>
</template>

    </v-main>
  </v-app>
</template>

<script>
import { ref, reactive } from "@vue/composition-api";
import dataJson from "@/resources/dataSource.json";
import AssetContainer from "@/components/AssetContainer.vue";
import authService from "@/api/authService.js";
import assetService from "@/api/assetService.js";

export default {
  name: "App",
  data() {
    return {
      loaded: false,
      apiKey: null,
      credentials: {
        Username: "remax_dmg_api",
        Password: "0v9B#FMM",
      },
      assetId: "c013bef4-8cd6-41df-bcf7-91007336add0",
      assets: null,
      previewFile: null,
    };
  },
  created() {
    this.getDataFromServer(this.credentials);
  },
  methods: {
    getDataFromServer(authObj) {
      authService
        .getToken(authObj)
        .then((res) => (this.apiKey = res.data.token))
        .then(() => this.setUserDataToLocalStorage())
        .then(() => this.getwidgetData())
        .then(() => (this.loaded = true))
        .catch((error) => {
          console.log("There was an error on auth:", error.response);
        });
    },
    setUserDataToLocalStorage() {
      localStorage.setItem("user", this.apiKey);
    },
    getwidgetData() {
      const object = {
        token: this.apiKey,
        id: this.assetId,
      };
      console.log("getwidgetData", this.apiKey, object);
      assetService
        .getAssets(object)
        .then((res) => {
          this.assets = res.data.asset;
          this.previewFile = res.data.previewFile;
        })
        .catch((error) =>
          console.log("There was an error on assets:", error.response)
        );
    },
  },

  mounted() {
    // window.initiateAssetWidget = (assetId) => {
    //   if (assetId) {
    //     this.id = assetId;
    //     this.loaded = true;
    //   } else {
    //     this.id = null;
    //     this.loaded = false;
    //     throw new Error("Missing required parameter [assetId]");
    //   }
    // };
    // if (process.env.NODE_ENV === "development") {
    //   setTimeout(() => {
    //     window.initiateAssetWidget(2);
    //   }, 1500);
    // }
  },

  components: { AssetContainer },
};
</script>
<style scoped>
.centered {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
