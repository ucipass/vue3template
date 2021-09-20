import { createStore } from 'vuex'

const store = createStore({
    state () {
      return {
        url: "http://localhost;8000",
        username: "guest",
        password: "guest",
        status: "not logged in",
        socket: null,
        region: "us-east-2",
        userPoolId: "us-east-2_j3Vcx1Ss3",
        clientId: "7d725jjrn1ve7gpce38bo06rvp",
        identityPoolId: "us-east-2:79ae3f9e-4e21-4a17-a624-d7818293439e",
        idToken: "",
        credentials: null,
        input: {
          name: null,
          input_rows: [],
          values: {}
        },
        output: {
          name: null,
          text: ""
        },
        inputLogin:{
          input_rows: [
            { id: "username", label: "Username" },
            { id: "password", label: "Password", type: "password"}
          ],
          values:{
            username: "admin",
            password: "admin"
          }
        }
      }
    },
    mutations: {
      setStatus (state,payload) {
        state.status = payload
      },
      setState (state,payload) {
        if ( payload?.name in state ) {
          state[payload.name] = payload.value ? payload.value : null
        }
        else{
          return console.log (`No name: ${payload.name} found!`)
        }
      },
      setInput (state,input) {
        if (input.name) {
          state.input.name = input.name
          state.input.input_rows = input.input_rows ? input.input_rows : []
          state.input.values = {}
          for (const row of input.input_rows ) {
            state.input.values[row.id] = row.value ? row.value : ""
          }
        }
        else{
          state.input = {
            name: null,
            input_rows: [],
            values: {}
          }
        }      
      },
      setOutput (state,output) {
        if (output.name){
          state.output.name = output.name ? output.name : "output"
          state.output.text = output.text ? output.text : ""          
        }
        else{
          state.output = {
            name: null,
            text: ""
          }
        }

      },
      setInputValue (state,payload) {
        if ( ! state[payload.name] ) { 
          return console.log (`No input name ${payload.name} found!`)
        }
        if ( ! state[payload.name].values ) {
          state[payload.name].values = {}
        }
        state[payload.name].values[payload.id] = payload.value
      },
      setInputRows (state,payload) {
        if ( ! state[payload.name] ) { 
          return console.log (`No input name ${payload.name} found!`)
        }
        let input = state[payload.name]
        input.input_rows = payload.input_rows
        if ( !input.values ) {
          input.values = {}
        }
        for (const row of input.input_rows) {
          if ( ! input.values[row.id] ) {
            input.values[row.id] = row.value
          }
        }
      },
      setOutputText (state,payload) {
        if ( ! state[payload.name] ) { 
          return console.log (`No output name ${payload.name} found!`)
        }
        state[payload.name].text = payload.text
      }

    }
  })

export default store
