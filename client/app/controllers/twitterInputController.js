// angular.module('druthers.services', [])


app.controller('TwitterInputController', ['twitterServices', function (twitterServices) {
  this.twitterHandle = null;
  // when user submits twitter handle getCandidateMatchpic calls factory function
  var self = this;
  this.getCandidateMatchPic = function () {
    twitterServices.getMatchWithTwitterHandle(this.twitterHandle)
      .then(function (pic) {
        // this.pic = pic
        // console.log(this.pic)
        console.log('AHA heres the picUrl:', pic);
        self.pic = pic;
        return self.pic;
    });
  };
}]);








