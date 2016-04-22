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
            console.log($scope.selected.simulation);
        };


        $scope.recipes = {
            labels: ['Rec1', 'Rec2', 'Rec3', 'Rec4', 'Rec5'],
            series: [
                [500, 400, 300, 700, 500]
            ]
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
