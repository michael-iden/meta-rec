(function() {
    'use strict';

    angular
        .module('metaRecApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('simuationstats', {
            parent: 'app',
            url: '/simulationstats',
            data: {
                authorities: []
            },
            views: {
                'simuation-stats-content@': {
                    templateUrl: 'app/simulationstats/simulationstats.html',
                    controller: 'SimuationStatsController'
                }
            }
        });
    }
})();
