(function () {
    angular
        .module('zp.admin')
        .controller("adminRegisterAddMjerneJedniniceController", [
            '$location', '$routeParams', 'appService', 'adminDataService', 'Flash', adminController]);

    function adminController($location, $routeParams, appService, adminDataService, Flash) {
        appService.enableChangeNotification();
        var vm = this;
        vm.List = null;
        vm.klijentId = appService.getKlijentId();
        vm.id = null;
        vm.oznaka = null;
        vm.naziv = null;
        vm.save = save;

        function save() {
            adminDataService.addMjernaJedninica(vm.klijentId, { Id: vm.id, Naziv: vm.naziv, Oznaka: vm.oznaka }).then(saveCompleted, saveFailed);
        }

        function saveCompleted() {
            appService.disableChangeNotification();
            $location.path('/admin/registers/mjerne_jedinice');
            var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("SPREMANJE_USPJESNO", vm.naziv) + "</em>";
            Flash.create('info', message, 'fixed-message');
        }

        function saveFailed(error) {
            appService.disableChangeNotification();
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