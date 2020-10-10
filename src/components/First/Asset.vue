<template>
<div>
  <div v-if="asset.loading || !showPreview" class="centered">
    <Spinner />
  </div>

  <div v-if="!asset.loading && asset.error" class="centered">
    <Error :message="asset.error" />
  </div>

  <div
    v-if="asset.data !== null && showPreview && !widgetCompleted"
    class="row"
  >
    <div class="column column-30">
      <AssetEditor
        :asset="asset.data"
        @refresh-preview="refreshPreview"
        @asset-saved="assetSaved"
      />
    </div>
    <div class="column column-70">
      <AssetPreview :image="asset.data.image" :agent="asset.data.fullname" />
    </div>
  </div>

  <div v-if="widgetCompleted" class="centered">
    <Success />
  </div>
  </div>
</template>

<script>
import { computed, ref } from '@vue/composition-api'
import useFetch from "@/hooks/fetch";
import Spinner from "@/components/First/Spinner";
import Error from "@/components/First/Error";
import Success from "@/components/First/Success";
import AssetEditor from "@/components/First/AssetEditor";
import AssetPreview from "@/components/First/AssetPreview";

export default {
  name: "Asset",
  components: { Spinner, Error, Success, AssetEditor, AssetPreview },
  props: {
    assetId: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const assetId = ref(props.assetId);
    const showPreview = ref(true);
    const widgetCompleted = ref(false);
    const getAssetUrl = computed(
      () => `${process.env.VUE_APP_API_URL}/?id=${assetId.value}`
    );

    const asset = useFetch(getAssetUrl);

    function refreshPreview(data) {
      // Only for proof of concept.
      showPreview.value = false;
      setTimeout(function() {
        asset.data.fullname = data.fullname;
        showPreview.value = true;
      }, 500);
    }

    function assetSaved() {
      widgetCompleted.value = true;
    }

    return {
      asset,
      showPreview,
      widgetCompleted,
      refreshPreview,
      assetSaved
    };
  }
};
</script>

<style lang="scss" scoped>
.row {
  width: 90%;
  margin: 0 auto;
}

.row::after {
  content: "";
  display: table;
  clear: both;
}

.column {
  float: left;
  height: 100vh;
  padding: 10px;
}

.column-30 {
  width: 30%;
}

.column-70 {
  width: 70%;
}

img {
  width: 100%;
}
</style>
