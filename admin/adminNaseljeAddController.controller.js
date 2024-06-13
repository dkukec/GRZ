(function () {
    angular
        .module('zp.admin')
        .controller("adminNaseljeAddController", [
            '$location', '$routeParams', 'appService', 'adminDataService', 'Flash', adminController]);

    function adminController($location, $routeParams, appService, adminDataService, Flash) {
        appService.enableChangeNotification();
        var vm = this;
        vm.List = null;
        vm.Id = null;
        vm.Naziv = null;
        vm.save = save;

        function save() {
            adminDataService.addNaselje({ Id: vm.Id, Naziv: vm.Naziv }).then(saveCompleted, saveFailed);
        }

        function saveCompleted() {
            appService.disableChangeNotification();
            var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("SPREMANJE_USPJESNO", vm.Naziv) + "</em>";
            Flash.create("info", message, 'fixed-message');

            $location.path('/admin/naselja');
        }

        function saveFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("INTERNA_POGRESKA_SERVERA") + "</em>";
            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR")  + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }
            Flash.create('danger', message, 'fixed-message');
            vm.List = [];
        }
    }
})();