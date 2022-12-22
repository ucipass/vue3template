<script setup >
import { onMounted } from "vue";
import { store } from "../store.js"
import ButtonIcon from "./ButtonIcon.vue";

function login(){
  store.loggedIn = true
}

function logout(){
  store.loggedIn = false
}

function trash(){
  store.textarea = ""
}

onMounted(() => {

});
</script>

<template>
  <nav id="Navbar" class="ps-1 pe-1 navbar sticky-top navbar-expand navbar-dark bg-dark justify-content-between">
      <div class="btn-group">
        <ButtonIcon icon="house-door" text="Home"/>
        <ButtonIcon icon="clipboard" text="copy"/>
        <ButtonIcon icon="trash" text="clear" @click="trash"/>
      </div>        
      <div class="btn-group">
        <ButtonIcon v-if="!store.loggedIn" @click="login " icon="box-arrow-in-right" text="Login"/>
        <ButtonIcon v-if=" store.loggedIn" @click="logout" icon="box-arrow-right"    text="Logout"/>
        <ButtonIcon icon="gear" text="Settings"/>
      </div>         
  </nav>
</template>

<style scoped>

</style>