var analyzeTweets = require('./analyzeTweets.js');
var candidateController = require('./db/controllers/candidateController.js');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/druthers');
var candidates = [['Donald Trump', 'realDonaldTrump', 'http://www.greanvillepost.com/wp-content/uploads/2015/08/Donald-Trump-Caricature.jpg']];


for (var i = 0; i < candidates.length; i++) {
  var curCandidate = {
    name: candidates[i][0],
    twitter: candidates[i][1],
    imageUrl: candidates[i][2]
  };
  analyzeTweets(curCandidate.twitter).then(function (personality) {
    for (var trait in personality) {
      curCandidate[trait] = personality[trait];
    }

    candidateController.create(curCandidate, function (error, result) {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
      }
    });
  });
  // analyzeTweets.analyzePersonality(curCandidate.twitter, function (error, personality) {
  //   if (error) {
  //     callback(error);
  //   } else {
  //     for (var trait in personality) {
  //       curCandidate[trait] = personality[trait];
  //     }
  //     candidateController.create(curCandidate, function (error, result) {
  //       console.log('!!!!!')
  //       if (error) {
  //         console.log(error);
  //       } else {
  //         console.log('candidate personality created!', result);
  //       }
  //     });
  //   }
  // });
}
