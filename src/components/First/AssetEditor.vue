<template>
  <form class="assetForm" ref="assetForm">
    <h1>Edit Your Asset</h1>
    <div v-for="(element, index) in Object.keys(elements)" :key="index">
      <section
        v-if="elements[element].type === 'textbox' && !elements[element].hidden"
      >
        <label :for="element">{{ asset[element].label }}</label>
        <input
          v-model="elements[element].value"
          :required="asset[element].required"
          :disabled="asset[element].disabled"
          :id="element"
          type="text"
        />
      </section>
    </div>
    <SubmitButton @click="handleFormSubmit" text="Save" ref="saveButton" />
    <SubmitButton @click="preview" text="Preview" ref="previewButton" />
  </form>
</template>

<script>
import SubmitButton from "@/components/First/Button.vue";

export default {
  name: "AssetEditor",
  components: { SubmitButton },
  props: {
    asset: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      elements: {}
    };
  },
  mounted() {
    this.elements = this.asset;
  },
  methods: {
    handleFormSubmit(event) {
      const form = this.$refs.assetForm;
      const saveButton = this.$refs.saveButton;
      if (form.checkValidity()) {
        event.preventDefault();
        setTimeout(() => {
          saveButton.loading = false;
          saveButton.finished = true;
          this.$emit("asset-saved", this.asset);
        }, 1000);
      }
    },
    preview(event) {
      const form = this.$refs.assetForm;
      const previewButton = this.$refs.previewButton;
      if (form.checkValidity()) {
        event.preventDefault();
        setTimeout(() => {
          previewButton.loading = false;
          previewButton.finished = true;
          this.$emit("refresh-preview", this.asset);
        }, 1000);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
label {
  font-weight: bold;
}

input {
  display: block;
  width: 100%;
  padding: 6px;
  margin-bottom: 12px;
}
</style>
