(function() {
    'use strict';

    angular
        .module('metaRecApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('landing', {
            parent: 'app',
            url: '/',
            data: {
                authorities: []
            },
            views: {
                'landing-content@': {
                    templateUrl: 'app/landing/landing.html',
                    controller: 'LandingController'
                }
            }
        });
    }
})();
