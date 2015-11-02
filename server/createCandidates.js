var analyzeTweets = require('./analyzeTweets.js');
var candidateController = require('./db/controllers/candidateController.js');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/druthers');
var candidates = [['Donald Trump', 'realDonaldTrump', 'http://www.greanvillepost.com/wp-content/uploads/2015/08/Donald-Trump-Caricature.jpg'],
                  ['Ben Carson', 'realDonaldTrump', 'http://i.imgur.com/tdyvY5C.jpg'],
                  ['Bernie Sanders', 'BernieSanders', 'http://i.imgur.com/egXkZtv.jpg'],
                  ['Bobby Jindal', 'BobbyJindal', 'https://i.imgur.com/g3flAoU.jpg'],
                  ['Carly Fiorina', 'CarlyFiorina', 'https://i.imgur.com/aMU1VDr.jpg'],
                  ['Chris Christie', 'ChrisChristie', 'https://i.imgur.com/bWR0P8H.jpg'],
                  ['Hillary Clinton', 'HillaryClinton', 'https://i.imgur.com/qu6BBGT.jpg'],
                  ['Jeb Bush', 'JebBush', 'https://i.imgur.com/NTmJ5Ct.jpg'],
                  ['John Kasich', 'JohnKasich', 'https://i.imgur.com/o7JyBOC.jpg'],
                  ['Lawrence Lessig', 'lessig', 'https://i.imgur.com/xlU7YZS.jpg'],
                  ['Lindsey Graham', 'LindseyGrahamSC', 'https://i.imgur.com/BXSCCD2.jpg'],
                  ['Marco Rubio', 'marcorubio', 'https://i.imgur.com/tkuphbJ.jpg'],
                  ['Martin O\'Malley', 'MartinOMalley', 'https://i.imgur.com/oL8ijqx.jpg'],
                  ['Mike Huckabee', 'GovMikeHuckabee', 'https://i.imgur.com/5uZIgnV.jpg'],
                  ['Rand Paul', 'RandPaul', 'https://i.imgur.com/2w0Vm8l.jpg'],
                  ['Ted Cruz', 'tedcruz', 'https://i.imgur.com/JKs2Dhk.jpg']
];


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
