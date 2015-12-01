// angular.module('druthers.services', [])


app.controller('TwitterInputController', ['twitterServices', function (twitterServices) {
  this.twitterHandle = null;
  this.candidateName = '';
  // when user submits twitter handle getCandidateMatchpic calls factory function
  // var self = this;
  this.getCandidateMatch = function() {
    twitterServices.getMatchWithTwitterHandle(this.twitterHandle)
      .then(function (responseData) {
        createGraph(responseData);
        this.candidate = responseData.candidate;
        this.candidateName = 'You\'ve matched with ' + this.candidate.name;
        return this.candidate;
    }.bind(this));
  };
}]);








