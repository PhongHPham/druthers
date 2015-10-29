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
exports.retrieveById = function (id, callback) {
  Candidate.findOne({id: id}, function(err, found) {
    if (err) {
      callback(err);
    } else {
      callback(found);
    }
  });
};


// update method
exports.updateScore = function (score, callback) {
  Candidate.findOneAndUpdate({score: candidate.score}, {upsert: false, new: true}, function (err, result) {
    if (err) {
      callback(err);
    } else {
      calback(result);
    }
  });
};

// delete method
exports.delete = function (candidate, callback) {
  Candidate.findOneAndRemove({name: candidate.name}, function (err, doc, callback) {
    if (err) {
      callback(err);
    } else {
      callback(result);
    }
  });
};

