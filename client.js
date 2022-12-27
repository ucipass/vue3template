const io = require( "socket.io-client" )
const crypto = require( "crypto" )
const net = require('net');


const username = process.env.USERNAME
const password = process.env.PASSWORD
const URL      = process.env.URL || "http://localhost:5000"
const HOST     = process.env.HOST ||  "arato.biz"
const PORT     = process.env.PORT || 80
const TIMEOUT  = process.env.TIMEOUT || 500

if ( !username || !password) {
  console.log("No environment variables, USERNAME & PASWORD")
  process.exit(-1)
}

const options = {
  auth: {
    token: crypto.createHash('sha256').update(username+password).digest('base64')
  }
}
// console.log(username,password)
// console.log(crypto.createHash('sha256').update(username+password).digest('base64'))

const socket = io( URL, options)


socket.on('connect', () => {
  console.log(`Socket.io connected as ${username} on socket ${socket.id}`)
  sendGoogleResponsTime()
})

socket.on('disconnect', (reason) => {
  if (reason === "io server disconnect") {
    console.log("The server has forcefully disconnected the socket:", reason)
  }
  else if (reason === "io client disconnect") {
    console.log("The socket was manually disconnected using:", reason)
  }
  else if (reason === "ping timeout") {
    // Will try to reconnect
    console.log("The server did not send a PING within the pingInterval:", reason)
  }
  else if (reason === "transport close") {
    // Will try to reconnect
    console.log("	The connection was closed (by server?) or lost:", reason)
  }
  else if (reason === "transport error") {
    // Will try to reconnect
    console.log("The connection has encountered an error :", reason)
  }
  else {
    console.log("Unkown disconnetion reason:", reason)
  }
  // this.connected = false
})

function tcpConnection(HOST, PORT){  // returns duration of tcp setup
  return new Promise((resolve, reject) => {
    const tcpSocket = new net.Socket();
    const startTime = new Date().getTime();
    tcpSocket.connect(PORT, HOST);  
    
    tcpSocket.on("connect", (data)=>{
      const endTime = new Date().getTime();
      const duration = endTime - startTime
      // console.log('CONNECTED TO: ' + HOST + ':' + PORT + ' in seconds:' + duration);
      tcpSocket.destroy()

      resolve (duration)
    });

    tcpSocket.on("error", (error)=>{
      log.info(`TCP Event:error ${error.message}`)      
      resolve (0)
    });

  })
}

function sendTime(){
  setInterval(() => {
    let currentDate = '[' + new Date().toUTCString() + '] ';
    socket.emit("data" , username+ " - " + currentDate);
  }, 2000);
}


function sendGoogleResponsTime(){
  setInterval( async () => {
    promise1 = new Promise((resolve, reject) => {
      setTimeout( () => resolve(TIMEOUT),  TIMEOUT);
    });
    promise2 = tcpConnection(HOST, PORT)
    const duration = await Promise.race([promise1, promise2])
    socket.emit("data" , duration);  

  }, TIMEOUT);
}

function sendGoogleResponsTime2(){
  const HOST="cookcountyil.gov"
  const PORT=80
  setInterval(() => {
    const tcpSocket = new net.Socket();
    const startTime = new Date().getTime();
    tcpSocket.connect(PORT, HOST);  
    
    tcpSocket.on("connect", (data)=>{
      const endTime = new Date().getTime();
      const duration = endTime - startTime
      // console.log('CONNECTED TO: ' + HOST + ':' + PORT + ' in seconds:' + duration);
      socket.emit("data" , duration);
      tcpSocket.destroy()
    });

    tcpSocket.on("error", (error)=>{
      if (!tcpSocket.destroyed){
          log.info(`TCP Event:error ${error.message}`)      
          socket.emit("data" , 0);      
      }
  });

  }, 500);
}