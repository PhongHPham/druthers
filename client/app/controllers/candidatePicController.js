app.controller('CandidatePicController', ['twitterServices', function (twitterServices, $rootscope) {

  this.match = twitterServices.getPic();

    
}]);
