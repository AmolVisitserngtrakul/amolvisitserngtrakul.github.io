var app = angular.module("app");

app.controller('indexController', ['$scope', '$location', 
	function ($scope, $location) {
		$scope.test = 'test123456';
		$scope.carouselFlag = 0;
		$scope.carouselImage = {background: "url(\'./images/spa.jpg\') 50% 70% no-repeat"};
		setInterval(function () {
			if ($scope.carouselFlag == 0) {
				$scope.carouselFlag = 1;
				$scope.carouselImage = {background: "url(\'./images/badminton2.jpg\') 50% 70% no-repeat"};
			}
			else if ($scope.carouselFlag == 1) {
				$scope.carouselFlag = 2;
				$scope.carouselImage = {background: "url(\'./images/football2.jpg\') 50% 90% no-repeat"};
			}
			else {
				$scope.carouselFlag = 0;
				$scope.carouselImage = {background: "url(\'./images/spa.jpg\') 50% 70% no-repeat"};
			}
			$scope.$apply();
		}, 5000);

		$scope.search = function () {
			$location.path('/engage/massage');
		}
	}
]);