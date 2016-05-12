var app = angular.module("app");

app.controller('searchController', ['$scope', '$routeParams', '$q', 'contractService', '$location',
	function ($scope, $routeParams, $q, contractService, $location) {
		$scope.query = $routeParams.query;
		$scope.id = parseInt($scope.query);
		$scope.searchText = $scope.query;
		$scope.contracts = [];

		$q.when(contractService.promise).then(function () {
			for (var c in contractService.contracts) {
				if (!isNaN($scope.id) && contractService.contracts[c].id == $scope.id) {
					$scope.searchText = contractService.contracts[c].display;
					$scope.contracts.push(contractService.contracts[c]);
				}
				else {
					if (contractService.contracts[c].display.indexOf($scope.searchText) > -1) {
						$scope.contracts.push(contractService.contracts[c]);
					}
				}
			}
		});

		$scope.selectContract = function (id) {
			$location.path('/contract/1');
		};
	}
]);