var Credentials = require(__dirname + "/../server/credentials");
var ExecSync = require("child_process").execSync;

var variables = [
		[ "TWITTER_CONSUMER_KEY", Credentials.twitter.consumer_key ],
		[ "TWITTER_CONSUMER_SECRET", Credentials.twitter.consumer_secret ],
		[ "TWITTER_ACCESS_TOKEN_KEY", Credentials.twitter.access_token_key ],
		[ "TWITTER_ACCESS_TOKEN_SECRET", Credentials.twitter.access_token_secret ],
		[ "WATSON_USERNAME", Credentials.watson.username ],
		[ "WATSON_PASSWORD", Credentials.watson.password ]
];

variables.forEach(function (c)  {
		console.log(ExecSync("rhc set-env "  +  c[0] +  "=" +  c[1] + " -a Druthers").toString());
});
