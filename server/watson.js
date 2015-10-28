var watson = require('watson-developer-cloud');
var twitter = require('./twitter.js');
var watsonKeys = require('../client/libs/config.js');

var personality_insights = watson.personality_insights({
  username: watsonKeys.watson.username,
  password: watsonKeys.watson.password,
  version: watsonKeys.watson.version
});

personality_insights.profile({
  // TODO pass in giantString
  text: 'Enter more than 100 unique words here...',
  language: 'en' },
  function (err, response) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(response, null, 2));
});
