<template>
  <v-btn fab dark :small="small" :x-small="x_small" :color="color"  @click="onCloseDialogHandler" >
    <template v-if="status">
    <v-icon >mdi-check</v-icon>
    </template>
    <template v-else>
      <v-icon v-if="falseStatus">close</v-icon>
    </template>
  </v-btn>
</template>
<script>
export default {
  props: {
    small: {
      type: Boolean,
      default: false
    },
    x_small: {
      type: Boolean,
      default: false
    },
    status: {
      type: Boolean,
      default: false
    },
    falseStatus: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onCloseDialogHandler: function() {
      this.$emit('close', false)
      //Reset validation
      if (this.$v) {
        this.$v.$reset()
      }
    }
  },
  computed: {
    color() {
      if (!this.status) {
        return 'red'
      }
      return 'success'
    }
  }
}
</script>
