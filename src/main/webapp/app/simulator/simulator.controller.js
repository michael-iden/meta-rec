(function() {
    'use strict';

    angular
        .module('metaRecApp')
        .controller('SimulatorController', SimulatorController);

    SimulatorController.$inject = ['$scope', 'Principal', 'LoginService', '$state', '$http'];

    function SimulatorController ($scope, Principal, LoginService, $state, $http) {
        var vm = this;

        vm.account = null;
        vm.isAuthenticated = null;
        vm.login = LoginService.open;
        vm.register = register;
        $scope.$on('authenticationSuccess', function() {
            getAccount();
        });

        getAccount();

        function getAccount() {
            Principal.identity().then(function(account) {
                vm.account = account;
                vm.isAuthenticated = Principal.isAuthenticated;
            });
        }
        function register () {
            $state.go('register');
        }

        $http.get('/test').success(function (data) {
            console.log(data);
        });

    }
})();
