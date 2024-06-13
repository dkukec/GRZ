(function () {
    angular
    .module('zp.reports')
    .controller("ReportsRootController", ['appService', reportsRootController]);

    function reportsRootController(appService) {
        var vm = this;
        vm.korisnik = null;
        appService.getKorisnik().then(loadKorisnikCompleted, loadKorisnikFailed);

        function loadKorisnikCompleted(response) {
            vm.korisnik = response.data;
        }

        function loadKorisnikFailed(response) {

        }
    }
})();