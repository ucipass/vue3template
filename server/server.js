const express = require('express');
const crypto = require('crypto');
const app = express();
const server = require('http').createServer(app);
const yaml = require('js-yaml');
const fs   = require('fs');


const config = getConfigFile('config.yaml')


const port  = config.port || 80;
const options = {
  cors: {
    origin: "http://localhost:4000",
    methods: ["GET", "POST"]
  }
}

process.on('SIGINT', function() {
  console.log("Caught interrupt signal");
  process.exit();
});




function getConfigFile(filename){
  let config = null
  try {
    config = yaml.load(fs.readFileSync(filename, 'utf8')); 
  } catch (e) {
    console.log(`Invalid ${filename} file or file not found!`);
    console.log(e.message);
    process.exit(0)
  }
  return config
}




class Users {
  constructor(users) {
    this.users = users
    this.hash_map = new Map();
    this.user_map = new Map();
    this.users.forEach(user => {
      const hash = crypto.createHash('sha256').update(user.username+user.password).digest('base64');
      if ( this.hash_map.has(hash) ){
        console.log(`Duplicate username: ${user.username}`)
      }
      else{
        this.hash_map.set(hash,user)
        this.user_map.set(user.username,user)       
      }
    });
  }
  findUSerByHash(hash){
    if (typeof hash != "string" ) {
      return false
    }
    return this.hash_map.get(hash)
  }
}

function isValidRoom(room){
  if (typeof room != "string" ) {
    console.log("Invalid room named received!", room)
    return false
  }

  const rooms_map  = io.of("/").adapter.rooms;
  if ( rooms_map.has(room) ) {
    let valid = false
    sid_map = rooms_map.get(room)
    sid_map.forEach((sid) => {
      const socket = io.sockets.sockets.get(sid);
      if (socket.user?.username == room){
        // console.log("User",socket.user?.username, room)
        valid = true
      }
    })
    return valid
  }
  else{
    return false
  }

}

function get_valid_rooms(io){
  let rooms = []
  const rooms_map = io.of("/").adapter.rooms;

  rooms_map.forEach((sids, room)=>{
    if ( isValidRoom(room)) {
      rooms.push(room)
    } 
  })
  return rooms;
}



const io = require('socket.io')(server,options);

// AUTH
const users = new Users( config.credentials )
io.use((socket, next) => {
  if(!socket.handshake.auth.token){
    next()
    return;
  }
  const user = users.findUSerByHash(socket.handshake.auth.token)
  if ( user ){
    socket.user = user
    // console.log(`Authentication successful for user: ${user.username} on socket ${socket.id}`)
    next()
  }
  else{
    console.log(`invalid username or password socket id: ${socket.id}`)
    socket.close()
  }
});
  

io.on('connection', socket => {

  if ( socket.user?.username ) {
    socket.join(socket.user.username)
    console.log(`Connected socket: ${socket.id} user: ${socket.user.username}`);
  }else{
    console.log(`Connected socket: ${socket.id}`);
  }

  socket.on('disconnect', () => {
    console.log(`disconnect ${socket.id}`);
  });
  
  socket.on("data", (data) => {
    if ( socket.user){
      io.to(socket.user.username).emit("data" , data );
    }
  });  

  socket.on("join_room", (room, callback) => {
    if (isValidRoom(room)){
      socket.join(room);
      console.log(`Room join request for ${room} from ${socket.id} is successfuil!`)
      callback(true);      
    }
    else{
      console.log(`Room join request for ${room} from ${socket.id} failed!`)
      callback(false);      
    }

  });  

  socket.on("leave_room", (room, callback) => {
    if (isValidRoom(room)){
      console.log(`Room leave request for ${room} from ${socket.id}`)
      socket.leave(room);
      callback(true)
    }
    else{
      console.log(`Room leave request for ${room} from ${socket.id} failed!`)
      callback(false);      
    }

  });  

  socket.on("get_rooms", (data, callback) => {
    const room_names = get_valid_rooms(io)
    const sids_map = io.of("/").adapter.sids;
    const sid_rooms = sids_map.get(socket.id)
    let rooms = []
    room_names.forEach((room_name) => {
      if ( sid_rooms.has(room_name) ){
        rooms.push( { name: room_name, member: true})
      }else{
        rooms.push( { name: room_name, member: false})
      }
    })
    callback(rooms);
  });  

});

server.listen(port, () => console.log(`server listening on port ${port}`));