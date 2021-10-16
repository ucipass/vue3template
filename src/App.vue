<template>
  <div id="app" class="d-flex flex-column p-0">
    <Header/>
    <InputForm v-if="$store.state.credentials" :name="$store.state.input.name" class="border border-2 rounded-3 mt-2 ms-2 me-2 p-2 d-flex overflow-auto">
      <template v-slot:footer>
        <button class="btn btn-primary" @click='submit()'>Submit</button>
      </template>      
    </InputForm>
    <Output v-if="$store.state.credentials" :name="$store.state.output.name" class="m-2"/>
  </div>

</template>

<script>
import Header from './components/Header.vue'
import InputForm from './components/InputForm.vue'
import Output from './components/Output.vue';
import {awsLoginKeys, listObjects} from './components/helpers.js'
import { 
    S3Client, 
    // UploadPartCommand, 
    // ListMultipartUploadsCommand, 
    // ListPartsCommand , 
    ListObjectsCommand, 
    // GetObjectCommand, 
    // PutObjectCommand, 
    // DeleteObjectCommand   
    } from "@aws-sdk/client-s3";

export default {
  name: 'App',
  components: {
    InputForm,Output,Header
  },
  data () {
    return {
      url: process.env.NODE_ENV === "development" ? "http://localhost:8000": window.location.href,
    }
  },
  methods:{
    submit: function () {
      console.log("Input Submit")      
    }
  },
  async mounted(){
    try {
      let store = this.$store
      this.$store.commit("setState", {name: "username", value : store.state.inputLogin.values.username })
      this.$store.commit("setState", {name: "accessKeyId", value : "AKIA6EICQEI4M2WTLL5S" })
      this.$store.commit("setState", {name: "secretAccessKey", value : "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" })
      await awsLoginKeys()
      console.log("Mounted: App",listObjects)

      const accessKeyId     = store.state.accessKeyId
      const secretAccessKey = store.state.secretAccessKey
      console.log("HELLO",store.state.credentials())
      // let region = this.$store.state.region
      let params = {
          // region: region,
          region: "us-east-1",
          // credentials: store.state.credentials()
          credentials: {
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey
          }
        }
      const s3Client = new S3Client(params);
      let command = new ListObjectsCommand({ Bucket:  store.state.bucket, Prefix: "files"});
      return s3Client.send(command)
      .then((result) =>{
        console.log("Success",result.Contents)
      })
      .catch((result) =>{
        console.log("Error",result)
      })


    } catch (error) {
      console.log("App initialization failed!")
      console.log(error)
    }    

  }
}
</script>

<style>
html,
body {
  height: 100%;
  width: 100%;
  margin: 0
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

</style>
