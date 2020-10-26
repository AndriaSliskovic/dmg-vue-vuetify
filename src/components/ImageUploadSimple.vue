<template>
  <div class="my-6">
    <input
      type="file"
      @change="onFileSelected"
      style="display: none"
      ref="fileInput"
    />
    <v-row justify="center" align="center" no-gutters>
      <v-col cols="6">
        <v-col cols="12">
          <v-btn
            color="primary"
            @click="$refs.fileInput.click()"
            outlined
            class="mr-2"
          >
            Pick image
          </v-btn>
        </v-col>
        <v-col cols="12" v-if="selectedFile">
          <v-btn color="error" @click="onUpload" outlined> Upload </v-btn>
        </v-col>
      </v-col>
      <v-col cols="6" v-if="selectedFile">
        <v-img
        v-if="imgUrl"
          :src="imgUrl"
        ></v-img>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      selectedFile: null,
      imgUrl: null,
    };
  },
  methods: {
    onFileSelected(event) {
      console.log("evenet", event);
      this.selectedFile = event.target.files[0];
      this.imgUrl = URL.createObjectURL(this.selectedFile);
    },
    onUpload() {
      //Send to server
      //use axios

      const fd = new FormData();
      fd.append("image", this.selectedFile, this.selectedFile.name);
      axios
        .post("some url", fd, {
          onUploadPrgres: (uploadEvent) => {
            console.log(
              "upload Progress : " +
                Math.round((uploadEvent.loaded / uploadEvent / total) * 100) +
                "%"
            );
          },
        })
        .then((res) => {
          console.log("response", res);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>