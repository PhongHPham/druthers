var Twitter = require('twitter');
var twitterKeys = require('../client/libs/config.js');
console.log('da keys, BOSS!', twitterKeys.twitter);
var client = new Twitter({
    consumer_key: twitterKeys.twitter.consumer_key,
    consumer_secret: twitterKeys.twitter.consumer_secret,
    access_token_key: twitterKeys.twitter.access_token_key,
    access_token_secret: twitterKeys.twitter.access_token_secret 
});


 
// var params = {screen_name: 'nodejs'};
// client.get('statuses/user_timeline', params, function(error, tweets, response){
//   if (!error) {
//     console.log(tweets);
//   }
// });


var getFormattedTweetsByHandle = function (twitterHandle, callback) {
  // params variable to get twitterHandle in format for get method
  var params = {screen_name: twitterHandle};
  // build out a giant string of all the user's tweets
  var giantString = '';
  // use instantiation of Twitter library to get statuses for user
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (error) {
      callback(error, null);
    } else { 
      // do something with tweets
      // it's going to be an array of objects so i want to loop through array and target 
      // the text property of each of its object elements
      for (var i = 0; i < tweets.length; i++) {
        for (var k in tweets[i]) {
          giantString += tweets[i].text;
        }
      }
      // console.log(giantString);
      callback(null, giantString);
    }
  });

};



getFormattedTweetsByHandle('nodejs', function(err, giantString) {
  if (err) {
    console.log(err);
  } else {
    // do something with giantString
    console.log('SUCCESS', giantString)
  }
});

module.exports = {

getFormattedTweetsByHandle: getFormattedTweetsByHandle

};


