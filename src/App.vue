<script setup>
import NavBar     from "./components/NavBar.vue";
import ModalRooms from "./components/ModalRooms.vue";
import ModalSocketIO from "./components/ModalSocketIO.vue";
import AWSModalSettings from "./components/AWSModalSettings.vue";
import AWSWindowMain from "./components/AWSWindowMain.vue";
import ToastMessage from './components/ToastMessage.vue';

import { onMounted } from 'vue'

onMounted(() => {
  console.log(`Mounted: App`)

})
</script>

<template>
  <NavBar/>
  <div class="m-0 p-0 d-flex flex-column h-100 border-0 overflow-auto">
    <AWSWindowMain/>
  </div>       
  <!-- <ModalRooms/> -->
  <!-- <ModalSocketIO/> -->
  <AWSModalSettings/>
  <ToastMessage/>
</template>

<style>
html, body, #app {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: white;
}

</style>
