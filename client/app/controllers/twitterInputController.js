// angular.module('druthers.services', [])


app.controller('TwitterInputController', ['twitterServices', function (twitterServices) {
  this.twitterHandle = null;
  // when user submits twitter handle getCandidateMatchpic calls factory function
  this.pic = '';
  this.getCandidateMatchPic = function () {
    twitterServices.getMatchWithTwitterHandle(this.twitterHandle)
      .then(function (pic) {
        // this.pic = pic
        // console.log(this.pic)
        console.log('AHA heres the picUrl:', pic);
        return this.pic;
    });
  };
}]);








