var app = angular.module("app");

app.controller('confirmController', ['$scope', '$routeParams', '$location', 
	function ($scope, $routeParams, $location) {
		$scope.service = $routeParams.service;
	}
]);