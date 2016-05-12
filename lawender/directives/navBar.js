var app = angular.module('app');

app.directive('navBar', function() {
    return {
        templateUrl: 'directives/navBar.html',
        link: function ($scope) {
        	$scope.url = config.rootUrl + '#/';
        }
    };
});