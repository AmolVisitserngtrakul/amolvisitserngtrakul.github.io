var app = angular.module("app", ['ngFileUpload', 'ngRoute']);

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