var app = angular.module("app");

app.controller('appController', ['$scope', 
	function ($scope) {
		$scope.contract = {};

		window.updateContractData = function (contract) {
			$scope.contract = contract;
			$scope.$apply();
		}
	}
]);