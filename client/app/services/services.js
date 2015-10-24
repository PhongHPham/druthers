app.factory('twitterServices', function ($http) {

  // sends a 
  var getGiantString = function () {
    return $http({
      method: 'GET',
      url: '/api/'
    })
    .then(function (response) {
      return response.data;
    });
  };

});
