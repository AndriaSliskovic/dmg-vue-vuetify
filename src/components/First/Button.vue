<template>
  <button @click="handleClick">
    <div v-if="loading" class="button-spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div v-else-if="finished" class="button-finished">
      <p>Finished</p>
    </div>
    <div v-else>
      {{ text }}
    </div>
  </button>
</template>

<script>
export default {
  name: "SubmitButton",
  props: {
    text: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      finished: false
    };
  },
  methods: {
    handleClick() {
      this.loading = true;
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  display: inline-block;
  background-color: #eee;
  border: 1px solid #ccc;
  border-radius: 2px;
  color: #444;
  cursor: pointer;
  font-size: 18px;
  font-weight: 500;
  margin: 3px;
  padding: 10px;
}

button:hover {
  background-color: #ccc;
  color: black;
}

.button-finished {
  color: #4caf50;
}

.button-spinner {
  display: inline-block;
  position: relative;
  width: 40px;
  height: 40px;

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 24px;
    height: 24px;
    margin: 8px;
    border: 8px solid #03a9f4;
    border-radius: 50%;
    animation: circle-spinner 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #03a9f4 transparent transparent transparent;
  }

  div:nth-child(1) {
    animation-delay: -0.45s;
  }

  div:nth-child(2) {
    animation-delay: -0.3s;
  }

  div:nth-child(3) {
    animation-delay: -0.15s;
  }
}

@keyframes circle-spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
