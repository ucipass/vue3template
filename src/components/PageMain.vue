<script setup>
import { onMounted } from 'vue'

import WindowInput from "./WindowInput.vue";
import WindowText from "./WindowText.vue";
import WindowChart from "./WindowChart.vue";

function submitfn(e){
  console.log(e)
}

onMounted( async () => {
  console.log(`Mounted: PageMain`)



})
</script>

<template>
  <div class="m-0 p-0 d-flex flex-column h-100 border-0 overflow-auto">
    <div class="d-flex flex-fill align-items-center justify-content-center"> 
          <WindowInput v-if="true" id="login"/> 

    </div>
    
    
    <WindowText  v-if="false"  />
    <WindowChart v-if="false" />
  </div>       
</template>

<style scoped>

</style>