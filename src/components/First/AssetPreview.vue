<template>
<div>
  <h1>Asset Preview</h1>
  <div class="imgCentered">
    <img :src="image.value" />
    <div class="imgTextCentered">
      <p>{{ name }}</p>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: "AssetPreview",
  props: {
    agent: {
      type: Object,
      required: true
    },
    image: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      name: ""
    };
  },
  mounted() {
    console.log("Ovde:", this.agent)
    this.name = this.agent.value;
  }
};
</script>

<style lang="scss" scoped>
.imgCentered {
  position: relative;
  text-align: center;
  img {
    width: 100%;
  }
}

.imgTextCentered {
  position: absolute;
  top: 8px;
  right: 16px;

  p {
    font-size: 36px;
    font-weight: bold;
    color: black;
  }
}
</style>
