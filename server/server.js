var express = require('express');
var bodyParser = require('body-parser');
// var twitter = require('./twitter.js');
var app = express();
var apiRouter = require('./apiRouter.js');
var mongoose = require('mongoose');
var config = require("./config");
// app.use(bodyParser.json());
// var apiRouter = app.Router();

var logger = function (request, response, next) {
  console.log('Client hit: ' + request.url);
  next();
};

// Start the cron job
var cronjob = require("./cronjob");
cronjob.start();

mongoose.connect(config.mongo_db);

app.use(express.static(__dirname + '/../client'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api', logger, apiRouter);


var port = process.env.OPENSHIFT_NODEJS_PORT || 9000;
var ip = process.env.OPENSHIFT_NODEJS_IP  ||  "127.0.0.1";
console.log(ip, port);
app.listen(port, ip, function() {
  console.log('listening on: ' +  port );
});
