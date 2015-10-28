var Candidate = require('../models/Candidate.js');

// create method
exports.create = function (candidate, callback) {
  Candidate.findOne({name: candidate.name}, function(err, found) {
    if (err) {
      callback(err);
    } else if (found) {
      callback('Candidate already exists');
    } else {
      Candidate.create(candidate, callback);
    }
  });

};

// retrieveAll method
exports.retrieveAll = function (callback) {
  Candidate.find({}, callback);
};

// retrieveById method


// update method
exports.updateScore = function (score, callback) {
  User.findOneAndUpdate({score: score}, {upsert: false, new: true}, function (err, result) {
    if (err) {
      callback(err);
    } else {
      calback(result);
    }
  });
};

// delete method

