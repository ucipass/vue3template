<template>
<div class="pt-1 pb-1 bg-dark text-white">
  <div class="d-flex align-items-center justify-content-between">
  <div class="form-floating ms-1">
      <input readonly type="text" class="form-control bg-dark text-white" id="floatingStatus" placeholder="Status" :value="$store.state.status">
      <label for="floatingStatus">Current Status</label>
  </div>        
  <div>
    <button 
      type="button" 
      class="btn btn-small btn-outline-light me-1" 
      data-bs-target="#modalSettings"
      data-bs-toggle="modal" 
      data-bs-placement="bottom" title="Settings"
    >
      <i class="bi bi-gear align-middle me-1"></i>
    </button>    
    <button 
      v-if = "$store.state.credentials"
      type="button" 
      class="btn btn-outline-light me-1"
      @click="logout()"
    >Logout
    </button>
    <button 
      v-else
      type="button" 
      class="btn btn-outline-light me-1"
      data-bs-toggle="modal" 
      data-bs-target="#loginModal"
    >Login
    </button>
  </div>
  </div>

  <ModalSettings/>

  <!-- Modal -->
  <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-dark" id="loginModalLabel">Server Login</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body text-dark">
          <InputForm :name="name"></InputForm>
        </div>
        <div class="modal-footer">
          <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> -->
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="awsLoginKeys" >Login</button>
        </div>
      </div>
    </div>
  </div>    

</div>  
</template>
<script>
import InputForm from './InputForm.vue'
import ModalSettings from './ModalSettings.vue'
import {
  awsLoginKeys,
  // login,
  logout
} from './helpers.js'

export default {
  name: 'Headers',
  components: {
    InputForm,ModalSettings
  },
  data() {
    return {
      name: "inputAWSLogin"
    }
  },
  computed: {
      count (){
          return this.$store.state.count
      }
  },  
  methods:{
    awsLoginKeys,
    // login,
    logout,
    settings: function(){
      console.log("Settings")
    },
    reload: function(){
      window.location.reload()
    }
  }, 
  mounted(){
    console.log("Mounted: Header ")
  }
}

</script>