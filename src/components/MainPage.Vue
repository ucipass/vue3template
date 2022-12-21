<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log(`Mounted: MainPagee`)
})
</script>

<template>
<div class="m-2 d-flex flex-column bg-secondary h-100 overflow-auto border border-success border-5 ">
      <div class="d-flex flex-column flex-grow-1 bg-secondary overflow-auto ">   
        <textarea class="p-2 flex-grow-1 text-light  bg-dark" name="test" id="test" cols="5" rows="5" contenteditable spellcheck="false" readonly>test</textarea>
      </div>
      <div class="p-2">Flex item 2</div>
      <div class="p-2">Flex item 3</div>
</div>       
</template>

<style scoped>

</style>