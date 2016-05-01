var app = angular.module("app");

app.run(['$anchorScroll', function($anchorScroll) {
  	$anchorScroll.yOffset = 120;
}]);

app.controller('appController', ['$scope', '$http', '$timeout', 
	function ($scope, $http, $timeout) {
		$scope.amount = 0;
		$scope.price = 25;
		$scope.transport = 25;
		$scope.orders = [];

		$scope.calculate = function () {
			$scope.price = 0;
			for (var i=0; i<$scope.orders.length; i++) {
				$scope.price += $scope.orders[i].amount * $scope.orders[i].price;
			}
			$scope.price += $scope.transport;
		};

		$scope.order = function (food, price) {
			for (var i=0; i<$scope.orders.length; i++) {
				if ($scope.orders[i].food === food) {
					$scope.orders[i].amount += 1;
					return;
				}
			}
			$scope.orders.push({
				'food': food,
				'amount': 1,
				'price': price
			});
			$scope.calculate();
		};

		$scope.delete = function (food) {
			for (var i=0; i<$scope.orders.length; i++) {
				if ($scope.orders[i].food === food) {
					if ($scope.orders[i].amount <= 1) {
						$scope.orders.splice(i, 1);
					}
					else {
						$scope.orders[i].amount = $scope.orders[i].amount - 1;
					}
				}
			}
			$scope.calculate();
		};

		$scope.confirmOrder = function () {
			$('#confirmOrder').modal();
		};
	}
]);