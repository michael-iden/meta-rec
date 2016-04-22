(function() {
    'use strict';

    angular
        .module('metaRecApp')
        .controller('SimulationStatsController', SimulationStatsController);

    SimulationStatsController.$inject = ['$scope', '$state', '$http', '$routeParams'];

    function SimulationStatsController ($scope, $state, $http, $routeParams) {

        $scope.selected = {
            "clientIdentifier": "",
            "simulation": ""
        };

        $scope.clientSelectPlaceholder = "Loading Please Wait";
        var clientList = [];
        var simulations = [];

        $http.get('/clients').success(function(clients) {
            clientList = clients;
            $scope.clientSelectPlaceholder = "Start typing client name";
        });

        $scope.refreshClients = function(searchClient) {
            if(searchClient.length > 2) {
                $scope.clients = clientList;
            } else {
                $scope.clients = ["JOANN"];
            }
        };

        $scope.simulations = simulations;

        $scope.getPriorSimulations = function() {
            $http.get('/' + $scope.selected.clientIdentifier + '/webRecSimulations').success(function(simulations) {
                $scope.simulations = simulations;
            });
        };

        $scope.getSimulationData = function() {
            $http.get('/' + $scope.selected.clientIdentifier + '/webRecSimulations/' + $scope.selected.simulation.id + "/recipeData").success(function (data) {
                console.log(data);
            });

            $http.get('/' + $scope.selected.clientIdentifier + '/webRecSimulations/' + $scope.selected.simulation.id + "/criteriaData").success(function (data) {
                var keys = [];
                var values = [];
                for(var k in data) {
                    keys.push(k);
                    values.push(data[k]);
                }

                $scope.criteria = {
                    labels: keys,
                    series: [values]
                };
            });

            $http.get('/' + $scope.selected.clientIdentifier + '/webRecSimulations/' + $scope.selected.simulation.id + "/productData").success(function (data) {
                var keys = [];
                var values = [];
                for(var k in data) {
                    keys.push(k);
                    values.push(data[k]);
                }

                $scope.products = {
                    labels: keys,
                    series: [values]
                };
            });
        };

        $scope.barData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            series: [
                [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
                [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]
            ]
        };

        $scope.barOptions = {
            seriesBarDistance: 15
        };
    }
})();
