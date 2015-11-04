var watsonCall = require('./watson.js');
var twitterCall = require('./twitter.js');
var Promise = require('bluebird');

// promisify getFormattedTweetsByHandle (from twitter.js) and getPersonality Insights
// (from watson.js)
var getTweetsP = Promise.promisify(twitterCall.getFormattedTweetsByHandle);
var analyzeTweetsP = Promise.promisify(watsonCall.getPersonalityInsights);
// parseWatson will return object of Big 5 personality traits
var parseWatson = function (results) {
  results = JSON.parse(results);
  // drill down results object to reach the array with Big 5 traits
  var traits = results.tree.children[0].children[0].children;
  var profile = {};
  // loop over Big 5 traits array and set each one as key value pair on profile object
  for (var i = 0; i < traits.length; i++) {
    profile[traits[i].name] = traits[i].percentage;
  }
  return profile;
};

// this combo API call function will return personality object of a user's tweets after
// processing by Watson Personality Insights API via chaining promises
var analyzePersonality = function(username, callback) {
  // Make twitter call with user's twitter handle, get back a giantString of tweets
  getTweetsP(username).then(function (giantString) {
    // then Watson API call promise invoked get back results
    analyzeTweetsP(giantString).then(function (results) {
      // which are then passed into parseWatson function to get desired Big 5 traits
      callback(null, parseWatson(results));
    });
  });
};

// promisify analyzePersonality and cache in variable for easy exporting
var analyzePersonalityP = Promise.promisify(analyzePersonality);

module.exports = analyzePersonalityP;

