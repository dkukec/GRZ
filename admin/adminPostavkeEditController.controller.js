(function () {
    angular
        .module('zp.admin')
        .controller("adminPostavkeEditController", [
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
            adminDataService.getPostavka(vm.id).then(loadCompleted, loadFailed);
        }

        function loadCompleted(data) {
            vm.Id = data.Id;
            vm.Naziv = data.Naziv;
            vm.Vrijednost = data.Vrijednost;
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
            adminDataService.updatePostavka({ Id: vm.Id, Naziv: vm.Naziv, Vrijednost: vm.Vrijednost }).then(saveCompleted, saveFailed);
        }

        function saveCompleted() {
            var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("SPREMANJE_USPJESNO", vm.Naziv) + "</em>";
            Flash.create('info', message, 'fixed-message');
            appService.disableChangeNotification();
            $location.path('/admin/postavke');
        }

        function saveFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("ERROR_DODAJ_PODATAK") + "</em>";
            Flash.create('danger', message, 'fixed-message');
            vm.List = [];
        }
    }
})();