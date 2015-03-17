var socket = io();
socket.emit('join', questionId);
$('form').submit(function(){
	

	socket.emit('message', $('#m').val());
	$('#m').val('');
	return false;
	});
socket.on('userConnected', function(){

});
socket.on('message', function(msg){
	$('#messages').append($('<li>').html('<strong>'+msg.id+'</strong> '+msg.msg));

});