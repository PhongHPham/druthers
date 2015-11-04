app.factory('twitterServices', function ($http) {

  var getMatchWithTwitterHandle = function (twitterHandle) {
    return $http({
      method: 'GET',
      url: '/api/twitter/' + twitterHandle
    })
    .then(function (response) {
      console.log('returning the pic!!!! :', response.data.imageUrl)
      return response.data;
    });
  };
  return {
    getMatchWithTwitterHandle: getMatchWithTwitterHandle
  };
});
