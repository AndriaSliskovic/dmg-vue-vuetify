<template>
  <v-btn fab dark :small="small" :x-small="x_small" :color="color"  @click="onCloseDialogHandler">
    <v-icon>close</v-icon>
  </v-btn>
</template>
<script>
import { type } from 'os'
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
    color: {
      type: String,
      default: 'secondary'
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
  }
}
</script>
