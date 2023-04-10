<script setup>
import NavBar     from "./components/NavBar.vue";
import PageMain   from "./components/PageMain.vue";
import ModalRooms from "./components/ModalRooms.vue";
import ModalSocketIO from "./components/ModalSocketIO.vue";
import { onMounted } from 'vue'

onMounted(() => {
  console.log(`Mounted: App`)

})
</script>

<template>
  <NavBar/>
  <PageMain/>
  <ModalRooms/>
  <ModalSocketIO/>
</template>

<style>
html, body, #app {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: white;
}

</style>
