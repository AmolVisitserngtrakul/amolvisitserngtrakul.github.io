angular.module('app.root', ['ui.router']).config(function ($stateProvider) {
    $stateProvider
    .state('app', {
      abstract: true,
      template: '<ui-view></ui-view>',
      resolve: {
        'login': function (loginService, $q, $http) {
          var roleDefined = $q.defer();

          /**
           * In case there is a pendingStateChange means the user requested a $state,
           * but we don't know yet user's userRole.
           *
           * Calling resolvePendingState makes the loginService retrieve his userRole remotely.
           */
          if (loginService.pendingStateChange) {
            return loginService.resolvePendingState($http.get('/api/authen/user'));
          } else {
            roleDefined.resolve();
          }
          return roleDefined.promise;
        }
      }
    })
    .state('app.home', {
      url: '/',
      templateUrl: 'views/app.html',
      controller: 'appController'
    })
    .state('app.search', {
      url: '/search/:query',
      templateUrl: 'views/search.html',
      controller: 'searchController'
    })
    .state('app.contract', {
      url: '/contract/:query',
      templateUrl: 'views/contract.html',
      controller: 'contractController',
      //accessLevel: accessLevels.user
    });
});
