(function () {
    angular
        .module('zp.dashboard')
        .config(['$routeProvider',
        function ($routeProvider) {
            var apiRootUrl = $("#linkApiRoot").attr("href");

            $routeProvider
                .when('/', {
                    templateUrl: apiRootUrl + 'app/dashboard/dashboard.html',
                    controller: 'DashboardController',
                    controllerAs: 'dashboardCtrl'
                })
                .when('/dashboard', {
                    templateUrl: apiRootUrl + 'app/dashboard/dashboard.html',
                    controller: 'DashboardController',
                    controllerAs: 'dashboardCtrl'
                });
        }]);
})();