# Druthers

![Druthers screenshot](/readme_images/Druthers-screenshot.png)

> Druthers is a web app that matches users with a presidential candidate. A sentiment analysis of the user's tweets is performed by the IBM Watson Personality API and compared to tweet data from presidential candidates using a matching alogorithm. The degree of personality correlation between the user and her match as well as the other candidates is displayed dynamically in a bipartite graph. Try it Druthers [here](druthers-druthers.rhcloud.com/)!

## Team

  - __Product Owner and Developer__: Phong Pham

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

1. Developers, if you would like to work on this app fork it [here](https://github.com/PhongHPham/druthers/).
1. You'll also need to get your own Twitter API keys by [creating a new app](https://apps.twitter.com/).
1. Next you'll want to obtain Watson credentials to use the Watson Personality Insight API. Visit [IMB Watson Developer Cloud](http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/getting_started/gs-credentials.shtml) to learn how.

1. Add a file named `credentials.js` to the config folder in your server directory with the following code:

```javascript
// twitter credentials
var config = {};

config.twitter = {};

config.twitter.consumer_key = '';
config.twitter.consumer_secret = '';
config.twitter.access_token_key = '';
config.twitter.access_token_secret = '';

// Watson Personality Insights credentials 
// formatted for watson-developer-cloud wrapper
config.watson = {};

config.watson.username = '';
config.watson.password = '';
config.watson.version = 'v2';
```

1. You will need to fill out the strings with the relevant keys/authentication credentials from Twitter and IBM Watson respectively. This file is included in the .gitignore as such, it will not be commited to your github.  

1. Follow installing dependencies instructions. 

## Requirements

- angular 1.4.7
- angular-nvd3 1.0.2
- angular-ui-router 0.2.15
- bluebird 3.0.2
- body-parser 1.14.1
- bootstrap 3.3.5
- bower 1.6.5
- cron 1.0.9
- jquery 2.1.4
- express 4.13.3 
- mongodb 2.0.46
- mongoose 4.2.2
- node 0.12.7
- twitter 1.2.5
- watson-developer-cloud 0.10.6

## Development
### Installing Dependencies

Within the root directory:

Make sure you have npm installed, then ... 

    npm install
    bower install

### Roadmap

View the project roadmap [here](https://github.com/PhongHPham/druthers/issues)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines
