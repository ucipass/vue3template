<script setup>
import WindowAWSClipboard from "./WindowAWSClipboard.vue";
import WindowAWSFiles from "./WindowAWSFiles.vue";
import {  reactive, onMounted, onBeforeMount } from 'vue'
import { store } from '../store.js'
import { Signer } from "@aws-amplify/core"


let state = reactive(
  { 
    text: "", 
    id: null,
    clipboard: false,
    files: true
  }
)

function changeView(){       
  if (state.clipboard){ 
    document.getElementById("navClipboard").classList.remove('active');
    state.clipboard=false; 
    document.getElementById("navFiles").classList.add('active');
    state.files=true;  
  }
  else { 
    document.getElementById("navClipboard").classList.add('active');
    state.clipboard=true; 
    document.getElementById("navFiles").classList.remove('active');
    state.files=false;  
  }
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
        <button id="navFiles"  class="nav-link active" aria-current="page" @click="changeView" >Files</button>
        </li>
        <li class="nav-item">
        <button id="navClipboard" class="nav-link       " aria-current="page" @click="changeView" >Clipboard</button>
        </li>
      </ul>      
    </div>
    <WindowAWSFiles v-if="state.files"/>
    <WindowAWSClipboard class="m-1" v-if="state.clipboard" id="awsupload"/>    
  </div>

</template>

<style scoped>

</style>