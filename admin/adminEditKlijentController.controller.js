(function () {
    angular
        .module('zp.admin')
        .controller("adminEditKlijentController", [
            '$location', '$routeParams', 'appService', 'adminDataService', 'Flash', adminController]);

    function adminController($location, $routeParams, appService, adminDataService, Flash) {
        appService.enableChangeNotification();
        var vm = this;
        vm.klijentId = appService.getKlijentId();
        vm.id = $routeParams.id;
        vm.naziv = null;
        vm.info = null;
        vm.save = save;
        vm.grupe = [];

        init();

        function init() {
            adminDataService.getKlijent(vm.id).then(loadCompleted, loadFailed);
            adminDataService.getGrupeKlijenata().then(getGrupeKlijenataCompleted, getGrupeKlijenataFailed);
        }

        function loadCompleted(data) {
            vm.id = data.Id;
            vm.naziv = data.Naziv;
            vm.info = data.Info;
            vm.grupa = { Id: data.GrupaId };
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
            var grupaId = vm.grupa ? vm.grupa.Id : null;
            adminDataService.updateKlijent({ Id: vm.id, Naziv: vm.naziv, Info: vm.info, GrupaId: grupaId }).then(saveCompleted, saveFailed);
        }

        function saveCompleted() {
            appService.disableChangeNotification();
            $location.path('/admin/klijenti');
            var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("SPREMANJE_USPJESNO", vm.naziv) + "</em>";
            Flash.create('info', message, 'fixed-message');
        }

        function saveFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("ERROR_DODAJ_PODATAK") + "</em>";
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