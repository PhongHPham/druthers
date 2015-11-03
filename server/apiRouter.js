var apiRouter = require('express').Router();
var analyzeTweets = require('./analyzeTweets.js');
var candidateController = require('./db/controllers/candidateController.js');
var generateMatch = require('./generateMatch.js');
apiRouter.route('/twitter/:twitterHandle')
  .get(function (request, response) {
    //response.send('you\'ve requested' + request.params.twitterHandle);
    analyzeTweets(request.params.twitterHandle).then(function (personality) {
      // if (error) {
      //   response.send('there was an error sending your tweet: ' + err);
        candidateController.retrieveAll(function (error, candidates) {
          if (error) {
            response.json(error);
          } else {
            var match = generateMatch(personality, candidates);
            response.json(match);
          }
        })
      });

      // response.json(result);
        // watson.analyzeTweet(result, function(err, score) {
        //   var candidate = utilities.compareScore(score)
        //   res.send(utils.candidates[candidate])
        // })
      
    
  });

apiRouter.route('/candidates')
  .get(function (request, response) {
    candidateController.retrieveAll(function (error, result) {
      if (error) {
        response.send(error);
      }
      response.json(result);
    });
  })


  .post(function (request, response) {
    console.log(request);
    candidateController.create({name: request.body.name, score: request.body.score, imageUrl: request.body.imageUrl}, function (err, result) {
      if (error) {
        response.send(error);
      }
      response.send('candidate created, ' + result);
    });
  });

apiRouter.route('/candidates/:id')
  .get(function (request, response) {
    candidateController.retrieveById(request.params.id, function (error, result) {
      if (error) {
        response.send(error);
      }
      response.json(result);
    });
  })

  .delete(function (request, response) {
    candidateController.delete(request.params.id, function (error, result) {
      if (error) {
        response.json('Candidate doesn\'t exist');
      }
      response.json(result);
    });
  })

  .put(function (request, response) {
    candidateController.updateScore(request.params.id, function (error, result) {
      if (error) {
        response.json('Candidate not found');
      }
      response.json(result);
    });
  });

module.exports = apiRouter;
