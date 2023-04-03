var express = require('express')
var app = new express()

var http = require('http').createServer(app)
var io = require('socket.io')(http)

//hold uses data
var users = [];
// hold users names
var usersName = [];

// connect
io.on('connect', function(client){
  //new connection
  client.emit('connected');

  //send old users name to new user 
  client.emit('getOldUsers',usersName);
  
  //remove the user when leave
  client.emit('remove',function(name){
    if(name != "null" && typeof(name) == 'string'){
      console.log("removing user");
      for(let i=0;i<users.length;i++){
        if(users[i].nickname == name){
          users.splice(i, 1);
          usersName.splice(i,1);
          client.broadcast("removeuser",name);
          break;
        }
      }
    }
	});

  //ask user for his name
  client.on('join', function(name){
    if(name != "null" && typeof(name) == 'string'){
      client.nickname = name;
      users.push(client);
      usersName.push(name);
      if(users.length > 1)
        client.broadcast.emit('addnewuser', name)    
    }
	})

//recive message from users and send to specific user

  client.on('sendmessage', function(msg,from,to){
    if(to != 'all'){
      for (let i = 0; i < users.length; i++) {
        if(users[i].nickname == to){
          users[i].emit('reciveMessages', msg,from,to);
        }      
      }  
    }else{
      client.broadcast.emit('reciveMessages', msg,from,to);
    }
  })
})
// //
app.get('/', function(req, res){
  res.sendFile(__dirname+'/chat.html')
})

http.listen(3000)

//https://socket.io/get-started/chat
