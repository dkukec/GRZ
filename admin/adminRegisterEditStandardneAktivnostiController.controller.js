(function () {
    angular
        .module('zp.admin')
        .controller("adminRegisterEditStandardneAktivnostiController", [
            '$location', '$routeParams', 'appService', 'adminDataService', 'Flash', adminController]);

    function adminController($location, $routeParams, appService, adminDataService, Flash) {
        var vm = this;
        vm.List = null;
        vm.klijentId = appService.getKlijentId();
        vm.id = $routeParams.id;
        vm.mjerneJedinice = null;
        vm.mjernaJedinicaId = null;
        vm.save = save;
        vm.arhiviraj = arhiviraj;

        vm.ciljeviAktivnosti = [];
        vm.getVrste = getVrste;
        vm.dodaj = dodaj;
        vm.ukloni = ukloni;
        vm.getDisabledAktivnost = getDisabledAktivnost;
        vm.getDisabledTip = getDisabledTip;
        vm.changeTip = changeTip;
        vm.getDisabledAdd = getDisabledAdd;
        vm.getDisabledDelete = getDisabledDelete;

        init();

        function init() {
            adminDataService.getStandardnaAktivnost(vm.klijentId, vm.id).then(loadCompleted, loadFailed);
            adminDataService.getMjerneJedninice(vm.klijentId).then(loadMJCompleted, loadFailed);
            adminDataService.getTipovi(vm.klijentId).then(loadTipoviCompleted, loadFailed);
            adminDataService.getVrste(vm.klijentId).then(loadVrsteCompleted, loadFailed);
            appService.disableChangeNotification();
        }

        function loadCompleted(data) {
            vm.id = data.Id;
            vm.naziv = data.Naziv;
            vm.mjernaJedinicaId = data.MjernaJedinica.Id + "";
            vm.ciljeviAktivnosti = data.CiljeviAktivnosti;
            vm.grupaAktivnosti = data.GrupaAktivnosti;
            vm.arhivirana = data.Arhivirana;

            for (var i in vm.ciljeviAktivnosti) {
                vm.ciljeviAktivnosti[i].tipId = vm.ciljeviAktivnosti[i].tipId + "";
                if (vm.ciljeviAktivnosti[i].vrstaId) {
                    vm.ciljeviAktivnosti[i].vrstaId = vm.ciljeviAktivnosti[i].vrstaId + "";
                }
            }
        }

        function loadMJCompleted(data) {
            vm.mjerneJedinice = data;
        }

        function loadTipoviCompleted(data) {
            vm.tipovi = data;
        }

        function loadVrsteCompleted(data) {
            vm.vrste = data;
        }

        function loadFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("INTERNA_POGRESKA_SERVERA") + "</em>";
            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR")  + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }
            Flash.create('danger', message, 'fixed-message');
        }

        function save() {
            adminDataService.updateStandardnaAktivnost(vm.klijentId, {
                Id: vm.id,
                Naziv: vm.naziv,
                MjernaJedinica: { Id: vm.mjernaJedinicaId },
                CiljeviAktivnosti: vm.ciljeviAktivnosti,
                GrupaAktivnosti: vm.grupaAktivnosti
            }).then(saveCompleted, saveFailed);
        }


        function saveCompleted() {
            appService.disableChangeNotification();
            $location.path('/admin/registers/standardne_aktivnosti');
            var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("SPREMANJE_USPJESNO", vm.naziv) + "</em>";
            Flash.create('info', message, 'fixed-message');
        }

        function saveFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("ERROR_DODAJ_PODATAK") + "</em>";
            Flash.create('danger', message, 'fixed-message');
            vm.List = [];
        }

        function dodaj() {
            vm.ciljeviAktivnosti.push({ tipId: null, vrstaId: null, status: 1 });
        }

        function getVrste(ciljAktivnosti) {
            var vrste = [];
            for (var i in vm.vrste) {
                if (vm.vrste[i].Tip.Id == ciljAktivnosti.tipId) {
                    vrste.push(vm.vrste[i]);
                }
            }
            return vrste;
        }
        function ukloni(object) {
            var index = vm.ciljeviAktivnosti.indexOf(object);
            vm.ciljeviAktivnosti[index].status = 3;
           // vm.ciljeviAktivnosti.splice(index, 1);
        }

        function isAllDisabled(ciljAktivnosti) {
            var listVrste = getVrste(ciljAktivnosti);
            var result = false;
            for (var i = 0; i < listVrste.length; i++) {
                result = getDisabledAktivnost(ciljAktivnosti, listVrste[i]);
                if (result == false) return false;
            }
            return result;
        }

        function getDisabledAktivnost(item, option) {
            if (option == '') {
                for (index in vm.ciljeviAktivnosti) {
                    if (vm.ciljeviAktivnosti[index].tipId == item.tipId && vm.ciljeviAktivnosti[index] !== item) {
                        return true;
                    }
                }
            }

            for (index in vm.ciljeviAktivnosti) {
                var ciljKey = vm.ciljeviAktivnosti[index].tipId + "_" + vm.ciljeviAktivnosti[index].vrstaId;
                if (option.Id === undefined) option.Id = null;
                var itemKey = item.tipId + "_" + option.Id;
                if (ciljKey == itemKey && vm.ciljeviAktivnosti[index] !== item) {
                    return true;
                }
            }

            return false;
        }

        function getDisabledTip(item, option) {
            for (index in vm.ciljeviAktivnosti) {
                if (vm.ciljeviAktivnosti[index].tipId == option.Id
                    && vm.ciljeviAktivnosti[index].vrstaId == ''
                    && vm.ciljeviAktivnosti[index] !== item) {
                    return true;
                }
            }

            var allDisabled = isAllDisabled({ tipId: option.Id, vrstaId: null });
            return allDisabled;
        }

        function changeTip(ciljAktivnosti) {
            ciljAktivnosti.vrstaId = findFirstNonDisabledVrsta(ciljAktivnosti);
        }

        function findFirstNonDisabledVrsta(ciljAktivnosti) {
            var result = getDisabledAktivnost(ciljAktivnosti, '');
            if (result == false) return '';

            var listVrste = getVrste(ciljAktivnosti);
            for (var i = 0; i < listVrste.length; i++) {
                result = getDisabledAktivnost(ciljAktivnosti, listVrste[i]);
                if (result == false) return listVrste[i].Id + "";
            }
        }

        function getDisabledAdd() {
            for (index in vm.ciljeviAktivnosti) {
                if (!(vm.ciljeviAktivnosti[index].tipId || vm.ciljeviAktivnosti[index].vrstaId)) {
                    return true;
                }
            }
        }

        function getDisabledDelete() {
            return vm.ciljeviAktivnosti.length == 1;
        }

        function arhiviraj() {
            adminDataService.arhivirajStandardnuAktivnost(vm.id).then(saveCompleted, saveFailed);
        }
    }
})();