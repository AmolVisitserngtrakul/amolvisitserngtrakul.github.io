var app = angular.module("app");

app.controller('engageController', ['$scope', '$routeParams', '$location',
	function ($scope, $routeParams, $location) {
		$scope.service = $routeParams.service;

		$scope.services = [0,1,2,3,4,5];

		$scope.confirmEngage = function () {
			$location.path('/confirm/' + $scope.service);
		}
	}
]);