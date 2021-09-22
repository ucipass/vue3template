<template>
    <div  id="right-main-column" class="d-flex flex-column flex-grow-1 overflow-auto">
    <InputForm v-if="$store.state.credentials && true" :name="$store.state.inputS3Upload.name" class="border border-2 rounded-3 p-2 d-flex overflow-auto">
      <template v-slot:footer>
        <button class="btn btn-primary me-1" @click='listObjects()'>Refresh</button>
        <button class="btn btn-primary" @click='upload()'>Upload</button>
      </template>      
    </InputForm>
      <div class="d-flex flex-column flex-fill">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Key</th>
              <th scope="col">Size</th>
              <th scope="col">Last Modified</th>
              <th scope="col">Expire on</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="bucket in buckets" :key="bucket.Key" >
              <td><a href="#" @click="download(bucket.Key)">{{bucket.Key}}</a></td>
              <td>{{bucket.Size}}</td>
              <td>{{bucket.LastModified}}</td>
              <td>{{bucket.expireDate}}</td>
              <td>
                <div class="btn-group">
                  <button type="button" class="btn btn-small btn-outline-secondary" @click="deleteKey(bucket.Key)" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Delete">
                    <i class="bi-trash-fill" ></i>
                  </button>
                  <button type="button" class="btn btn-small btn-outline-secondary" @click="GetSignedUrl(bucket.Key)" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Pre-signed URL to clipboard">
                    <i class="bi-pen-fill" ></i>
                  </button>
                </div>
              </td>              
            </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>

<script>
import InputForm from './InputForm.vue'
import { S3Client, ListObjectsCommand, GetObjectCommand, PutObjectCommand, DeleteObjectCommand   } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { add } from 'date-fns'
import { Toast } from "bootstrap" ;
import streamSaver from 'streamsaver'
export default {
  name: 'S3Files',
  components: {
    InputForm
  },
  props: {
    name: String
  },
  data: function (){
    return {
      search: "",
      // buckets: [{Key: 1},{Key: 2},{Key: 3}]
      buckets: []
    }
  },
  computed:{
    output: function (){
      return this.$store.state[this.name]?.text ? this.$store.state[this.name]?.text : ""
    }
  },
  methods: {
    GetSignedUrl: async function (key){
      const s3Client = new S3Client({
        region: this.$store.state.region,
        credentials: this.$store.state.credentials
      });
      const command = new GetObjectCommand({ Bucket:  this.$store.state.bucket, Key: key});
      const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
      navigator.clipboard.writeText(url)
      console.log(url)
      var bsAlert = new Toast( document.getElementById('liveToast') );//inizialize it      
      this.$store.state.toastMessage = `Pre-signed URL for ${key} copied to clipboard.`
      bsAlert.show();//show it    

    },
    deleteKey: async function (key) {
      let bsAlert = new Toast( document.getElementById('liveToast') ); 
      const s3Client = new S3Client({
        region: this.$store.state.region,
        credentials: this.$store.state.credentials
      });
      let params = { Bucket:  this.$store.state.bucket, Key: key}
      try {
        await s3Client.send(new DeleteObjectCommand(params));
        await this.listObjects()
        this.$store.state.toastMessage = `Sucessfully deleted ${key}.`
        bsAlert.show();
      }catch (err) {
        this.$store.state.toastMessage = `Sucessfully deleted ${key}.`
        bsAlert.show();
        return alert(`There was an error deleting ${key}: `, err.message);
      }

    },    
    upload: async function () {
      let bsAlert = new Toast( document.getElementById('liveToast') );    
      let files = this.$store.state.inputS3Upload.values.s3fileupload
      if (files?.length){
        const file = files[0];
        const filename = "files/" + file.name
        const uploadParams = {
          Bucket:  this.$store.state.bucket,
          Key: filename,
          Body: file
        };

        try {
          const s3Client = new S3Client({
            region: this.$store.state.region,
            credentials: this.$store.state.credentials
          });
          await s3Client.send(new PutObjectCommand(uploadParams));
          this.$store.state.toastMessage = `Sucessfully uploaded ${filename} file.`
          bsAlert.show();
          await this.listObjects()         
        } catch (err) {
          return alert("There was an error uploading your file: ", err.message);
        }

      }
      else{
        this.$store.state.toastMessage = `No file selected for upload!`
        bsAlert.show();
      }

    },    
    download: async function(key){
      let bsAlert = new Toast( document.getElementById('liveToast') );    
      try {
        console.log("Download",key)
        let filename = key.split("/").pop()
        console.log(filename)
        const s3Client = new S3Client({
          region: this.$store.state.region,
          credentials: this.$store.state.credentials
        });
        let command = new GetObjectCommand ({ Bucket:  this.$store.state.bucket, Key: key});
        let s3Object = await s3Client.send(command);
        const uInt8 = new TextEncoder().encode('StreamSaver is awesome')
        const fileStream = streamSaver.createWriteStream(filename, {
          size: uInt8.byteLength, // (optional filesize) Will show progress
        })        
        let result = await s3Object.Body.pipeTo(fileStream)    
        return result
      } 
      catch (error) {
        this.$store.state.toastMessage = `Download failed!`
        bsAlert.show();
        console.log("Error",error)
      }
    },
    listObjects: async function(){
      let bsAlert = new Toast( document.getElementById('liveToast') );  
      const s3Client = new S3Client({
          region: this.$store.state.region,
          credentials: this.$store.state.credentials
        });
      let command = new ListObjectsCommand({ Bucket:  this.$store.state.bucket, Prefix: "files"});
      return s3Client.send(command)
      .then((result) =>{
        if ( ! result.Contents ) {
          this.buckets = []
          return ;
        }
        this.buckets = result.Contents       
        for (let index = 0; index < this.buckets.length; index++) {
          let expireDate = add(this.buckets[index].LastModified, {days: 1})
          if ( expireDate.getUTCHours() < 12) {
            expireDate.setUTCHours(12, 0, 0, 0)
          }
          else{
            expireDate.setUTCHours(12, 0, 0, 0)
            expireDate = add(expireDate, {days: 1})
          }
          this.buckets[index].expireDate = expireDate
        }
        console.log("Success",this.buckets)
      })
      .catch((result) =>{
        this.$store.state.toastMessage = `S3 folder refresh failed!`
        bsAlert.show();
        this.$store.commit("setOutput", {name: "output", text: JSON.stringify(result.message, null, 2)} )
        console.log("Error",result)
      })
    }

  },
  mounted: function () {
    console.log("Mounted:", this.name)
    this.listObjects()

  }  
}


</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css");
.terminal {
    padding: 8px;
    font-family: courier new;
}
</style>