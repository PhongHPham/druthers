var Candidate = require('../models/Candidate.js');

// create method
exports.createOne = function (candidate, callback) {
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

exports.createMany = function (candidates, callback) {
  Candidate.create(candidates, callback);
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
      callback(null, result);
    }
  });
};

// delete method
exports.delete = function (id, callback) {
  Candidate.findOneAndRemove({_id: id}, function (error, doc) {
    if (error) {
      callback(error);
    } else {
      callback(null, doc);
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

