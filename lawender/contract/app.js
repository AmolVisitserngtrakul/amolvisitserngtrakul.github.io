var app = angular.module("app", ['ngRoute']);

app.config(['$routeProvider',
function($routeProvider) {
  $routeProvider
  .when('/1', {
    templateUrl: 'contract/1.html',
    controller: 'appController'
  })
  .otherwise({
    templateUrl: 'contract/1.html',
    controller: 'appController'
  });
}]);