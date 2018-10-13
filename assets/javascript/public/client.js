$(function(){
  var socket = io.connect();
  socket.on('stream', function(tweet) {
    console.log(tweet);
    $('body').append('<div class="tweet">' + tweet + '</div>');
});
});