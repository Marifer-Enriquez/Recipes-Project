// To begin, run npm init, and fill out the information
// To install the needed packages, run in the terminal
// npm install express --save
// npm install socket.io --save
// npm install twit -- save
require('dotenv').load();

var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  , Twit = require('twit')
  , io = require('socket.io').listen(server);

  app.use(express.static('public'))
  app.use("/public", express.static(__dirname + "/public"));

  server.listen(process.env.PORT || 5000);


// routing
app.get('/', function (req, res) {
res.sendFile(__dirname + '../../index.html');
});

var watchList = ['Apple', 'Banana', 'Vanilla', 'Recipe'];
 var T = new Twit({
    consumer_key:         process.env.consumer_key
  , consumer_secret:      process.env.consumer_secret
  , access_token:         process.env.access_token
  , access_token_secret:  process.env.access_token_secret
})

io.sockets.on('connection', function (socket) {
  console.log('Connected');


 var stream = T.stream('statuses/filter', { track: watchList })

  stream.on('tweet', function (tweet) {

    io.sockets.emit('stream',tweet.text);
    console.log(tweet.text); 
    $("#howtotest2").append(tweet.text);
    $("#howtotest2").append("<br>");
  });
 });