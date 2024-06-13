(function () {
    angular
		.module('zp.plan')
		.directive('specifikacijaTip', ['apiRoot', specifikacijaTip]);

    function specifikacijaTip(apiRoot) {
        return {
            restrict: 'E',
            scope: {
                tip: '='
            },
            templateUrl: apiRoot + 'app/plan/specifikacija-tip.html'
        };
    }
})();