angular.module('app', ['loginService', 'ngAnimate', 'app.root', 'ngMaterial'])
.config(function ($urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
})
.run(function ($rootScope, $window) {
  // google analytics
  // $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams) {
  //   var realURL = toState.url;
  //   if (!!$window.ga) {
  //     // resolves variables inside urls, ex: /error/:error in /error/unauthorized
  //     for (var v in toParams) {
  //       realURL = realURL.replace(':' + v, toParams[v]);
  //     }
  //     $window.ga('send', 'pageview', realURL);
  //   }
  // });
  /**
   * $rootScope.doingResolve is a flag useful to display a spinner on changing states.
   * Some states may require remote data so it will take awhile to load.
   */
  var resolveDone = function () { $rootScope.doingResolve = false; };
  $rootScope.doingResolve = false;

  $rootScope.$on('$stateChangeStart', function () {
    $rootScope.doingResolve = true;
  });
  $rootScope.$on('$stateChangeSuccess', resolveDone);
  $rootScope.$on('$stateChangeError', resolveDone);
  $rootScope.$on('$statePermissionError', resolveDone);
})
.controller('BodyController', function ($scope, $state, $stateParams, loginService, $http, $timeout) {
  // Expose $state and $stateParams to the <body> tag
  $scope.$state = $state;
  $scope.$stateParams = $stateParams;

  // loginService exposed and a new Object containing login user/pwd
  $scope.ls = loginService;
  $scope.login = {
    working: false,
    wrong: false
  };
  $scope.userRoles = userRoles;
  // $scope.isUser = function () {
  // 	return $scope.ls.userRole === userRoles.user;
  // };
  $scope.loginMe = function () {
    // setup promise, and 'working' flag
    var loginPromise = $http.post('api/authen/login.php', $scope.login);
    $scope.login.working = true;
    $scope.login.wrong = false;

    loginService.loginUser(loginPromise);
    loginPromise.error(function () {
      $scope.login.wrong = true;
      $timeout(function () { $scope.login.wrong = false; }, 8000);
    });
    loginPromise.finally(function () {
      $scope.login.working = false;
    });
  };
  $scope.logoutMe = function () {
    loginService.logoutUser($http.get('/api/authen/logout'));
  };
});

// var app = angular.module("app", ['ngRoute', 'ngMaterial']);

// app.config(['$routeProvider',
// function($routeProvider) {
//   $routeProvider.
//   when('/', {
//     templateUrl: 'views/app.html',
//     controller: 'appController'
//   }).
//   when('/search/:query', {
//     templateUrl: 'views/search.html',
//     controller: 'searchController'
//   }).
//   when('/contract/:query', {
//     templateUrl: 'views/contract.html',
//     controller: 'contractController'
//   }).
//   otherwise({
//     redirectTo: '/'
//   });
// }]);