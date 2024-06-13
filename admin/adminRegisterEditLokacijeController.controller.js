(function () {
    angular
        .module('zp.admin')
        .controller("adminRegisterEditLokacijeController", [
            '$location', '$routeParams', 'appService', 'adminDataService', 'Flash', adminController]);

    function adminController($location, $routeParams, appService, adminDataService, Flash) {
        appService.enableChangeNotification();
        var vm = this;
        vm.klijentId = appService.getKlijentId();
        vm.id = $routeParams.id;
        vm.grupeLokacija = [];
        vm.naziv = null;
        vm.save = save;
        vm.Grupa = {};

        init();

        function init() {
            adminDataService.getLokacija(vm.klijentId, vm.id).then(loadCompleted, loadFailed);
            adminDataService.getGrupaLokacije(vm.klijentId).then(loadGrupeCompleted, loadGrupeFailed);
        }

        function loadCompleted(data) {
            vm.id = data.Id;
            vm.naziv = data.Naziv;
            data.Grupa = data.Grupa || {};
            vm.Grupa.Id = data.Grupa.Id + "";
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
            adminDataService.updateLokacija(vm.klijentId, { Id: vm.id, Naziv: vm.naziv, GrupaLokacijaId: vm.Grupa.Id }).then(saveCompleted, saveFailed);
        }

        function saveCompleted() {
            appService.disableChangeNotification();
            $location.path('/admin/registers/lokacije');
            var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("SPREMANJE_USPJESNO", vm.naziv) + "</em>";
            Flash.create('info', message, 'fixed-message');
        }

        function saveFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("ERROR_DODAJ_PODATAK") + "</em>";
            Flash.create('danger', message, 'fixed-message');
            vm.List = [];
        }

        function loadGrupeCompleted(data) {
            vm.grupeLokacija = data;
        }

        function loadGrupeFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("INTERNA_POGRESKA_SERVERA") + "</em>";
            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }
            Flash.create('danger', message, 'fixed-message');
        }
    }
})();