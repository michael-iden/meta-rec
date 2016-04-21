(function() {
    'use strict';

    angular
        .module('metaRecApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('simulationstats', {
            parent: 'app',
            url: '/simulationstats',
            data: {
                authorities: []
            },
            views: {
                'simulation-stats-content@': {
                    templateUrl: 'app/simulationstats/simulationstats.html',
                    controller: 'SimulationStatsController'
                }
            }
        });
    }
})();
