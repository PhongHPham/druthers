var app = angular.module('druthers', ['ui.router', 'nvd3']);

app.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('/', {
    url: '/',
    templateUrl: 'index.html',
    controller: 'IndexController',
    controllerAs: 'index',
    views: {
      'twitter-input': {
        templateUrl: 'app/views/twitter-input.html',
        controller: 'TwitterInputController',
        controllerAs: 'twitterCtrl'
      },
      'candidate-pic': {
        templateUrl: 'app/views/candidate-pic.html',
        controller: 'TwitterInputController',
        controllerAs: 'twitterCtrl'
      }
    }
  });

});

