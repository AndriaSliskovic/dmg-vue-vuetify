<template>
  <div class="error">
    <h2>
      {{ message }}
    </h2>
  </div>
</template>

<script>
export default {
  name: "Error",
  props: {
    message: {
      type: String,
      default:
        "Ooops. We have encountered an error. We can not load the widget at this moment. Please try again later!"
    }
  }
}
</script>

<style lang="scss" scoped>
.error {
  display: block;
  padding: 48px;
  border: 2px solid #d32f2f;
  border-radius: 3px;
  h2 {
    color: #d32f2f;
  }
}
</style>
