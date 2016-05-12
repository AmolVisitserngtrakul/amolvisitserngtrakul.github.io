var app = angular.module("app");

app.run(['$anchorScroll', function($anchorScroll) {
  	$anchorScroll.yOffset = 120;
}]);

app.controller('appController', ['$scope', '$http', '$timeout', '$q', '$location', 
	function ($scope, $http, $timeout, $q, $location) {
	}
]);