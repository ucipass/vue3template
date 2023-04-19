<script setup>
import WindowAWSClipboard from "./WindowAWSClipboard.vue";
import WindowAWSFiles from "./WindowAWSFiles.vue";
import AWSWindowLogin from "./AWSWindowLogin.vue";
import ButtonIcon from "./ButtonIcon.vue";
import {  reactive, onMounted, onBeforeMount } from 'vue'
import { store } from '../store.js'
import { Signer } from "@aws-amplify/core"


let state = reactive(
  { 
    text: "", 
    id: null,
  }
)

function activateFiles(){       
    document.getElementById("navClipboard").classList.remove('active');
    document.getElementById("navFiles").classList.add('active');
    store.aws.navView="files";  
}
function activateClipboard(){    
    document.getElementById("navClipboard").classList.add('active');
    state.clipboard=true; 
    document.getElementById("navFiles").classList.remove('active');
    store.aws.navView="clipboard";   

}

onBeforeMount(()=>{
  state.id = crypto.randomUUID()
})

onMounted( async () => {
  console.log(`Mounted: AWSMain`)
})


</script>
 

<template>
  <div v-if="store.aws.credentials" class="d-flex flex-column flex-fill">
    <div class="mt-2 ms-1">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <button id="navFiles"  class="nav-link active" aria-current="page" @click="activateFiles" >
            Files
          </button>
        </li>
        <li class="nav-item">
          <button id="navClipboard" class="nav-link" aria-current="page" @click="activateClipboard" >
            Clipboard
            <div v-if="store.awsWebSocketConnected" class="spinner-grow spinner-grow-sm" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </button>
        </li>
        <li class="nav-item ms-auto">
          <div class="btn-group">
            <button class="btn btn-outline-secondary">
              <i class="bi bi-1-circle"></i>
            </button>
            <button class="btn btn-outline-secondary">
              <i class="bi bi-2-circle"></i>
            </button>
          </div>
          
        </li>              
      </ul>   
    </div>

    <WindowAWSFiles v-if="store.aws.navView=='files'"/>
    <WindowAWSClipboard class="m-1" v-if="store.aws.navView=='clipboard'" id="awsupload"/>    
  </div>
  <div v-else class="d-flex flex-column flex-fill justify-content-center align-items-center">
    <AWSWindowLogin/>
  </div>

</template>

<style scoped>

</style>