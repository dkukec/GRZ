(function () {
    angular
        .module('zp.admin')
        .controller("adminCjeniciController", [
            '$location', '$routeParams', 'appService', 'adminDataService', 'Flash', 'NgTableParams', 'apiRoot', adminController]);

    function adminController($location, $routeParams, appService, adminDataService, Flash, NgTableParams, apiRoot) {
        var vm = this;
        vm.klijentId = appService.getKlijentId();
        vm.cjenici = null;
        vm.apiRoot = apiRoot;
        
        init();

        vm.cols = [{
            field: "Id",
            title: "Id",
            show: true,
        }, {
            field: "VrijediOd",
            title: "Vrijedi od",
            show: true,
        }, {
            field: "VrijediDo",
            title: "Vrijedi do",
            show: true,
        }, {
            field: "Admin",
            title: " ",
            show: true,
        }];

        vm.tableParams = new NgTableParams({

        }, {
            dataset: [], // vm.getAktivnosti(),
            counts: [], // Disable pagination
        });

        function init() {
            adminDataService.getCjenici(vm.klijentId).then(loadCompleted, loadFailed);
        }

        function loadCompleted(data) {
            vm.cjenici = data;
            vm.tableParams.settings({
                dataset: vm.cjenici,
            });
        }

        function loadFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("INTERNA_POGRESKA_SERVERA") + "</em>";
            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }
            Flash.create('danger', message, 'fixed-message');
            vm.cjenici = [];
        }


    }
})();