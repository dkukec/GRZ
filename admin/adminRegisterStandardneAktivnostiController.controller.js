(function () {
    angular
        .module('zp.admin')
        .controller("adminRegisterStandardneAktivnostiController", [
            'appService', 'adminDataService', 'Flash', 'NgTableParams', 'ngDialog', '$filter', adminController]);

    function adminController(appService, adminDataService, Flash, NgTableParams, ngDialog, $filter) {
        var vm = this;
        vm.List = null;
        vm.LoadedList = null;
        vm.Tipovi = null;
        vm.klijentId = appService.getKlijentId();
        vm.remove = remove;
        vm.applyFilter = applyFilter;
        vm.applyFilterAll = applyFilterAll;
        vm.filterAll = true;

        vm.tableParams = new NgTableParams({
            sorting: { Naziv: "asc" },
            count: appService.tableRowCount,
        }, {
            dataset: [],
            counts: [], // Disable pagination
        });

        init();

        function init() {
            adminDataService.getStandardneAktivnosti(vm.klijentId).then(loadCompleted, loadFailed);
            adminDataService.getTipovi(vm.klijentId).then(loadTipoviCompleted, loadFailed);
        }

        function loadTipoviCompleted(data) {
            vm.Tipovi = data;
            for (var i in vm.Tipovi) {
                vm.Tipovi[i].Aktivno = true;
            }
        }

        function loadCompleted(data) {
            vm.List = data;
            vm.LoadedList = data;
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
                template: appService.apiRootUrl + 'app/admin/confirmDeleteDialog.html',
                className: 'ngdialog-theme-default',
                data: angular.toJson(item)
            }).then(function (data) {
                adminDataService.removeStandardnaAktivnost(vm.klijentId, data).then(deleteCompleted, deleteFailed);
            });

            function deleteCompleted() {
                var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("PODATAK_OBRISAN") + "</em>";
                Flash.create('info', message, 'fixed-message');
                init();
            }

            function deleteFailed() {
                if (error.status == 401) window.location.reload();
                var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("BRISANJE_POGRESKA") + "</em>";

                
                var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("BRISANJE_POGRESKA") + "</em>";
                Flash.create('danger', message, 'fixed-message');
            }
        }

        function isSelected(ciljId) {
            for (var i in vm.Tipovi) {
                if (vm.Tipovi[i].Id == ciljId && vm.Tipovi[i].Aktivno) {
                    return true;
                }
            }
            return false;
        }

        function setSelected(ciljId, val) {
            for (var i in vm.Tipovi) {
                if (vm.Tipovi[i].Id == ciljId) { // && vm.Tipovi[i].Aktivno) {
                    vm.Tipovi[i].Aktivno = val;
                    // return true;
                }
            }
            return false;
        }

        function isActiveTip(cilj) {
            for (var i in cilj) {
                if(isSelected(cilj[i].tipId)){
                    return true;
                }
            }
            return false;
        }

        function applyFilterAll() {
            vm.List = [];
            for (var i in vm.Tipovi) {
                vm.Tipovi[i].Aktivno = vm.filterAll;
            }

            if (vm.filterAll) {
                for (var i in vm.LoadedList) {
                    vm.List.push(vm.LoadedList[i]);
                }
            }
            vm.tableParams.settings({
                dataset: vm.List
            });
        }

        function applyFilter() {
            vm.List = [];
            var all = true;
            for (var i in vm.LoadedList) {
                if(isActiveTip(vm.LoadedList[i].CiljeviAktivnosti)){
                    vm.List.push(vm.LoadedList[i]);
                }
                else {
                    all = false;
                }
            }

            if (all) {
                vm.filterAll = true;
                applyFilterAll();
            }
            else {
                vm.filterAll = false;
                vm.tableParams.settings({
                    dataset: vm.List,
                });
            }
        }
    }
})();