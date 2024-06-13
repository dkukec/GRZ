(function () {
    angular
        .module('zp.realizacija')
        .config(['$routeProvider',
        function ($routeProvider) {
            var apiRootUrl = $("#linkApiRoot").attr("href");

            $routeProvider
                .when('/realizacija/pregled/:planId', {
                    templateUrl: apiRootUrl + 'app/realizacija/realizacija.html',
                    controller: 'RealizacijaController',
                    controllerAs: 'realizacijaCtrl'
                });

            $routeProvider
                .when('/realizacija/pregled/:planId/:datum', {
                    templateUrl: apiRootUrl + 'app/realizacija/realizacija.html',
                    controller: 'RealizacijaController',
                    controllerAs: 'realizacijaCtrl'
                });

            $routeProvider
                .when('/realizacija/pregled/:planId/:datum/:filter', {
                    templateUrl: apiRootUrl + 'app/realizacija/realizacija.html',
                    controller: 'RealizacijaController',
                    controllerAs: 'realizacijaCtrl'
                });
            $routeProvider
                .when('/realizacija/pregled/:planId/:datum/:filter/:naselje/:lokacija', {
                    templateUrl: apiRootUrl + 'app/realizacija/realizacija.html',
                    controller: 'RealizacijaController',
                    controllerAs: 'realizacijaCtrl'
                });

            $routeProvider
                .when('/realizacija/odabir/:planId', {
                    templateUrl: apiRootUrl + 'app/realizacija/realizacija_odabir.html',
                    controller: 'RealizacijaOdabirController',
                    controllerAs: 'realizacijaCtrl'
                });
        }]);
})();