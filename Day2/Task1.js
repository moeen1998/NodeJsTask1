var Emitters = require('events')
var utils = require('util')

//function constructor
var MyFunc = new Function();

utils.inherits(MyFunc,Emitters)

// if i want to send data with event
MyFunc.prototype.greet = function(data){
  this.emit('eventfired', data)
}

var customFun = new MyFunc();
//
customFun.on('eventfired', function(data){
  console.log('You Entered ==> ' + data)
});

customFun.greet('Moeen');