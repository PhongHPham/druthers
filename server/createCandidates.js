var analyzeTweets = require('./analyzeTweets.js');
var candidateController = require('./db/controllers/candidateController.js');
var Promise = require('bluebird');
var config = require("./config");
var mongoose = require('mongoose');
// candidates array for populating db
var candidates = [['Donald Trump', 'realDonaldTrump', 'https://i.imgur.com/Agz1KPg.jpg'],
                  ['Ben Carson', 'RealBenCarson', 'https://i.imgur.com/tdyvY5C.jpg'],
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

function populateDatabase (callback)  {
  callback = callback ||  function (error) {
      if (error) { throw error; }
  };
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
    candidateController.updateOrCreate(candidatesToSave, function (error, result) {
      // close db connection after populating with candidates 
      callback(error, result);
    });
  });
}

exports.populateDb = populateDatabase;

// uc:  "update or create"
// node createCandidates uc
// Note:  NEVER  start the server using `node server uc`
if (process.argv[2] === "uc") {
  console.log("Using the command line to update candidates.");
  mongoose.connect(config.mongo_db);
  populateDatabase(function (error, result) {
    mongoose.disconnect();
    if (error) {
          // check to see if 
          if (Array.isArray(error)) {
            error.forEach(function (cErr) {
                console.log(cErr);
            });
          } else {
            console.log(error);
          }
      } else {
        console.log(result);
      }
  });
}
