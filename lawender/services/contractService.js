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

	self.promise = self.getContracts();

	return self;
});