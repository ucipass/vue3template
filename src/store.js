import { reactive } from 'vue'


export const store = reactive({
  socket: null,
  textarea: "",
  loggedIn: false,
  series: null,
  chart:{
    series: null,
    width: 500,
    height: 100
  },
  inputs:{
    login:{
      username: { 
        label: "Username", 
        type: "text",
        placeholder: "Enter username1 here...",
        information: "Enter username1 here...",
        value: ""
      },
      password: { 
        label: "Password", 
        type: "password",
        placeholder: "Enter password here...",
        information: "Enter password here...",
        value: ""
      },
      auth: { 
        label: "Authentication Type", 
        type: "select",
        placeholder: "Pick your authentication type",
        information: "This information typically comes from the administrator.",
        value: "saml",
        options:[
          {text:"SAML 2.0", value: "saml"},
          {text:"Open-ID", value: "openid"},
          {text:"LDAP", value: "LDAP"},
        ],
      },
      certfile: { 
        label: "Certificate File", 
        type: "file",
        placeholder: "Pick your file here...",
        information: "This is your private key file for authentication.",
        value: ""
      },
      rootcert: { 
        label: "Root Certificate", 
        type: "textarea",
        placeholder: "Cut & paste your root certificate here...",
        information: "Your trusted root Certificate Authority.",
        value: ""
      },
    },
    socketio:{
      url: { 
        label: "URL", 
        type: "text",
        placeholder: "Enter socket.io URL.",
        information: "Enter socket.io URL here..",
        value: "http://localhost:5000"
      },
      token: { 
        label: "Token", 
        type: "password",
        placeholder: "Optional auth token...",
        information: "Optional authentication token",
        value: ""
      },
      connect: { 
        label: "Auto-connect", 
        type: "select",
        placeholder: "Pick your authentication type",
        information: "This information typically comes from the administrator.",
        value: false,
        options:[
          {text:"Yes", value: true},
          {text:"No", value: false},
        ],
      },
    },    
  }
})
