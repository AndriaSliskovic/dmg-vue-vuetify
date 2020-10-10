<template>
  <v-app>
    <v-main>
      <v-content>
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
        v-if="!loaded"
        class="centered"
      ></v-progress-circular>
      <template v-else> <AssetContainer /> </template>
      </v-content>
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

export default {
  name: "App",
  data() {
    return {
      loaded: false,
      apiKey: "TestKey",
      listingId: 2,
      AgentId: 1,
      statusId: 3,
      partID: 15,
      id: null,
    };
  },
  methods: {
    getApiKey() {},
    getListingData() {},
    getAgentData() {},
    getStatusData() {},
    getPartData() {},
  },
  computed() {},
  mounted() {
    window.initiateAssetWidget = (assetId) => {
      if (assetId) {
        this.id = assetId;
        this.loaded = true;
      } else {
        this.id = null;
        this.loaded = false;
        throw new Error("Missing required parameter [assetId]");
      }
    };

    if (process.env.NODE_ENV === "development") {
      setTimeout(() => {
        window.initiateAssetWidget(2);
      }, 1500);
    }
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
