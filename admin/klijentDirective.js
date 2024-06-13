(function () {
    angular.module('zp.admin').directive('klijent', ['apiRoot', function (apiRoot) {
        return {
            restrict: 'E',
            scope: {
                klijentData: '=',
                grupe: '='
            },
            templateUrl: apiRoot + 'app/admin/klijent.html'
        };
    }]);
})();