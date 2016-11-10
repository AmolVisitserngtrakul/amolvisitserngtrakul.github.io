var app = angular.module("app");

app.controller('confirmController', ['$scope', '$routeParams', 
	function ($scope, $routeParams) {
		$scope.service = $routeParams.service;
	}
]);