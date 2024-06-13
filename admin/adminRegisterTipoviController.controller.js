(function () {
    angular
        .module('zp.admin')
        .controller("adminRegisterTipoviController", [
            'appService', 'adminDataService', 'Flash', 'NgTableParams', 'ngDialog', '$filter', adminController]);

    function adminController(appService, adminDataService, Flash, NgTableParams, ngDialog, $filter) {
        var vm = this;
        vm.List = null;
        vm.klijentId = appService.getKlijentId();
        vm.remove = remove;

        vm.tableParams = new NgTableParams({
            sorting: { Naziv: "asc" },
            count: appService.tableRowCount,
        }, {
            dataset: [],
            counts: [], // Disable pagination
        });

        init();

        function init() {
            adminDataService.getTipovi(vm.klijentId).then(loadCompleted, loadFailed);
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
                message = "<strong>" + appService.getResource("ERROR")  + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }
            Flash.create('danger', message, 'fixed-message');
        }

        function remove(item) {
            ngDialog.openConfirm({
                template: appService.apiRootUrl +  'app/admin/confirmDeleteDialog.html',
                className: 'ngdialog-theme-default',
                data: angular.toJson(item)
            }).then(function (data) {
                adminDataService.removeTip(vm.klijentId, data).then(deleteCompleted, deleteFailed);
            });

            function deleteCompleted() {
                var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("PODATAK_OBRISAN") + "</em>";
                Flash.create('info', message, 'fixed-message');
                init();
            }

            function deleteFailed() {
                if (error.status == 401) window.location.reload();
                var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("BRISANJE_POGRESKA") + "</em>";
                Flash.create('danger', message, 'fixed-message');
            }
        }
    }
})();