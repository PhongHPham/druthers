var watson = require('watson-developer-cloud');
var twitter = require('./twitter.js');

var personality_insights = watson.personality_insights({
  // take out keys for commit
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
