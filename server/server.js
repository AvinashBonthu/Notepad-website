const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

//const {generateMessage} = require('./util/message.js');
const public_path = path.join(__dirname, "/../public");
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

let generateMessage = (text) => {
	return {
		text
	};
};

app.use(express.static(public_path));

io.on('connection', (socket) => {
	console.log("A new user just connected");

	socket.on('createMessage', (message, callback) =>{
		io.emit('newMessage',generateMessage(message.text))
		})
	

	socket.on('disconnect', () => {
		console.log("A user disconenctdd");
	})	
})


server.listen(port, () => {
	console.log(`Server is up on port ${port}`);
})