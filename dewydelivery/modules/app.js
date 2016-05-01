var app = angular.module("app", ['ngRoute']);

app.config(['$routeProvider',
function($routeProvider) {
  $routeProvider.
  when('/', {
    templateUrl: 'views/app.html',
    controller: 'appController'
  }).
  otherwise({
    redirectTo: '/'
  });
}]);