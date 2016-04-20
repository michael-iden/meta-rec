(function() {
    'use strict';

    angular
        .module('metaRecApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('simulator', {
            parent: 'app',
            url: '/simulator',
            data: {
                authorities: []
            },
            views: {
                'simulator-content@': {
                    templateUrl: 'app/simulator/simulator.html',
                    controller: 'SimulatorController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
