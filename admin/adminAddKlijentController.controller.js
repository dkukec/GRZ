(function () {
    angular
        .module('zp.admin')
        .controller("adminAddKlijentController", [
            '$location', '$routeParams', 'appService', 'adminDataService', 'Flash', adminController]);

    function adminController($location, $routeParams, appService, adminDataService, Flash) {
        appService.enableChangeNotification();
        var vm = this;
        vm.save = save;

        vm.klijent = {
            naziv: '',
            info: '',
            grupa: null
        };

        vm.grupe = [];

        adminDataService.getGrupeKlijenata().then(getGrupeKlijenataCompleted, getGrupeKlijenataFailed);

        function save() {
            var grupaId = vm.klijent.grupa ? vm.klijent.grupa.Id : null;

            adminDataService.addKlijent(vm.klijentId, { naziv: vm.klijent.naziv, info: vm.klijent.info, grupaId: grupaId }).then(saveCompleted, saveFailed);
        }

        function saveCompleted() {
            var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("SPREMANJE_USPJESNO", vm.naziv) + "</em>";
            Flash.create('info', message, 'fixed-message');
            appService.disableChangeNotification();
            $location.path('/admin/klijenti');
        }

        function saveFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("ERROR_DODAJ_PODATAK") + "</em>";
            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }
            Flash.create('danger', message, 'fixed-message');
            vm.List = [];
        }

        function getGrupeKlijenataCompleted(data) {
            vm.grupe = data;
        }

        function getGrupeKlijenataFailed() {

        }
    }
})();