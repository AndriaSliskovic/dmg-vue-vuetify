<template>
  <div>
      <ValidationObserver ref="imageObserver">
        <ValidationProvider
          mode="lazy"
          :name="name"
          :vid="name"
          rules="required|ext:jpg,png"
          v-slot="{errors}"
          ref="provider"
        >
          <v-file-input
            :error-messages="errors"
            v-model="choosenFile"
            @focus="validate"
            :multiple="multiple"
            :label="label"
            @click="clickedImageUpload=true"
            class="fileInputOveride"
          ></v-file-input>
          <template v-if="uploadedFiles">
            <v-row justify="start" align="center" no-gutters dense>
              <v-col cols="2" v-for="(imageSrc,index) in imagesToDisplay" v-bind:key="index">
                  <v-img
                    :src="imageSrc"
                    lazy-src="https://picsum.photos/id/11/60/60"
                    aspect-ratio="1"
                    max-height="80"
                    contain
                  >
                    <template>
                      <base-icon-close :x_small="true" @close="deleteImage(index)"></base-icon-close>
                    </template>
                    <template v-slot:placeholder>
                      <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="secondary"></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
              </v-col>
            </v-row>
          </template>
        </ValidationProvider>
      </ValidationObserver>
  </div>
</template>
<script>
// import httpClient from '@/api/httpClient'
import axios from "axios";
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required, ext } from 'vee-validate/dist/rules'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    BaseIconClose: () => import('@/components/BaseIconClose')
  },
  data() {
    return {
      uploadedFiles: [],
      content: null,
      choosenFile: null,
      initialLoadForEdit: true,
      clickedImageUpload: false
    }
  },
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    uploadType: {
      type: Number,
      default: 0
    },
    label: String,
    uploadFolder: String,
    rules: Object,
    value: String,
    name: String,
    clearData: Number
  },
  methods: {
    validate() {
      this.$refs.provider.validate(this.choosenFile)
    },
    makeFormData(imageData) {
      const formData = new FormData()
      formData.append('fileType', this.uploadType)
      if (!this.multiple) {
        formData.append('file', imageData[0])
      } else {
        for (let file of imageData) {
          formData.append('files', file)
        }
      }
      return formData
    },
    //based on multiplicity, this form control is going to dispatch single or multiple files as its input
    uploadImage(formData) {
      axios.post(this.endPoint, formData).then(response => {
        this.uploadedFiles = []
        if (!this.multiple) {
          this.uploadedFiles.push(response.data.fileName)
          this.content = this.uploadedFiles[0]
        } else {
          for (let fileName of response.data.fileNames) {
            this.uploadedFiles.push(fileName)
            this.content = this.uploadedFiles
          }
        }
      })
    },
    deleteImage(index) {
      const imgName = this.uploadedFiles[index]
      axios.delete(this.baseUrl + 'api/file/' + imgName)
    }
  },
  computed: {
    baseUrl: function() {
      return process.env.VUE_APP_BACKEND_URL
    },
    imagesToDisplay: function() {
      const imgSrc = []
      for (const img of this.uploadedFiles) {
        let path = this.imagesResourcePath + '/' + img
        imgSrc.push(path)
      }
      return imgSrc
    },
    endPoint: function() {
      return this.multiple ? 'file/batchUpload' : 'file'
    },
    imagesResourcePath: function() {
      return process.env.VUE_APP_API_DOMAIN + '/' + this.uploadFolder
    }
  },
  watch: {
    value: {
      handler() {
        if (this.value != null && this.initialLoadForEdit) {
          this.content = this.value
          this.uploadedFiles.push(this.value)
          this.choosenFile = new File([], this.content)
        }
        this.initialLoadForEdit = false
      }
    },
    content: {
      async handler() {
        this.$emit('input', this.content)
      }
    },
    choosenFile: {
      async handler() {
        const { valid } = await this.$refs.provider.validate(this.choosenFile)
        if (valid && this.clickedImageUpload) {
          let formData = this.makeFormData(this.choosenFile)
          this.uploadImage(formData)
        }
      }
    },
    clearData: function() {
      this.$nextTick(() => {
        this.$refs.imageObserver.reset()
      })
      this.uploadedFiles = []
      this.choosenFile = []
    }
  }
}
</script>

<style scoped>
.fileInputOveride {
  padding-top: 0px;
}
</style>
