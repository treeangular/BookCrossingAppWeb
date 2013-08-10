'use strict';

var BookCrossingAppWeb = angular.module('BookCrossingAppWeb', ['dataServices', 'localization', 'ui.map']);

BookCrossingAppWeb.config(['$routeProvider','$httpProvider', function ($routeProvider, $httpProvider) {
    $routeProvider

        .when('/Main', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });



    //loadGoogleAnalytics(window);
    loadHttpInterceptor($httpProvider);
    loadFastClick();
    loadParse();
    loadFB();

}]);

angular.module('BookCrossingAppWebApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
