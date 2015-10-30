var apiRouter = require('express').Router();
var twitter = require('./twitter.js');
var candidateController = require('./db/controllers/candidateController.js');

apiRouter.route('/twitter/:twitterHandle')
  .get(function (request, response) {
    //response.send('you\'ve requested' + request.params.twitterHandle);
    twitter.getFormattedTweetsByHandle(request.params.twitterHandle, function(err, result) {
      if (err) {
        response.send('there was an error sending your tweet: ' + err);
      }

      response.json(result);
        // watson.analyzeTweet(result, function(err, score) {
        //   var candidate = utilities.compareScore(score)
        //   res.send(utils.candidates[candidate])
        // })
      
    });
  });

apiRouter.route('/candidates')
  .get(function (request, response) {
    candidateController.retrieveAll(function (err, result) {
      if (err) {
        response.send(err);
      }
      response.json(result);
    });
  })


  .post(function (request, response) {
    console.log(request);
    candidateController.create({name: request.body.name, score: request.body.score, imageUrl: request.body.imageUrl}, function (err, result) {
      if (err) {
        response.send(err);
      }
      response.send('candidate created, ' + result);
    });
  });

apiRouter.route('/candidates/:id')
  .get(function (request, response) {
    candidateController.retrieveById(request.params.id, function (err, result) {
      if (err) {
        response.send(err);
      }
      response.json(result);
    });
  })

  .delete(function (request, response) {
    candidateController.findOneAndRemove(request.params.id, function (err, result) {
      if (err) {
        response.json('Candidate doesn\'t exist');
      }
      response.json(result);
    });
  });

module.exports = apiRouter;
