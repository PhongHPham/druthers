var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});
 
var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response){
  if (!error) {
    console.log(tweets);
  }
});


/*
Access level  Read and write (modify app permissions)
Consumer Key (API Key)  JT85F6jhxI85Wbdabs9FYd6Vf (manage keys and access tokens)
Callback URL  None
Callback URL Locked No
Sign in with Twitter  Yes
App-only authentication https://api.twitter.com/oauth2/token
Request token URL https://api.twitter.com/oauth/request_token
Authorize URL https://api.twitter.com/oauth/authorize
Access token URL  https://api.twitter.com/oauth/access_token
*/

var getFormattedTweetsByHandle = function (twitterHandle, callback) {

}

module.exports = {

getFormattedTweetsByHandle: getFormattedTweetsByHandle

};


