var Candidate = require('../models/Candidate.js');

// create method
exports.create = function (candidate, callback) {
  Candidate.findOne({name: candidate.name}, function(error, found) {
    if (error) {
      callback(error);
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
  Candidate.findOne({id: id}, function(error, found) {
    if (error) {
      callback(err);
    } else {
      callback(null, found);
    }
  });
};


// update method
exports.updateScore = function (name, newScore, callback) {
  Candidate.findOneAndUpdate({name: name}, {score: newScore}, {upsert: false, new: true}, function (error, result) {
    if (error) {
      callback(error);
    } else {
      calback(null, result);
    }
  });
};

// delete method
exports.delete = function (candidate, callback) {
  Candidate.findOneAndRemove({name: candidate.name}, function (error, doc, callback) {
    if (error) {
      callback(error);
    } else {
      callback(null, result);
    }
  });

};
exports.setPersonality = function (candidate, profile, callback) {
  Candidate.findOneAndUpdate({name: candidate.name}, profile, {upsert: false, new: true}, function (error, result) {
    if (error) {
      callback(error);
    } else {
      callback(null, result);
    }
  });
};

