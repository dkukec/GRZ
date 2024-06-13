(function () {
    angular
        .module('zp.admin')
        .controller('adminKreirajKorisnikaController', ['appService', 'adminDataService', 'Flash', adminKreirajKorisnikaController]);

    function adminKreirajKorisnikaController(appService, adminDataService, Flash) {
        appService.enableChangeNotification();
        var vm = this;
        vm.kreirajKorisnika = kreirajKorisnika;
        vm.eMail = "";
        vm.klijentId = null;
        vm.klijenti = [];

        init();

        function init() {
            adminDataService.getKlijenti().then(getKlijentiCompleted, getKlijentiFailed);
        };

        function kreirajKorisnika() {
            adminDataService.kreirajKorisnika(vm.eMail, vm.klijentId).then(kreirajKorisnikaCompleted, kreirajKorisnikaFailed);
        }

        function kreirajKorisnikaCompleted(response) {
            var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("SPREMANJE_USPJESNO") + "</em>";
            Flash.create('info', message, 'fixed-message');
        }

        function kreirajKorisnikaFailed(error) {
            if (error.status == 401) window.location.reload();

            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("INTERNA_POGRESKA_SERVERA") + "</em>";

            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }

            Flash.create('danger', message, 'fixed-message');
        }

        function getKlijentiCompleted(response) {
            vm.klijenti = response;
        }

        function getKlijentiFailed(error) {
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("INTERNA_POGRESKA_SERVERA") + "</em>";

            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }

            Flash.create('danger', message, 'fixed-message');
        }
    }
})();