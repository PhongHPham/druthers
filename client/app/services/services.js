app.factory('twitterServices', function ($http) {

  // sends a 
  var getMatchWithTwitterHandle = function (twitterHandle) {
    return $http({
      method: 'GET',
      url: '/api/twitter/:twitterHandle'
    })
    .then(function (response) {
      return response.data;
    });
  };

});
