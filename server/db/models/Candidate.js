var mongoose = require('mongoose');

var candidateSchema = new mongoose.Schema({
  name: String, 
  twitter: String,
  imageUrl: String,
  Openness: Number,
  Conscientiousness: Number,
  Extraversion: Number,
  Agreeableness: Number,
  'Emotional range': Number 
});

var Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;
