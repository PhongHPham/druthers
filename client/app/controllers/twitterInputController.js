angular.module('duthers.services', [])

.controller('TwitterInputController', function (twitterServices) {
  this.twitterHandle = null;

  // when user submits twitter handle getTweets call factory function
  this.getTweets = function (twitterHandle) {
    twitterServices.getMatchWithTwitterHandle(twitterHandle)
      .then(function (string) {
        console.log(string);
      });
  };

});








