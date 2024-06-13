(function () {
    angular
        .module('zp.admin')
        .controller("adminRegisterLokacijeController", [
            'appService', 'adminDataService', 'Flash', 'NgTableParams', 'ngDialog', '$filter', adminController]);

    function adminController(appService, adminDataService, Flash, NgTableParams, ngDialog, $filter) {
        var vm = this;
        vm.List = null;
        vm.klijentId = appService.getKlijentId();
        vm.grupeLokacija = [];
        vm.remove = remove;
        vm.applyFilter = applyFilter;
        // vm.applyFilterNaselje = applyFilterNaselje;
        vm.applyFilterAll = applyFilterAll;
        vm.applyFilterAllNaselje = applyFilterAllNaselje;
        vm.filterAll = true;
        vm.filterAllNaselje = true;
        vm.kolicineLink = kolicineLink;
        vm.Naselja = [];
        

        vm.tableParams = new NgTableParams({
            sorting: { 'Naselje.Naziv': "asc", 'Naziv': 'asc' },
            count: appService.tableRowCount,
        }, {
            dataset: [],
            counts: [], // Disable pagination
        });

        init();

        function applyFilterAllNaselje() {
            vm.List = [];
            for (var index in vm.Naselja) {
                vm.Naselja[index].Aktivno = vm.filterAllNaselje;
            }
            applyFilter();
        }

        function kolicineLink(lokacija) {
            return appService.apiRootUrl + "admin#/admin/kolicine/" + lokacija.Id;
        }

        function applyFilter() {
            vm.List = [];
            for (var i in vm.LoadedList) {
                if (isActive(vm.LoadedList[i])) {
                    vm.List.push(vm.LoadedList[i]);
                }
            }

            var allGrupe = true;
            var allNaselja = true;

            for (var index in vm.Grupe) {
                if (!(vm.Grupe[index].Aktivno && allGrupe)) {
                    allGrupe = false;
                }
            }

            for (var index in vm.Naselja) {
                if (!(vm.Naselja[index].Aktivno && allNaselja)) {
                    allNaselja = false;
                }
            }

            vm.filterAll = allGrupe;
            vm.filterAllNaselje = allNaselja;

           //  vm.filterAll = false;
            vm.tableParams.settings({
                dataset: vm.List,
            });
        }

        function isActive(data) {
            var ret = false;
            for (var index in vm.Grupe) {
                if (data.Grupa && vm.Grupe[index].Id === data.Grupa.Id) {
                    ret = vm.Grupe[index].Aktivno;
                }
            }

            for (var index in vm.Naselja) {
                if (data.Grupa && vm.Naselja[index].Id === data.Naselje.Id && ret) {
                    ret = vm.Naselja[index].Aktivno;
                }
            }

            return ret;
        }

        function applyFilterAll() {
            vm.List = [];
            for (var index in vm.Grupe) {
                vm.Grupe[index].Aktivno = vm.filterAll;
            }
            applyFilter();
        }

        function init() {
            appService.disableChangeNotification();
            adminDataService.getLokacije(vm.klijentId).then(loadCompleted, loadFailed);
            adminDataService.getGrupaLokacije(vm.klijentId).then(loadGrupeCompleted, loadFailed);
            adminDataService.getNaselja().then(loadNaseljaCompleted, loadFailed);
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
                message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }
            Flash.create('danger', message, 'fixed-message');
        }

        function loadGrupeCompleted(data) {
            vm.Grupe = data;
            for (var index in vm.Grupe) {
                vm.Grupe[index].Aktivno = true;
            }
        }

        function loadNaseljaCompleted(data) {
            vm.Naselja = data;
            for (var index in vm.Naselja) {
                vm.Naselja[index].Aktivno = true;
            }
        }

        function remove(item) {
            ngDialog.openConfirm({
                template: appService.apiRootUrl + 'app/admin/confirmDeleteDialog.html',
                className: 'ngdialog-theme-default',
                data: angular.toJson(item)
            }).then(function (data) {
                adminDataService.removeLokacija(vm.klijentId, data).then(deleteCompleted, deleteFailed);
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