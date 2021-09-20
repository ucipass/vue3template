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
        class="btn btn-outline-light me-1"
        data-bs-toggle="modal" 
        data-bs-target="#loginModal"
      >Login
      </button>
  </div>
  </div>

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
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="login" >Login</button>
        </div>
      </div>
    </div>
  </div>    

</div>  
</template>
<script>
import InputForm from './InputForm.vue'
var AmazonCognitoIdentity = require('amazon-cognito-identity-js');

export default {
  name: 'Headers',
  components: {
    InputForm
  },
  data() {
    return {
      name: "inputLogin"
    }
  },
  computed: {
      count (){
          return this.$store.state.count
      },
  },  
  methods:{
    login: async function () {
      let input  = this.$store.state[this.name].values
      let store = this.$store
      this.$store.commit("setState", {name: "username", value : input.username })
      this.$store.commit("setState", {name: "password", value : input.password })

      const username = this.$store.state.username
      const password = this.$store.state.password
      const userPoolId = this.$store.state.userPoolId
      const clientId = this.$store.state.clientId

      var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
          Username : username,
          Password : password,
      });
    
      var userPool = new AmazonCognitoIdentity.CognitoUserPool({ 
          UserPoolId : userPoolId,
          ClientId : clientId
      });
      
      var cognitoUser = new AmazonCognitoIdentity.CognitoUser({
          Username : username,
          Pool : userPool
      });
      
      cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: function (result) {
              // var accessToken = result.getAccessToken().getJwtToken();
              /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer */
              var idToken = result.idToken.jwtToken;
              store.commit("setState", {name: "idToken", value : idToken })
              store.commit("setState", {name: "status", value : "Logged in" })
          },
      
          onFailure: function(err) {
              store.commit("setState", {name: "status", value : "Login failed" })
              console.log(err);
          },
      
      });

    }
  }, 
  mounted(){
    console.log("Mounted: Header ")
  }
}

</script>