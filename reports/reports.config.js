(function () {
    angular
        .module('zp.reports')
        .config(['$routeProvider',
        function ($routeProvider) {
            var apiRootUrl = $("#linkApiRoot").attr("href");

            $routeProvider
            .when('/', {
                templateUrl: apiRootUrl + 'app/reports/index.html',
                controller: 'ReportsRootController',
                controllerAs: 'rootCtrl'
            })
            .when('/report', {
                templateUrl: apiRootUrl + 'app/reports/report.html',
                controller: 'ReportsController',
                controllerAs: 'reportCtrl'
            })
            .when('/report/:name', {
                templateUrl: apiRootUrl + 'app/reports/report.html',
                controller: 'ReportsController',
                controllerAs: 'reportCtrl'
            })

            .when('/reportTroskovnik', {
                templateUrl: apiRootUrl + 'app/reports/troskovnikIRacunReport.html',
                controller: 'TroskovnikIRacunController',
                controllerAs: 'troskovnikIRacunCtrl'
            })
            .when('/reportPlana', {
                templateUrl: apiRootUrl + 'app/reports/usporedbaPlanaReport.html',
                controller: 'UsporedbaPlanaController',
                controllerAs: 'usporedbaPlanaCtrl'
            })
            .when('/usporedba/:lokacijaId/:godina', {
                templateUrl: apiRootUrl + 'app/reports/usporedba.html',
                controller: 'UsporedbaController',
                controllerAs: 'usporedbaPlanaCtrl'
            })
            .when('/rekapitulacija/:lokacijaId/:periodOd/:periodDo', {
                templateUrl: apiRootUrl + 'app/reports/rekapitulacija.html',
                controller: 'RekapitulacijaController',
                controllerAs: 'rekapitulacijaCtrl'
            });
        }]);
})();