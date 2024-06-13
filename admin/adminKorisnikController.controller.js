(function () {
    angular
        .module('zp.admin')
        .controller('adminKorisnikController', ['appService', 'adminDataService', 'Flash', '$routeParams', adminKorisnikController]);

    function adminKorisnikController(appService,adminDataService,Flash,$routeParams) {
        var vm = this;
        vm.naziv = "";
        vm.klijent = "";
        vm.samoIzvjestaji = false;
        vm.save = save;
        adminDataService.getKorisnik($routeParams.id).then(getKorisnikCompleted, getKorisnikFailed);

        function getKorisnikCompleted(data) {
            vm.naziv = data.Naziv;
            vm.klijent = data.KlijentNaziv;
            vm.samoIzvjestaji = data.SamoIzvjestaji;
        }

        function getKorisnikFailed() {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("INTERNA_POGRESKA_SERVERA") + "</em>";
            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }
            Flash.create('danger', message, 'fixed-message');
        }

        function save() {
            adminDataService.updateKorisnik($routeParams.id, vm.samoIzvjestaji).then(saveCompleted, saveFailed);
        }

        function saveCompleted(data) {
            var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("SPREMANJE_USPJESNO") + "</em>";
            Flash.create('info', message, 'fixed-message');
        }

        function saveFailed(error) {
            if (error.status == 401) window.location.reload();

            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("ERROR_DODAJ_PODATAK") + "</em>";

            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }

            Flash.create('danger', message, 'fixed-message');            
        }
    }
})();