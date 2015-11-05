
// Get the person's score
// This function will work for candidates and users (input twitter accounts)
function getPersonScore (input)  {

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
  var generateMatch = function (userPersonality, candidates) {

    // Get the Twitter user's score
    var userScore = getPersonScore(userPersonality);

    // Get the candidate scores (an array of objects containing `score` and `name` fields)
    var candidatesScores = candidates.map(function (cCandidate) {
        return {
            // Get the candidate's score
            score: getPersonScore(cCandidate)

            // This is the current candidate  name
          , name:  cCandidate.name// TODO
        };
    });
    // [{ score:  Number, name String}, {...}, ...]

    // This is another way to do it
    // Lowest diff will be the lowest score diffrence
    var lowestDiff = Infinity;

    // Get the correct maching index
    var lastMachingIndex = -1;

    // Iterate the candidates' scores
    candidatesScores.forEach(function (cCandidateScore, index)  {
        // Make the difference
        var cDiff = Math.abs(userScore - cCandidateScore.score);

        // Check if the current diffrence is lower than lowestDiff
        if (cDiff < lowestDiff) {
          // Update the lowest difference
          lowestDiff = cDiff;
          // ...and also update the index (we need it later)
          lastMachingIndex = index;
        }
    });

    // Use the index we found to get the correct candidate match
    return candidates[lastMachingIndex];
    // End of solution 1

    // Solution 2 (e.g. in case you want to make a top 3)
    // Make the differences between the user score and candidates' scores
    var userDiffs = candidatesScores.map(function (cCandidateScore, index) {
          // 
        return {
          // Get the difference
          diff:  Math.abs(userScore - cCandidateScore.score),
          
          // Save the candidate index (because we are sorting this
          // array and we still need the index)
          candidateIndex: index,

          // For convenience, save the name also
          name: cCandidateScore.name
        };
    }).sort(function (a, b) {
      // Finally, sort the array
      return a.diff >  b.diff;
    });

    // Before sorting, the array contains the indexes sorted (because we justm mapped the candidatesScores array)
    // [{ diff:  0.1, candidateIndex:  0, name:  ...}, { diff:  0.03, candidateIndex:  1, name:  ...}, ...]

    // After sort
    // [{ diff:  0.03, candidateIndex:  1, name:  ...}, ..., { diff:  0.1, candidateIndex:  0, name:  ...}]
    
    // For example, to get the top 5, you can use:
    // var top5 = userDiffs.slice(0, 5);

    var lowestDiff = userDiffs[0];
    var candidateMatch = candidates[lowestDiff.candidateIndex];
    return candidateMatch;
  };  

  module.exports = generateMatch; 
