var app = angular.module("app");

app.controller('contractController', ['$scope', '$state', '$q', 'contractService',
	function ($scope, $state, $q, contractService) {
		$scope.query = $state.params.query;
		$scope.id = parseInt($scope.query);
		$scope.searchText = $scope.query;

		$scope.contractUrl = config.rootUrl + 'contract/#/1';

		$scope.contract = {};

		$scope.printContract = function () {
			window.frames["contractFrame"].focus();
			window.frames["contractFrame"].print();
		}

		$scope.$watch('contract', function (newValue, oldValue) {
			if (newValue != oldValue) {
				window.frames["contractFrame"].updateContractData($scope.contract);
			}
		}, true)
	}
]);