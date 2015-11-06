
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
    var candidatesScores = candidates.map(function (curCandidate) {
        return {
            // Get the candidate's score
            score: getPersonScore(curCandidate)

            // This is the current candidate  name
          , name:  curCandidate.name
        };
    });
    // [{ score:  Number, name String}, {...}, ...]

    // This is another way to do it
    // Lowest diff will be the lowest score diffrence
    // var lowestDiff = Infinity;

    // // Get the correct maching index
    // var lastMachingIndex = -1;

    // // Iterate the candidates' scores
    // candidatesScores.forEach(function (curCandidateScore, index)  {
    //     // Make the difference
    //     var curDiff = Math.abs(userScore - curCandidateScore.score);

    //     // Check if the current diffrence is lower than lowestDiff
    //     if (curDiff < lowestDiff) {
    //       // Update the lowest difference
    //       lowestDiff = curDiff;
    //       // ...and also update the index (we need it later)
    //       lastMachingIndex = index;
    //     }
    // });

    // Use the index we found to get the correct candidate match
    //return candidates[lastMachingIndex];
    // End of solution 1

    // Solution 2 (e.g. in case you want to make a top 3)
    // Make the differences between the user score and candidates' scores
    var userDiffs = candidatesScores.map(function (curCandidateScore, index) {
          // 
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
      return a.diff >  b.diff;
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

