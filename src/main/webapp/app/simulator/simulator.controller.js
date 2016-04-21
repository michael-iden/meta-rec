(function() {
    'use strict';

    angular
        .module('metaRecApp')
        .controller('SimulatorController', SimulatorController);

    SimulatorController.$inject = ['$scope', '$state', '$http'];

    function SimulatorController ($scope, $state, $http) {

        $scope.clientSelectPlaceholder = "Loading Please Wait";
        $scope.clients = [];

        $scope.pageTypeList = {};
        $scope.zonesList = {};

        $scope.pips = "";

        $scope.simulationParams =  {
            "clientIdentifier": "",
            "pageType": "",
            "zoneId": "",
            "productId": "",
            "productsInPage": [],
            "consumerId": "",
            "brandName": "",
            "numberOfQueries": ""
        };

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

            $http.get('/' + $scope.simulationParams.clientIdentifier + '/pageTypes').success(function(pageTypeConfig) {
                $scope.simulationParams.pageType = "";
                $scope.simulationParams.zoneId = "";
                $scope.pageTypeList = pageTypeConfig._embedded.pageTypes;
            });
        };

        $scope.pageTypeSelected = function(pageTypeEntry) {

            $http.get(pageTypeEntry._links.zones.href).success(function(zoneData) {
                $scope.simulationParams.zoneId = "";
                $scope.zonesList = zoneData;
            });
        };

        $scope.submitSimulation = function () {

            $http.post('/' + $scope.simulationParams.clientIdentifier + '/webRecSimulator', $scope.simulationParams).success(function() {
                console.log("Completed post");
            });
        };

        $scope.pipsToArray = function() {
            console.log($scope.pips);
            console.log($scope.pips.split(','));
            $scope.simulationParams.productsInPage = $scope.pips.split(',');
        };
    }
})();
