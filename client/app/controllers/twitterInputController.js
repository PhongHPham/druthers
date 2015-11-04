// angular.module('druthers.services', [])


app.controller('TwitterInputController', ['twitterServices', function (twitterServices) {
  this.twitterHandle = null;

  // when user submits twitter handle getCandidateMatchpic calls factory function
  this.getCandidateMatchPic = function () {
    console.log('heres the twitter handle', this.twitterHandle);
    twitterServices.getMatchWithTwitterHandle(this.twitterHandle);
      // .then(function (string) {
      //   console.log(string);
      // });
  };

}]);








