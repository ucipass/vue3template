<script setup>
import { onMounted } from 'vue'
import { store } from '../store.js'
import WindowText from "./WindowText.vue";

onMounted(() => {
  console.log(`Mounted: PageMain`)
  setInterval(() => {
    let currentDate = '[' + new Date().toUTCString() + '] ';
    store.textarea += currentDate + "\n"
  }, 1000);

})
</script>

<template>
  <div class="m-1 p-1 d-flex flex-column bg-dark h-100 border-0 overflow-auto">
    <WindowText/>
  </div>       
</template>

<style scoped>

</style>