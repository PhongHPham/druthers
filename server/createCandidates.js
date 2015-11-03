var analyzeTweets = require('./analyzeTweets.js');
var candidateController = require('./db/controllers/candidateController.js');
var Promise = require('bluebird');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/druthers');
var candidates = [['Donald Trump', 'realDonaldTrump', 'https://i.imgur.com/Agz1KPg.jpg'],
                  ['Ben Carson', 'realDonaldTrump', 'https://i.imgur.com/tdyvY5C.jpg'],
                  ['Bernie Sanders', 'BernieSanders', 'https://i.imgur.com/egXkZtv.jpg'],
                  ['Bobby Jindal', 'BobbyJindal', 'https://i.imgur.com/g3flAoU.jpg'],
                  ['Carly Fiorina', 'CarlyFiorina', 'https://i.imgur.com/aMU1VDr.jpg'],
                  ['Chris Christie', 'ChrisChristie', 'https://i.imgur.com/bWR0P8H.jpg'],
                  ['Hillary Clinton', 'HillaryClinton', 'https://i.imgur.com/qu6BBGT.jpg'],
                  ['Jeb Bush', 'JebBush', 'https://i.imgur.com/NTmJ5Ct.jpg'],
                  ['John Kasich', 'JohnKasich', 'https://i.imgur.com/o7JyBOC.jpg'],
                  ['Lawrence Lessig', 'lessig', 'https://i.imgur.com/xlU7YZS.jpg'],
                  ['Marco Rubio', 'marcorubio', 'https://i.imgur.com/tkuphbJ.jpg'],
                  ['Martin O\'Malley', 'MartinOMalley', 'https://i.imgur.com/oL8ijqx.jpg'],
                  ['Mike Huckabee', 'GovMikeHuckabee', 'https://i.imgur.com/5uZIgnV.jpg'],
                  ['Rand Paul', 'RandPaul', 'https://i.imgur.com/2w0Vm8l.jpg'],
                  ['Ted Cruz', 'tedcruz', 'https://i.imgur.com/JKs2Dhk.jpg']
];

var analyzeCandidateTweetsP = [];
var candidatesToSave = [];
// iterate over candidates and push analyzedTweets promise
for (var i = 0; i < candidates.length; i++) {

  analyzeCandidateTweetsP.push(analyzeTweets(candidates[i][1]));

}
Promise.all(analyzeCandidateTweetsP).then(function (results) {
  for (var j = 0; j < candidates.length; j++) {
    var curCandidate = {
      name: candidates[j][0],
      twitter: candidates[j][1],
      imageUrl: candidates[j][2]
    };
    var traits = results[j];

    for (var trait in traits) {
      curCandidate[trait] = traits[trait];
    }
    candidatesToSave.push(curCandidate);
  }
  candidateController.createMany(candidatesToSave, function (error, result) {
    if (error) {
      console.log(error);
    } else {
      console.log(result);
    }
    mongoose.disconnect();
  });
});
