app.factory('twitterServices', function ($http) {

  var getMatchWithTwitterHandle = function (twitterHandle) {
    return $http({
      method: 'GET',
      url: '/api/twitter/' + twitterHandle
    })
    .then(function (response) {
      return response.data.imageUrl;
    });
  };


  return {
    getMatchWithTwitterHandle: getMatchWithTwitterHandle,
  };
});
