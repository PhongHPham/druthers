// angular.module('druthers.services', [])


app.controller('TwitterInputController', ['twitterServices', function (twitterServices) {
  this.twitterHandle = null;
  // when user submits twitter handle getCandidateMatchpic calls factory function
  // var self = this;
  this.getCandidateMatch = function () {
    twitterServices.getMatchWithTwitterHandle(this.twitterHandle)
      .then(function (candidate) {
        // this.pic = pic
        // console.log(this.pic)
        console.log('AHA heres the picUrl:', candidate);
        this.candidate = candidate;
        return this.candidate;
    }.bind(this));
  };
}]);








