// angular.module('druthers.services', [])


app.controller('TwitterInputController', ['twitterServices', function (twitterServices) {
  this.twitterHandle = null;
  this.candidateName = 'Enter your twitter handle!';
  // when user submits twitter handle getCandidateMatchpic calls factory function
  // var self = this;
  this.getCandidateMatch = function () {
    twitterServices.getMatchWithTwitterHandle(this.twitterHandle)
      .then(function (candidate) {
        this.candidate = candidate;
        this.candidateName = 'You\'ve matched with ' + this.candidate.name;
        return this.candidate;
    }.bind(this));
  };
}]);








