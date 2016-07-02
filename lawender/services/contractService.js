var app = angular.module("app");

app.service('contractService', function ($http, $q) {
	var self = this;

	self.contracts = null;
	self.promise = null;
	self.getContracts = function () {
		return $http.get('configs/contracts.json').then(function (response) {
			self.contracts = response.data.contracts;
		});
	};

	self.saveData = function (data) {
		return $http.post('api/contract/saveData.php', data);
	};

	self.getData = function (id) {
		return $http.post('api/contract/getData.php', id);
	};

	self.promise = self.getContracts();

	return self;
});