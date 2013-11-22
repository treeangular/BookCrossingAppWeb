'use strict';

var BookCrossingAppWeb = angular.module('BookCrossingAppWeb', ['dataServices', 'localization', 'ui.map']);

BookCrossingAppWeb.config(['$routeProvider','$httpProvider', function ($routeProvider, $httpProvider) {
    $routeProvider
        .when('/Main', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        })
        .otherwise({
            redirectTo: '/Main'
        });

      loadParse();

}]);

function loadParse()
{
    /* Test
     var PARSE_APP_ID = "MyXalB83PFKV15BOPSO2lKBBzkYeyLKGNYsNI5DS";
     var PARSE_JS_ID = "7pNuZLzLEArqUc2BlQNmDgD5HMVL4l3G9ZIKP3Qr";*/
    //Production
    var PARSE_APP_ID = "j7SSabUR9BT5xXM0r466Wthn7FSEDdIT1RcjqWnP";
    var PARSE_JS_ID = "tHuZdyxD04OY6S4ejMlUeqPrIoKoKJi6TJItcmlN";

    Parse.initialize(PARSE_APP_ID, PARSE_JS_ID);
}
