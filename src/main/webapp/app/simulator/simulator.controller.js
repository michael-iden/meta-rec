(function() {
    'use strict';

    angular
        .module('metaRecApp')
        .controller('SimulatorController', SimulatorController);

    SimulatorController.$inject = ['$scope', '$state', '$http'];

    function SimulatorController ($scope, $state, $http) {

        $scope.clients = [
            'JOANN',
            'WESTMARINE',
            'SKECHERS',
            'JOURNEYS',
            'TEST'
        ];

        $scope.selectedClient = { value: $scope.clients[0] };
    }
})();
