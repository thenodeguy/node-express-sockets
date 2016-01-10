'use strict';

var express = require('express');
var io = require('socket.io')();

var app = express();
app.io = io;

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var routes = require('./routes/index');
app.use('/', routes);

io.on('connection', function(socket) {
    console.log( "A user connected" );
    
    socket.on('disconnect', function(){
      console.log('A user disconnected');
    });
    
    socket.on('browserEvent', function(eventMessage){
    
      console.log(eventMessage);
      io.emit('serverEvent', 'Emitting event from server');
    });
});

module.exports = app;
