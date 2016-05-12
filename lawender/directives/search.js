var app = angular.module('app');

app.directive('search', ['$q', '$http', '$location', 'contractService', '$timeout', 
	function ($q, $http, $location, contractService, $timeout) {
    return {
        templateUrl: 'directives/search.html',
        scope:{
	        searchText:"="       
	    },
        controller: function ($scope) {

        	var self = this;
			$scope.ctrl = self;
			self.searchText = $scope.searchText;
			self.simulateQuery = false;
			self.isDisabled    = false;
			// list of `state` value/display objects
			//self.contracts = null;
			//self.states = contractService;
			self.querySearch = querySearch;
			self.selectedItemChange = selectedItemChange;
			self.searchTextChange   = searchTextChange;
			self.newState = newState;
			self.search = search;

			function newState(state) {
			  	alert("Sorry! You'll need to create a Constituion for " + state + " first!");
			}

			function querySearch (query) {
				return query ? contractService.contracts.filter(createFilterFor(query)) : contractService.contracts;
			}

			function searchTextChange(text) {
			  //$log.info('Text changed to ' + text);
			}

			function selectedItemChange(item) {
				if (item) {
					$timeout(function () {
						$location.path('search/' + item.id);
					}, 500);
				}
			}

			function createFilterFor(query) {
			  var lowercaseQuery = angular.lowercase(query);
			  return function filterFn(state) {
			    return (state.display.indexOf(lowercaseQuery) > -1);
			  };
			}

			function search () {
				if (self.searchText) {
					$location.path('search/' + self.searchText);
				}
			}
        }
    };
}]);