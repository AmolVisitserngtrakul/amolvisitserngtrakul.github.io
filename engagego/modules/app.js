var app = angular.module("app", ['ngRoute']);

app.config(['$routeProvider',
function($routeProvider) {
  $routeProvider
  .when('/engage/:service', {
    templateUrl: 'views/engage.html',
    controller: 'engageController'
  })
  .otherwise({
    templateUrl: 'views/index.html',
    controller: 'indexController'
  });
}]);