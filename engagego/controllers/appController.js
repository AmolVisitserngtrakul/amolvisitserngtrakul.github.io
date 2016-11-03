var app = angular.module("app");

app.controller('appController', ['$scope', '$location', 
	function ($scope, $location) {
		$scope.index = function () {
			$location.path('');
		};
	}
]);