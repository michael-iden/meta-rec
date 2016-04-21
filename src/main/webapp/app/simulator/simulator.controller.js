(function() {
    'use strict';

    angular
        .module('metaRecApp')
        .controller('SimulatorController', SimulatorController);

    SimulatorController.$inject = ['$scope', '$state', '$http'];

    function SimulatorController ($scope, $state, $http) {

        $scope.clientSelectPlaceholder = "Loading Please Wait";
        $scope.clients = [];

        $scope.selectedClient = {};

        $scope.pageTypeList = {};
        $scope.zonesList = {};

        $scope.selectedPageType = {};
        $scope.selectedZone = {};

        var clientList = [];
        $http.get('/clients').success(function(clients) {
            clientList = clients;
            $scope.clientSelectPlaceholder = "Start typing client name";
        });

        $scope.refreshClients = function(searchClient) {
            if(searchClient.length > 2) {
                $scope.clients = clientList;
            } else {
                $scope.clients = [];
            }
        };

        $scope.getPageTypes = function() {
            $http.get('/' + $scope.selectedClient.value + '/pageTypes').success(function(pageTypeConfig) {
                $scope.selectedPageType = {};
                $scope.selectedZone = {};
                $scope.pageTypeList = pageTypeConfig._embedded.pageTypes;
            });
        }

        $scope.pageTypeSelected = function() {
            console.log($scope.selectedPageType);
            $http.get($scope.selectedPageType.pageType._links.zones.href).success(function(zoneData) {
                $scope.selectedZone = {};
                $scope.zonesList = zoneData;
            });
        }

        $scope.submitSimulation = function () {
            $http.post("/"+$scope.selectedClient.value + '/webRecSimulator', 'test' ).success(function() {
                console.log("Completed post");
            });
        }
    }
})();
