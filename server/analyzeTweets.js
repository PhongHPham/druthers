var watsonCall = require('./watson.js');
var twitterCall = require('./twitter.js');
var Promise = require('bluebird');

var getTweetsP = Promise.promisify(twitterCall.getFormattedTweetsByHandle);
var analyzeTweetsP = Promise.promisify(watsonCall.getPersonalityInsights);

getTweetsP('StephenAtHome').then(function (giantString) {
  analyzeTweetsP(giantString).then(function (results) {
    console.log(results);
  });
});
