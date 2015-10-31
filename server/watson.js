var watson = require('watson-developer-cloud');
var twitter = require('./twitter.js');
var watsonKeys = require('./config.js');

var personality_insights = watson.personality_insights({
  username: watsonKeys.watson.username,
  password: watsonKeys.watson.password,
  version: watsonKeys.watson.version
});

exports.getPersonalityInsights = function (giantString, callback) {
  personality_insights.profile({
    // TODO pass in giantString
    text: giantString,
    language: 'en' },
    function (error, response) {
      if (error)
        callback(error);
      else
        callback(null, JSON.stringify(response, null, 2));
  });
};



