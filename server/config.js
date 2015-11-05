
var credentials = {};
try {
		credentials = require("./credentials");
} catch  (e)  {  
		console.log("Cannot find credentials.js. Trying to use env variables.");
}

// twitter credentials
var config = {};

config.twitter = {};

config.twitter.consumer_key = process.env.TWITTER_CONSUMER_KEY || credentials.twitter.consumer_key;
config.twitter.consumer_secret = process.env.TWITTER_CONSUMER_SECRET || credentials.twitter.consumer_secret;
config.twitter.access_token_key = process.env.TWITTER_ACCESS_TOKEN_KEY || credentials.twitter.access_token_key;
config.twitter.access_token_secret = process.env.TWITTER_ACCESS_TOKEN_SECRET || credentials.twitter.access_token_secret;

// Watson Personality Insights credentials !!

// formatted for watson-developer-cloud wrapper
config.watson = {};

config.watson.username = process.env.WATSON_USERNAME || credentials.watson.username;
config.watson.password = process.env.WATSON_PASSWORD || credentials.watson.password;
config.watson.version = 'v2';

// mongodb
config.mongo_uri = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/';
config.mongo_db = config.mongo_uri + "druthers"

module.exports = config;
