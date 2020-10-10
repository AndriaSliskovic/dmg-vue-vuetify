<template>
  <div class="success">
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
      default: "Success!"
    }
  }
};
</script>

<style lang="scss" scoped>
.success {
  display: block;
  padding: 48px;
  border: 2px solid #4caf50;
  border-radius: 3px;
  h2 {
    color: #4caf50;
  }
}
</style>
