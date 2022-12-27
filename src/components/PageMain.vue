<script setup>
import { onMounted } from 'vue'
import { store } from '../store.js'
import WindowInput from "./WindowInput.vue";
import WindowText from "./WindowText.vue";
import WindowChart from "./WindowChart.vue";

onMounted( async () => {
  console.log(`Mounted: PageMain`)
  const socket = store.socket

  socket.on('connect', () => {
    console.log(`Connected ${socket.id}`)
  });

  socket.on('disconnect', () => {
    console.log(`Disconnected ${socket.id}`)
  });

  socket.on('data', (data) => {
    if (typeof data != "string"){
      data = JSON.stringify(data)
    }
    store.textarea += data + "\n"
    if ( store.chart.series && !isNaN(data)){
      store.chart.series.append(Date.now(), +data);
    }    
    // console.log(`Data ${data}`)
  });


})
</script>

<template>
  <div class="m-1 p-1 d-flex flex-column bg-dark h-100 border-0 overflow-auto">
    <WindowInput v-if="false" />
    <WindowText/>
    <WindowChart/>
  </div>       
</template>

<style scoped>

</style>