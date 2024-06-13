(function () {
    angular
        .module('zp.plan')
        .config(['$routeProvider',
        function ($routeProvider) {
            var apiRootUrl = $("#linkApiRoot").attr("href");
            //apiRootUrl = apiRoot;
            $routeProvider
                .when('/list', {
                    templateUrl: apiRootUrl + 'app/plan/list.html',
                    controller: 'ListPlanaController',
                    controllerAs: 'listCtrl'
                })
                .when('/list/year/:year', {
                    templateUrl: apiRootUrl + 'app/plan/list.html',
                    controller: 'ListPlanaController',
                    controllerAs: 'listCtrl'
                })
                .when('/unos', {
                    templateUrl: apiRootUrl + 'app/plan/unos.html',
                    controller: 'UnosPlanaController',
                    controllerAs: 'unosCtrl'
                })
                .when('/unos/:planId', {
                    templateUrl: apiRootUrl + 'app/plan/unos.html',
                    controller: 'UnosPlanaController',
                    controllerAs: 'unosCtrl'
                })
                .when('/unos/:planId/:godina/:cjenikId', {
                    templateUrl: apiRootUrl + 'app/plan/unos.html',
                    controller: 'UnosPlanaController',
                    controllerAs: 'unosCtrl'
                });
        }]);
})();