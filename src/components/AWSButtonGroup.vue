<script setup>
import { ref, onMounted, computed } from "vue";
import { Modal, Toast } from 'bootstrap'
import ButtonIcon from "./ButtonIcon.vue";
import { store } from '../store.js'
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";


function message(msg){
  store.toastMessage = msg
  var bsAlert = new Toast( document.getElementById('liveToast') );//inizialize it      
  bsAlert.show();//show it   
}

function copy(){
  navigator.clipboard.writeText(store.aws.clipboard)
  message("content was copied to OS clipboard!")
}

function trash(){
  store.aws.clipboard = ""
  message("content was deleted!")
}

function save(){
  const region = store.inputs.awsSettings.region.value
  const bucket = store.inputs.awsSettings.s3BucketName.value
  const credentials = store.aws.credentials
  const body = store.aws.clipboard

  const s3Client = new S3Client({
    region: region,
    credentials: credentials
  });

  // Define the parameters for the text file upload
  const uploadParams = {
    Bucket: bucket,
    Key: "files/clipboard.txt",
    Body: body,
    ContentType: "text/plain"
  };

  // Upload the file to the S3 bucket
  const command = new PutObjectCommand(uploadParams);
  s3Client.send(command).then(
    (data) => {
      console.log("File uploaded successfully:", data.Location);
      message("clipboard.txt was saved successfully")
    },
    (err) => {
      console.log("Error uploading file:", err);
      message(err.message)
    }
  );

}

function aws_settings(){
  let elem = document.getElementById("modalAWSSettings")
  let modal = new Modal(elem)
  modal.show()    
}

onMounted(() => {
  console.log("Mounted: AWS Button Group")

});
</script>


<template> 
  <div class="btn-group">
    <ButtonIcon icon="save2"      text="Save" @click="save"/>
    <ButtonIcon icon="clipboard"  text="Copy" @click="copy"/>
    <ButtonIcon icon="trash"      text="Delete" @click="trash"/>
    <ButtonIcon icon="cloud" text="AWS Settings" @click="aws_settings"/>
  </div>     
</template>

<style scoped>
</style>