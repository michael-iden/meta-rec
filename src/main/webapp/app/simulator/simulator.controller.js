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

            $http.post('/' + $scope.simulationParams.clientIdentifier + '/webRecSimulations', $scope.simulationParams).success(function() {
                console.log("Completed post");
                location.href = '#/simulationstats';
            }).error(function () {
                console.log("Post failed");
            });
        };

        $scope.pipsToArray = function() {
            console.log($scope.pips);
            console.log($scope.pips.split(','));
            $scope.simulationParams.productsInPage = $scope.pips.split(',');
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

        $scope.barResponsiveOptions = [
            ['screen and (min-width: 641px) and (max-width: 1024px)', {
                seriesBarDistance: 10,
                axisX: {
                    labelInterpolationFnc: function(value) {
                        return value;
                    }
                }
            }],
            ['screen and (max-width: 640px)', {
                seriesBarDistance: 5,
                axisX: {
                    labelInterpolationFnc: function(value) {
                        return value[0];
                    }
                }
            }]
        ];


        // // Use $interval to update bar chart data
        // var barUpdatePromise = $interval(function() {
        //     var time = new Date();
        //
        //     pushLimit(this.barData.labels, [
        //         time.getHours(),
        //         time.getMinutes(),
        //         time.getSeconds()
        //     ].join(':'), 12);
        //
        //     this.barData.series.forEach(function(series) {
        //         pushLimit(series, getRandomInt(0, 10), 12);
        //     });
        // }.bind(this), 1000);
        //
        // // Cancel interval once scope is destroyed
        // $scope.$on('$destroy', function() {
        //     $interval.cancel(barUpdatePromise);
        // });

    }
})();
