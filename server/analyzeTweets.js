var watsonCall = require('./watson.js');
var twitterCall = require('./twitter.js');
var Promise = require('bluebird');

var getTweetsP = Promise.promisify(twitterCall.getFormattedTweetsByHandle);
var analyzeTweetsP = Promise.promisify(watsonCall.getPersonalityInsights);
var parseWatson = function (results) {
  // var traits = results['tree']['children'][0]['children'];

  results = JSON.parse(results);
  var traits = results.tree.children[0].children[0].children;
  var profile = {};
  for (var i = 0; i < traits.length; i++) {
    profile[traits[i].name] = traits[i].percentage;
  }
  return profile;
};

var analyzePersonality = function(username, callback) {
  getTweetsP(username).then(function (giantString) {
    analyzeTweetsP(giantString).then(function (results) {
      callback(null, parseWatson(results));
    });
  });
};

module.exports = Promise.promisify(analyzePersonality);

