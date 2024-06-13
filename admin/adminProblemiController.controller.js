(function () {
    angular
        .module('zp.admin')
        .controller("adminProblemiController", [
            'appService', 'adminDataService', 'Flash', 'NgTableParams', 'ngDialog', '$filter', adminController]);

    function adminController(appService, adminDataService, Flash, NgTableParams, ngDialog, $filter) {
        var vm = this;
        vm.List = null;
        vm.apiRootUrl = appService.apiRootUrl;
        vm.klijentId = appService.getKlijentId();

        vm.tableParams = new NgTableParams({
            sorting: { Id: "desc" },
            count: appService.tableRowCount,
        }, {
            dataset: [],
            counts: [], // Disable pagination
        });

        init();

        function init() {
            adminDataService.getProblemi().then(loadCompleted, loadFailed);
        }

        function loadCompleted(data) {
            vm.List = data;
            vm.tableParams.settings({
                dataset: vm.List,
            });
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