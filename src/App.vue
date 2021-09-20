<template>
  <div id="app" class="d-flex flex-column p-0">
    <Header/>
    <InputForm v-if="$store.state.input.name" :name="$store.state.input.name" class="border border-2 rounded-3 mt-2 ms-2 me-2 p-2 d-flex overflow-auto">
      <template v-slot:footer>
        <button class="btn btn-primary" @click='submit()'>Submit</button>
      </template>      
    </InputForm>
    <Output v-if="$store.state.output.name" :name="$store.state.output.name" class="m-2"/>
  </div>

  

<div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
  <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header">
      <strong class="me-auto">Submit complete:</strong>
      <small>{{toastDate}}</small>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">
      {{toastMessage}}
    </div>
  </div>
</div>
</template>

<script>
import Header from './components/Header.vue'
import InputForm from './components/InputForm.vue'
import Output from './components/Output.vue';
import { Toast } from "bootstrap" ;


export default {
  name: 'App',
  components: {
    InputForm,Output,Header
  },
  data () {
    return {
      input_name: "input",
      output_name: "output",
      url: process.env.NODE_ENV === "development" ? "http://localhost:8000": window.location.href,
      toastMessage: "",
      toastDate: "",
      test_input_rows:  [
        {"id": "user"},
        {"id": "pass", "type":"password"},
        {"id": "textbox1", "type": "textarea"},
        {"id": "file1", "type": "file"}
      ]       
    }
  },
  methods:{
    submit: function () {
      this.toastDate = (new Date()).toLocaleTimeString('en-US')
      var myAlert =document.getElementById('liveToast');//select id of toast
      var bsAlert = new Toast(myAlert);//inizialize it      
      // let input_values = this.$store.state[this.input_name].values
      this.toastMessage = "Submit pushed"
      bsAlert.show();//show it 
    }
  },
  mounted(){
    // let socket = new SocketIoClient(this.url)
    // let store = this.$store
    // store.commit("setState", {name: "socket", value : socket })  //store socket.io in store.js
    // store.commit("setInput", config.input ) 
    // store.commit("setOutput", config.output ) 
  }
}
</script>

<style>
html,
body {
  height: 100%;
  width: 100%;
  margin: 0
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

</style>
