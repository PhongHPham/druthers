var mongoose = require('mongoose');

var candidateSchema = new mongoose.Schema({
  name: String, 
  score: Number,
  imageUrl: String
});

var Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;
