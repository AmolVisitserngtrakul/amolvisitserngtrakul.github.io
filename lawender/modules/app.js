var app = angular.module("app", ['ngRoute', 'ngMaterial']);

app.config(['$routeProvider',
function($routeProvider) {
  $routeProvider.
  when('/', {
    templateUrl: 'views/app.html',
    controller: 'appController'
  }).
  when('/search/:query', {
    templateUrl: 'views/search.html',
    controller: 'searchController'
  }).
  when('/contract/:query', {
    templateUrl: 'views/contract.html',
    controller: 'contractController'
  }).
  otherwise({
    redirectTo: '/'
  });
}]);