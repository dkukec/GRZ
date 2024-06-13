(function () {
    angular.module('zp')
        .config(['$provide', function ($provide) {
            $provide.value("apiRoot", $("#linkApiRoot").attr("href"));
        }]);
})();