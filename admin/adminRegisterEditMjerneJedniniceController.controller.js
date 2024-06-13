(function () {
    angular
        .module('zp.admin')
        .controller("adminRegisterEditMjerneJedniniceController", [
            '$location', '$routeParams', 'appService', 'adminDataService', 'Flash', adminController]);

    function adminController($location, $routeParams, appService, adminDataService, Flash) {
        appService.enableChangeNotification();
        var vm = this;
        vm.List = null;
        vm.klijentId = appService.getKlijentId();
        vm.id = $routeParams.id;
        vm.naziv = null;
        vm.oznaka = null;
        vm.tipovi = null;
        vm.vrste = null;
        vm.save = save;

        init();

        function init() {
            adminDataService.getMjernaJedninica(vm.klijentId, vm.id).then(loadCompleted, loadFailed);
            adminDataService.getTipovi(vm.klijentId).then(loadTipoviCompleted, loadFailed);
            adminDataService.getVrste(vm.klijentId).then(loadVrsteCompleted, loadFailed);
        }

        function loadTipoviCompleted(data) {
            vm.tipovi = data;
        }

        function loadVrsteCompleted(data) {
            vm.vrste = data;
        }

        function loadCompleted(data) {
            vm.id = data.Id;
            vm.naziv = data.Naziv;
            vm.oznaka = data.Oznaka;
        }

        function loadFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("INTERNA_POGRESKA_SERVERA") + "</em>";
            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR")  + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }
            Flash.create('danger', message, 'fixed-message');
        }

        function save() {
            adminDataService.updateMjernaJedninica(vm.klijentId, { Id: vm.id, Naziv: vm.naziv, Oznaka: vm.oznaka }).then(saveCompleted, saveFailed);
        }

        function saveCompleted() {
            appService.disableChangeNotification();
            $location.path('/admin/registers/mjerne_jedinice');
            var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("SPREMANJE_USPJESNO", vm.naziv) + "</em>";
            Flash.create('info', message, 'fixed-message');
        }

        function saveFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("ERROR_DODAJ_PODATAK") + "</em>";
            Flash.create('danger', message, 'fixed-message');
            vm.List = [];
        }
    }
})();