

  // return image link for lowest difference candidate
  var generateMatch = function (userPersonality, candidates) {
    var lowestDif = Infinity;
    var candidateMatch; 
    // make difs object for debugging
    var difs = {};

    console.log(userPersonality)
    console.log(candidates[0])
  // iterate over candidates array
    for (var i = 0; i < candidates.length; i++) {
      // current difference starts as 0
      var curDif = 0;
      // for each candidate, loop over their user's personality traits object
      for (var trait in userPersonality) {
        // console.log(trait)
        // for each trait calculate distance of absolute trait values
        // between userPersonality and current candidate's traits
        curDif += Math.abs(userPersonality[trait] - candidates[i][trait]);
        // check if difference lower than lowest difference
        if (curDif < lowestDif) {
          // set key value pair of current candidate and current difference to 
          // check what we're getting
          difs[candidates[i].name] = curDif;
          // set current difference as lowest difference
          lowestDif = curDif;
          // candidateMatch is going be current candidate if it's difference is still lowest
          candidateMatch = candidates[i];
        }
      }
    } 
    // check output of what's in our difs object (expecting all the candidates)
    console.log(difs);
    // console.log('candidates array', candidates)
    return candidateMatch;
  };

  module.exports = generateMatch; 
