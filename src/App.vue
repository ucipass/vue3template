<script setup>
import NavBar     from "./components/NavBar.vue";
import PageMain   from "./components/PageMain.vue";
import ModalRooms from "./components/ModalRooms.vue";
import { onMounted } from 'vue'

onMounted(() => {
  console.log(`Mounted: App`)

})
</script>

<template>
  <NavBar/>
  <PageMain/>
  <ModalRooms/>
</template>

<style>
html, body, #app {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: grey;
}

</style>
