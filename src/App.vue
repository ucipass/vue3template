<script setup>
import NavBar from "./components/NavBar.vue";
import MainPage from "./components/MainPage.vue";
import { onMounted } from 'vue'

onMounted(() => {
  console.log(`Mounted: App`)
})
</script>

<template>
  <NavBar/>
  <MainPage/>
</template>

<style>
html, body, #app {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: red;
}

</style>
