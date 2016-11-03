var app = angular.module("app");

app.controller('engageController', ['$scope', '$routeParams', 
	function ($scope, $routeParams) {
		$scope.service = $routeParams.service;

		$scope.services = [0,1,2,3,4,5];
	}
]);