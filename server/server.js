var express = require('express');
var bodyParser = require('body-parser');
var twitter = require('./twitter.js');

var app = express();

// app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client'));

app.get('/', function (request, response) {
   
})

app.listen('9000', function() {
  console.log('listening on 9000');
});
