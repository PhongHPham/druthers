var analyzeTweets = require('./analyzeTweets.js');
var candidateController = require('./db/controllers/candidateController.js');
var Promise = require('bluebird');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/druthers');
// candidates array for populating db
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
  // fill out array with analyzePersonality call (from analyzeTweets.js)
  // using each candidate's twitter handle
  analyzeCandidateTweetsP.push(analyzeTweets(candidates[i][1]));

}
// use bluebird all method so that all items in analyzeCandidateTweetsP are
// iterated and fulfilled before a promise is returned
Promise.all(analyzeCandidateTweetsP).then(function (results) {
  // then iterate over candidates array again
  for (var j = 0; j < candidates.length; j++) {
    // and build candidate object for each element in array 
    var curCandidate = {
      name: candidates[j][0],
      twitter: candidates[j][1],
      imageUrl: candidates[j][2]
    };
    // and each candidate's traits object
    var traits = results[j];
    // is iterated over and added to the current candidate object
    for (var trait in traits) {
      curCandidate[trait] = traits[trait];
    }
    // then updated candidate object with traits is added to an array
    candidatesToSave.push(curCandidate);
  }
  // now new candidate array is used to populate the database 
  candidateController.createMany(candidatesToSave, function (error, result) {
    if (error) {
      console.log(error);
    } else {
      console.log(result);
    }
    // close db connection after populating with candidates 
    mongoose.disconnect();
  });
});
