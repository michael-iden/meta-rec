(function() {
    'use strict';

    angular
        .module('metaRecApp')
        .controller('SimulatorController', SimulatorController);

    SimulatorController.$inject = ['$scope', '$state', '$http'];

    function SimulatorController ($scope, $state, $http) {

        $scope.clientSelectPlaceholder = "Loading Please Wait";
        $scope.clients = [];

        var clientList;
        $http.get('/clients').success(function(clients) {
            clientList = clients;
            $scope.clientSelectPlaceholder = "Start typing client name";
        });

        $scope.selectedClient = {};


        $scope.refreshClients = function(searchClient) {
            if(searchClient.length > 1) {
                $scope.clients = clientList;
            } else {
                $scope.clients = [];
            }
        };


        $scope.getPageTypes = function() {
            console.log($scope.selectedClient);
            $http.get('/' + $scope.selectedClient.value + '/pageTypes').success(function(pageTypes) {
                console.log(pageTypes);
            });
        }
    }
})();
