let socket = io();
let textArea = document.querySelector('#content');

socket.on('connect', () => {
	console.log("Connected to server");
});

socket.on('disconnect', () => {
	console.log("Disconnected from server");
});

socket.on('newMessage', function(message){
	textArea.value.append(message.text);
});

textArea.addEventListener("input", function(e) {
	e.preventDefault();
	socket.emit('createMessage', {
		text:document.querySelector('#content').value
	}, function(){

	})
})