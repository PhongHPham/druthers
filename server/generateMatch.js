
// Get the person's score
// This function will work for candidates and users (input personality results object)
function getPersonScore(input)  {

  // These are the keys that are used in the score sum
  var keys = [
     "Openness", "Conscientiousness",
     "Extraversion", "Agreeableness",
     "Emotional range"
  ];

  // Initialize the score
  var score = 0;
  // Iterate the keys
  for (var i = 0; i < keys.length; ++i) {
    // Sum the values
    score += input[keys[i]];
  }

  // And finally, return the score
  return score;
}

  // return image link for lowest difference candidate
  var generateMatch = function(userPersonality, candidates) {

    // Get the Twitter user's score
    var userScore = getPersonScore(userPersonality);

    // Get the candidate scores (an array of objects containing `score` and `name` fields)
    var candidatesScores = candidates.map(function (curCandidate) {
        return {
          // Get the candidate's score
          score: getPersonScore(curCandidate),
          // This is the current candidate  name
          name:  curCandidate.name
        };
    });
   
    // Make the differences between the user score and candidates' scores
    var userDiffs = candidatesScores.map(function (curCandidateScore, index) {
      return {
        // Get the difference
        diff:  Math.abs(userScore - curCandidateScore.score),
        // Save the candidate index (because we are sorting this
        // array and we still need the index)
        candidateIndex: index,
        // For convenience, save the name also
        name: curCandidateScore.name,
        score: curCandidateScore
      };
    }).sort(function (a, b) {
      // Finally, sort the array
      // The sort function should return a positive or negative number
      return a.diff >  b.diff ?  1  :  -1;
    });

    userPersonality.score = userScore;

    var lowestDiff = userDiffs[0];
    var candidateMatch = candidates[lowestDiff.candidateIndex];
    return {
        candidate: candidateMatch,
        user: userPersonality,
        top: userDiffs.map(function (c) {
          c.candidate = candidates[c.candidateIndex];
          return c;
        })
    };
  };  

  module.exports = generateMatch; 

