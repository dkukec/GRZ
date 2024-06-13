(function () {
    angular
        .module('zp.admin')
        .controller("adminProblemController", [
            'appService', 'adminDataService', 'Flash', 'NgTableParams', 'ngDialog', '$routeParams', '$filter', adminController]);

    function adminController(appService, adminDataService, Flash, NgTableParams, ngDialog, $routeParams, $filter) {
        var vm = this;
        vm.Data = null;
        vm.klijentId = appService.getKlijentId();
        vm.id = $routeParams.id;

        init();

        function init() {
            adminDataService.getProblem(vm.id).then(loadCompleted, loadFailed);
        }

        function loadCompleted(data) {
            vm.Data = data;
        }

        function loadFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("INTERNA_POGRESKA_SERVERA") + "</em>";
            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }
            Flash.create('danger', message, 'fixed-message');
        }
    }
})();