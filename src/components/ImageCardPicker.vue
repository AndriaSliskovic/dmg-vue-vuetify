<template>
  <v-card >
    <v-img
      :src="img.imgPath"
      lazy-src="https://picsum.photos/id/11/60/60"
      @click="onClickImage(img.id)"
      :height="imgSizes.imgHeight"
    >
      <template v-if="statusImg">
        <BaseIconStatus :x_small="true" :status="statusImg" :falseStatus="true"></BaseIconStatus>
      </template>

      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular indeterminate color="secondary"></v-progress-circular>
        </v-row>
      </template>
    </v-img>
  </v-card>
</template>

<script>
import BaseIconStatus from '@/components/BaseIconStatus'
export default {
  components: {
    BaseIconStatus
  },
  props: {
    img: Object,
    imgSizes:Object
  },

  methods: {
    onClickImage(id){
      this.$emit("status",id)
    }
  },
  computed: {
    statusImg: function() {
      return this.img.status
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
