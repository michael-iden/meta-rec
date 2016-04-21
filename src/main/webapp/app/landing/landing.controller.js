(function() {
    'use strict';

    angular
        .module('metaRecApp')
        .controller('LandingController', LandingController);

    LandingController.$inject = ['$scope', '$state'];

    function LandingController ($scope, $state) {
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
