(function () {
    angular
        .module('zp.plan')
        .controller("UnosPlanaController",
            ['appService', 'planDataService', '$anchorScroll', '$routeParams', 'Flash', 'apiRoot', '$filter', '$location', 'ngDialog',
    function (appService, planDataService, $anchorScroll, $routeParams, Flash, apiRoot, $filter, $location, ngDialog) {
        appService.enableChangeNotification();
        var today = new Date();
        var vm = this;
        vm.klijentId = appService.getKlijentId();
        vm.godina = today.getFullYear();
        vm.revizija = 0;
        vm.lokacije = null;
        vm.tab = 0;
        vm.selectedLokacija = "";
        vm.isTabSet = isTabSet;
        vm.changeTab = changeTab;
        vm.eliminateSpace = eliminateSpace;
        vm.gotoTip = gotoTip;
        vm.getTotalForTip = getTotalForTip;
        vm.getTotalForLokacija = getTotalForLokacija;
        vm.getTotal = getTotal;
        vm.save = save;
        vm.lock = lock;
        vm.showSumarniReport = showSumarniReport;
        vm.showOpsirniReport = showOpsirniReport;
        vm.zakljucan = false;
        vm.title = "Unos novog plana";
        vm.prikaziAktivnost = prikaziAktivnost;
        vm.ukloniAktivnost = ukloniAktivnost;
        vm.novi = false;
        vm.cjenikId = $routeParams.cjenikId || null;
        vm.naselja = [];
        vm.getLokacije = getLokacije;
        vm.changeTabNaselje = changeTabNaselje;
        vm.provjeriZakljucaj = provjeriZakljucaj;
        vm.loading = 0;
        vm.getGroup = getGroup;
        vm.groupBy = "Tip";
        vm.planGrupe = ["Tip", "Grupa aktivnosti"];
        vm.novaRevizijaLink = novaRevizijaLink;
        vm.sumCijena = sumCijena;

        // vm.messageVisible = false;
        // vm.messageType = 'error';
        if ($routeParams.godina !== undefined) {
            vm.godina = $routeParams.godina;
        }

        function provjeriZakljucaj() {
            var dirty = appService.isPageDirty();
            if (vm.novaRevizija) return true;

            if (vm.zakljucan === false) {
                return dirty;
            }
            return vm.zakljucan;
        }

        function novaRevizijaLink() {
            if(vm.godina == today.getFullYear()){
                return "#unos";
            }
            else{
                return "#/unos/0/" + vm.godina + "/" + vm.cjenikId;
            }
        }

        function init() {
            if ($routeParams.planId === undefined || parseInt($routeParams.planId) === 0) {
                planDataService.getNoviPlan(vm.godina, vm.cjenikId)
                    .then(getNoviPlanCompleted, getNoviPlanFailed);
                vm.title = "Unos novog plana";
                vm.novi = false;
                vm.novaRevizija = true;
            } else {
                planDataService.getPlan(parseInt($routeParams.planId))
                    .then(getNoviPlanCompleted, getNoviPlanFailed);
                vm.title = "Uređivanje plana";
            }
            vm.loading++;
        }
        init();
        function getNoviPlanCompleted(data) {
            vm.lokacije = data.Lokacije;
            vm.tab = vm.lokacije[0].Id;
            vm.godina = data.Godina;
            vm.selectedLokacija = vm.lokacije[0].Naziv;
            vm.selectedLokacijaId = vm.lokacije[0].Id;
            vm.revizija = data.Revizija;
            vm.zakljucan = data.Zakljucan;
            vm.novi = data.Novi;
            vm.cjenikId = data.CjenikId;
            vm.naselja = getNaselja(data.Lokacije);
            vm.selectedNaselje = vm.naselja[0].Naziv;
            vm.selectedNaseljeId = vm.naselja[0].Id;

            for (var iloc in vm.lokacije) {
                var loc = vm.lokacije[iloc];
                loc.GrupaAktivnosti = {};
                for (var itip in loc.Tipovi) {
                    var tip = loc.Tipovi[itip];
                    for (var iaktivnost in tip.Aktivnosti) {
                        var aktivnost = tip.Aktivnosti[iaktivnost];
                        aktivnost.Kolicina = $filter("number")(aktivnost.Kolicina, 2);
                        if(!loc.GrupaAktivnosti[aktivnost.Grupa]){
                            loc.GrupaAktivnosti[aktivnost.Grupa] = Array();
                        }
                        loc.GrupaAktivnosti[aktivnost.Grupa].push(aktivnost);
                    }
                }
            }

            for (var iloc2 in vm.lokacije) {
                var loc2 = vm.lokacije[iloc2];
                for (var igrup in loc2.GrupaAktivnosti) {
                    loc2.GrupaAktivnosti[igrup] = {
                        Naziv: igrup,
                        Aktivnosti: loc2.GrupaAktivnosti[igrup]
                    };
                }
            }

            if (vm.zakljucan) {
                vm.title = "Pregled plana";
            }
            vm.loading--;
        }

        function getNaselja(lokacije) {
            var naseljaObj = {};
            var naselja = [];
            for (var index in lokacije) {
                var lokacija = lokacije[index];
                naseljaObj[lokacija.Naselje.Id] = lokacija.Naselje;
            }
            // 
            for (index in naseljaObj) {
                naselja.push(naseljaObj[index]);
            }
            var sortedNaselja = $filter('orderBy')(naselja, 'Naziv');
            naselja = [];
            naselja.push({ Id: 0, Naziv: "Sva naselja" });
            for (index in sortedNaselja) {
                naselja.push(sortedNaselja[index]);
            }

            return naselja;
        }

        function getLokacije() {
            if (vm.SelectedNaseljeId) {
                return vm.lokacije.filter(function (item) {
                    return item.Naselje.Id == vm.SelectedNaseljeId;
                });
            }
            return vm.lokacije;
        }

        function getNoviPlanFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>Error!</strong> Pogreška pri dohvatu plana.";
            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }
            Flash.create('danger', message, 'fixed-message');
        }

        function isTabSet(tabId) {
            return tabId == vm.tab;
        }

        function changeTab(tabId) {
            vm.tab = tabId;

            vm.selectedLokacija = vm.lokacije.filter(function (item) {
                return item.Id == tabId;
            })[0].Naziv;

            vm.selectedLokacijaId = tabId;
        }

        function changeTabNaselje(tabId) {
            vm.selectedNaselje = vm.naselja.filter(function (item) {
                return item.Id == tabId;
            })[0].Naziv;
            vm.SelectedNaseljeId = tabId;
            changeTab(vm.getLokacije()[0].Id);
        }

        function eliminateSpace(s) {
            return s.replace(' ', '');
        }

        function gotoTip(tip) {
            $anchorScroll(tip);
        }

        function getTotalForTip(lokacijaId, tipNaziv) {
            var lokacija = vm.lokacije.filter(function (item) {
                return item.Id == lokacijaId;
            })[0];

            var tip = lokacija.Tipovi.filter(function (item) {
                return item.Naziv == tipNaziv;
            })[0];

            var total = 0;

            tip.Aktivnosti.forEach(function (aktivnost, index, array) {
                total = total + (aktivnost.JedinicnaCijena * toNumber(aktivnost.Kolicina) * aktivnost.BrojPonavljanja);
            });

            return total;
        }

        function getTotalForLokacija(lokacijaId) {
            var lokacija = vm.lokacije.filter(function (item) {
                return item.Id == lokacijaId;
            })[0];

            var total = 0;

            lokacija.Tipovi.forEach(function (tip, index, array) {
                total = total + getTotalForTip(lokacijaId, tip.Naziv);
            });

            return total;
        }

        function save() {
            vm.loading++;
            var lokacijeData = [];
            for (var index in vm.lokacije) {
                lokacijeData.push({
                    Id: vm.lokacije[index].Id,
                    Naselje: vm.lokacije[index].Naselje,
                    Naziv: vm.lokacije[index].Naziv,
                    Tipovi: vm.lokacije[index].Tipovi
                });
            }

            planDataService.save(vm.godina, vm.revizija, lokacijeData, vm.cjenikId).then(saveCompleted, saveFailed);
        }

        function lock() {
            vm.loading++;
            ngDialog.openConfirm({
                template: appService.apiRootUrl + 'app/admin/confirmLockDialog.html',
                className: 'ngdialog-theme-default'
            }).then(function (data) {
                planDataService.lock(vm.klijentId, vm.godina, vm.revizija).then(lockCompleted, lockFailed);
            });

            function lockCompleted(data) {
                var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("ZAKLJUCAN_PLAN", vm.naziv) + "</em>";
                Flash.create('success', message, 'fixed-message');
                reloadPlan(data.PlanId);
                vm.loading--;
            }

            function lockFailed(error) {
                if (error.status == 401) window.location.reload();
                var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("ERROR_ZAKLJUCAJ_PLAN", error) + "</em>";
                Flash.create('danger', message, 'fixed-message');
            }
        }

        function showSumarniReport() {
            appService.OpenInNewTab(apiRoot + "Report/GetPlanSumirani?planId=" + parseInt($routeParams.planId));
        }

        function showOpsirniReport() {
            appService.OpenInNewTab(apiRoot + "Report/GetPlanDetaljni?planId=" + parseInt($routeParams.planId));
        }

        function reloadPlan(planId) {
            init();
            /*
            appService.disableChangeNotification();
            var planUrl = '/unos/' + planId;
            if (planUrl == $location.path()) {
                window.location.reload();
            }
            else {
                $location.path(planUrl);
            }
            */
        }


        function saveCompleted(data) {
            // vm.message = "Plan je spremljen";
            // vm.messageVisible = true;
            // vm.messageType = 'success';
            var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("PLAN_SPREMLJEN", vm.naziv) + "</em>";
            Flash.create('success', message, 'fixed-message');
            reloadPlan(data.PlanId);
            vm.loading--;
        }

        function saveFailed(error) {
            if (error.status == 401) window.location.reload();
            // vm.message = "Pogreška pri spremanju plana.";
            // vm.messageVisible = true;
            // vm.messageType = 'error';
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("ERROR_SPREMI_PLAN", vm.naziv) + "</em>";
            Flash.create('danger', message, 'fixed-message');

        }

        function getTotal() {
            var total = 0;

            vm.lokacije.forEach(function (lokacija, index, array) {
                total = total + getTotalForLokacija(lokacija.Id);
            });

            return total;
        }

        function hideMessage() {
            vm.showMessage = false;
            vm.messageVisible = true;
        }

        function prikaziAktivnost(aktivnost) {
            aktivnost.Prikazi = true;
        }

        function ukloniAktivnost(aktivnost) {
            aktivnost.Kolicina = 0;
            aktivnost.Prikazi = false;
        }

        function getGroup(loc) {
            if (vm.groupBy == "Tip") {
                return loc.Tipovi;
            }
            else {
                return loc.GrupaAktivnosti;
            }
        }

        function toNumber(num) {
            if (typeof num == "string") {
                return parseFloat((num + "").replace(".", "").replace(",", "."));
            }
            return num;
        }

        function sumCijena(aktivnost) {
            return aktivnost.JedinicnaCijena * toNumber(aktivnost.Kolicina) * aktivnost.BrojPonavljanja;
        }
    }]);
})();