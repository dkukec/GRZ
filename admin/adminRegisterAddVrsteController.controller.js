(function () {
    angular
        .module('zp.admin')
        .controller("adminRegisterAddVrsteController", [
            '$location', '$routeParams', 'appService', 'adminDataService', 'Flash', 'NgTableParams', '$filter', adminController]);

    function adminController($location, $routeParams, appService, adminDataService, Flash, NgTableParams, $filter) {
        appService.enableChangeNotification();
        var vm = this;
        vm.List = null;
        vm.klijentId = appService.getKlijentId();
        vm.naziv = null;
        vm.tipId = null;
        vm.mjernaJedinicaId = null;
        vm.save = save;

        init();

        function init() {
            adminDataService.getMjerneJedninice(vm.klijentId).then(loadMJCompleted, loadFailed);
            adminDataService.getTipovi(vm.klijentId).then(loadTCompleted, loadFailed);
        }

        function loadMJCompleted(data) {
            vm.mjerneJedinice = data;
        }

        function loadTCompleted(data) {
            vm.tipovi = data;
        }

        function loadFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("INTERNA_POGRESKA_SERVERA") + "</em>";
            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }
            Flash.create('danger', message, 'fixed-message');
        }

        function save() {
            adminDataService.addVrsta(vm.klijentId, { Naziv: vm.naziv, TipId: vm.tipId, MjernaJedinicaId: vm.mjernaJedinicaId }).then(saveCompleted, saveFailed);
        }

        function saveCompleted() {
            appService.disableChangeNotification();
            $location.path('/admin/registers/vrste');
            var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("SPREMANJE_USPJESNO", vm.naziv) + "</em>";
            Flash.create('info', message, 'fixed-message');
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
    }
})();