var app = angular.module("app");

app.controller('contractController', ['$scope', '$state', '$q', 'contractService',
	function ($scope, $state, $q, contractService) {
		$scope.query = $state.params.query;
		$scope.id = 1;
		$scope.searchText = $scope.query;

		$scope.contractUrl = config.rootUrl + 'contract/#/' + $scope.id;

		$scope.contract = {};

		$scope.printContract = function () {
			var data = [];
			for (var c in $scope.contract) {
				var d = {
					field: c,
					value: $scope.contract[c]
				};
				data.push(d);
			}
			var request = {
				contract: 1,
				data: data
			};
			$q.when(contractService.saveData(request))
			.then(function (response) {
				//alert(JSON.stringify(response.data));
				// window.frames["contractFrame"].focus();
				// window.frames["contractFrame"].print();
			});
		};

		$q.when(contractService.getData({ id: $scope.id }))
		.then(function(response) {
			for (var d in response.data) {
				$scope.contract[response.data[d].field] = response.data[d].value;
			}
			setTimeout(function () {
				window.frames["contractFrame"].updateContractData($scope.contract);
			}, 1000);
			//alert(JSON.stringify($scope.contract));
			//$scope.$apply();
		});

		$scope.$watch('contract', function (newValue, oldValue) {
			if (newValue != oldValue) {
				if (window.frames["contractFrame"] && window.frames["contractFrame"].updateContractData) {
					window.frames["contractFrame"].updateContractData($scope.contract);
				}
			}
		}, true);
	}
]);