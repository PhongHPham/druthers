// iterate over candidates array
// check score with user's personality trait scores
  // for each trait calculate distance of absolute trait values
  // reduce differences to single value
  // check if difference lower than lowest difference
    // set that as new lowest difference

  // return image link for lowest difference candidate

  var generateMatch = function (userPersonality, candidates) {
    var lowestDif = Infinity;
    var candidateMatch;
    var difs = {};
      var curDif = 0;

    for (var i = 0; i < candidates.length; i++) {
      
      for (var trait in userPersonality) {
        curDif += Math.abs(userPersonality[trait] - candidates[i][trait]);
        if (curDif < lowestDif) {
          difs[candidates[i].name] = curDif;
          lowestDif = curDif;
          candidateMatch = candidates[i];
        }
      }
    }
    console.log(difs);
    return candidateMatch;
  };

  module.exports = generateMatch;
