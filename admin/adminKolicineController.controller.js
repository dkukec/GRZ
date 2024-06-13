(function () {
    angular
        .module('zp.admin')
        .controller("adminKolicineController", [
            '$location', '$routeParams', '$controller', 'appService', 'adminDataService', 'Flash', 'NgTableParams', 'ngDialog', '$filter', adminController]);

    function adminController($location, $routeParams, $controller, appService, adminDataService, Flash, NgTableParams, ngDialog, $filter) {
        appService.enableChangeNotification();
        var vm = this;
        vm.klijentId = appService.getKlijentId();
        vm.List = null;
        vm.Lokacije = null;
        vm.Lokacija = null;
        vm.cols = null;
        vm.tableParams = null;
        vm.changeDs = changeDs;
        vm.dodajKolicinu = dodajKolicinu;
        vm.obrisiKolicinu = obrisiKolicinu;
        vm.kolicinaOnChange = kolicinaOnChange;
        vm.save = save;
        vm.sumKolicina = sumKolicina;
        vm.sumKolicinaMjernaJedinica = sumKolicinaMjernaJedinica;
        vm.LokacijaIndex = null;
        vm.grupeLokacija = null;
        vm.getLokacijaIndex = getLokacijaIndex;
        vm.prikaziSveLokacije = !$routeParams.id;
        vm.Naselja = [];
        vm.editMode = false;

        init();
        function init() {
            adminDataService.getKolicine(vm.klijentId).then(loadCompleted, loadFailed);
            adminDataService.getGrupaLokacije(vm.klijentId).then(loadGrupeCompleted, loadGrupeFailed);
            adminDataService.getNaselja().then(loadNaseljaCompleted, loadFailed);
        }
        function loadNaseljaCompleted(data) {
            vm.Naselja = data;
        }

        function loadGrupeCompleted(data) {
            vm.grupeLokacija = data;
        }

        function loadGrupeFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("INTERNA_POGRESKA_SERVERA") + "</em>";
            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }
            Flash.create('danger', message, 'fixed-message');
        }

        function first(obj) {
            for (var index in obj) {
                return obj[index];
            }
        }

        function loadCompleted(data) {
            vm.List = data.Kolicine;
            vm.Lokacije = data.Lokacije;

            for (var index in vm.Lokacije) {
                vm.Lokacije[index].Grupa.Id = vm.Lokacije[index].Grupa.Id + "";
                vm.Lokacije[index].Naselje.Id = vm.Lokacije[index].Naselje.Id + "";
                vm.Lokacije[index].NaseljeLokacija = vm.Lokacije[index].Naselje.Naziv + " - " + vm.Lokacije[index].Naziv;
            }

            for (var i in vm.List) {
                for (var j in vm.List[i].Kolicine) {
                    vm.List[i].Kolicine[j].Broj = $filter("number")(vm.List[i].Kolicine[j].Broj, 2);
                }
            }

            vm.Tipovi = data.Tipovi;
            if ($routeParams.id) {
                vm.Lokacija = $routeParams.id + "";
            }
            else {
                vm.Lokacija = first(vm.Lokacije).Id + "";
            }

            vm.changeDs();
        }

        function loadFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("ERROR_UCITAVANJE_PODATAKA") + "</em>";
            Flash.create('danger', message, 'fixed-message');
            vm.List = [];
        }

        vm.cols = [{
            field: "VrstaTipNaziv",
            title: "Tip",
            sortable: "VrstaTipNaziv",
            show: false,
            groupable: "VrstaTipNaziv"
        }, {
            field: "VrstaNaziv",
            title: "Vrsta",
            sortable: "VrstaNaziv",
            show: true,
            filter: { 'VrstaNaziv': 'text' }
        }, {
            field: "Broj",
            title: "Količina",
            sortable: "Broj",
            filter: { 'Broj': 'text' },
            colspan: 2,
            show: true,
        },{
            field: "MjernaJedinica",
            title: "",
            show: true,
        }, {
            field: "Admin",
            title: "",
            show: true,
        }];

        vm.tableParams = new NgTableParams({
            sorting: { 'VrstaNaziv': "asc" },
            group: {
                VrstaTipNaziv: "asc"
            },
            count: appService.tableRowCount
        }, {
            dataset: [], // vm.getAktivnosti(),
        });

        function changeDs() {
            vm.tableParams.settings({
                dataset: getTipoviNaLokaciji(),
                counts: [] // Disable pagination
            });
        }

        function getTipoviNaLokaciji() {
            for (index in vm.List) {
                if (vm.List[index].Id == vm.Lokacija) {
                    var retList = [];
                    for (var i in vm.List[index].Kolicine) {
                        if (vm.List[index].Kolicine[i].Status != 3) {
                            retList.push(vm.List[index].Kolicine[i]);
                        }
                    }
                    return retList;
                }
            }
        }

        function dodajKolicinu() {
            var arrayTipovi = Object.keys(vm.Tipovi).map(function (key) { return vm.Tipovi[key] });
            vm.Tipovi = $filter('orderBy')(arrayTipovi, 'Naziv');
            
            for (var index in vm.Tipovi) {
                var arrayVrste = [];
                var objKeys = Object.keys(vm.Tipovi[index].Vrste);
                for (var index2 in objKeys) {
                    arrayVrste.push(vm.Tipovi[index].Vrste[objKeys[index2]]);
                }

                vm.Tipovi[index].Vrste = $filter('orderBy')(arrayVrste, 'Naziv');
            }

            var ngDialogModel = {
                Lokacija: getLokacija(),
                Tipovi: vm.Tipovi,
                List: vm.List,
                vm: vm
            };

            ngDialog.openConfirm({
                template: appService.apiRootUrl + 'app/admin/dodajKolicinu.html',
                className: 'ngdialog-theme-default',
                controllerAs: 'ctrlChild',
                data: angular.toJson(ngDialogModel)
            }).then(function (value) {

                var tip = null;
                for (var index in vm.Tipovi) {
                    if (value.TipId == vm.Tipovi[index].Id) {
                        tip = vm.Tipovi[index];
                    }
                }

                var vrsta = null;
                for (var index in tip.Vrste) {
                    if (value.VrstaId == tip.Vrste[index].Id) {
                        vrsta = tip.Vrste[index];
                    }
                }


                var kolicina = {
                    VrstaNaziv: vrsta.Naziv,
                    VrstaTipNaziv: tip.Naziv,
                    Broj: value.Broj,
                    VrstaMjernaJedinicaOznaka: vrsta.MjernaJedinica.Oznaka,
                    LokacijaNaziv: getLokacija().Naziv,
                    LokacijaId: getLokacija().Id,
                    VrstaId: value.VrstaId,
                    Status: 1
                };

                vm.List[getLokacijaListIndex()].Kolicine.push(kolicina);
                vm.tableParams.total(vm.List[getLokacijaListIndex()].Kolicine.length);
                vm.changeDs();
                vm.tableParams.reload();
            }, function (reason) {
                // todo
            });
        }

        function toNumber(num) {
            return parseFloat((num + "").replace(".", "").replace(",", "."));
        }
        function saveKolicine() {
            for (var i in vm.List) {
                for (var j in vm.List[i].Kolicine) {
                    vm.List[i].Kolicine[j].Broj = toNumber(vm.List[i].Kolicine[j].Broj);
                }
            }

            adminDataService.saveKolicine(vm.klijentId, vm.List).then(saveCompleted, saveFailed);
        }

        function save() {
            adminDataService.updateLokacija(vm.klijentId, { Id: vm.Lokacije[getLokacijaIndex()].Id, Naziv: vm.Lokacije[getLokacijaIndex()].Naziv, GrupaLokacijaId: vm.Lokacije[getLokacijaIndex()].Grupa.Id, NaseljeId: vm.Lokacije[getLokacijaIndex()].Naselje.Id }).then(saveLokacijaCompleted, saveLokacijaFailed);
        }

        function saveLokacijaCompleted() {
            // $location.path('/admin/registers/lokacije');
            // var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("SPREMANJE_USPJESNO", vm.naziv) + "</em>";
            // Flash.create('info', message, 'fixed-message');
            saveKolicine();
        }

        function saveLokacijaFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("ERROR_DODAJ_PODATAK") + "</em>";
            Flash.create('danger', message, 'fixed-message');
            vm.List = [];
        }

        function saveCompleted() {
            var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("SPREMANJE_USPJESNO") + "</em>";
            Flash.create('info', message, 'fixed-message');
            appService.disableChangeNotification();
            window.location.reload();
            // $location.path('/admin/kolicine/' + $routeParams.id);
        }

        function saveFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("ERROR_DODAJ_PODATAK") + "</em>";

            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }
            Flash.create('danger', message, 'fixed-message');
        }

        function obrisiKolicinu(kolicina) {
            ngDialog.openConfirm({
                template: appService.apiRootUrl + 'app/admin/confirmDeleteDialog.html',
                className: 'ngdialog-theme-default',
                data: angular.toJson(kolicina)
            }).then(function (value) {
                for (index in vm.List[getLokacijaListIndex()].Kolicine) {
                    if (vm.List[getLokacijaListIndex()].Kolicine[index].Id == value.Id) {
                        vm.List[getLokacijaListIndex()].Kolicine[index].Status = 3; // obrisan
                    }
                }
                vm.changeDs();
            }, function (reason) {
                // todo
            });
        }

        function kolicinaOnChange(aktivnost) {
            if (aktivnost.Status == 0) aktivnost.Status = 2;
        }

        function getLokacija() {
            return vm.Lokacije[getLokacijaIndex()];
        }

        function getLokacijaIndex() {
            for (var index in vm.Lokacije) {
                if (vm.Lokacije[index].Id == vm.Lokacija) return index;
            }
        }

        function getLokacijaListIndex() {
            for (var index in vm.List) {
                if (vm.List[index].Id == vm.Lokacija) return index;
            }
            var naziv = vm.Lokacije[getLokacijaIndex()].Naziv;
            var id = vm.Lokacije[getLokacijaIndex()].Id;

            vm.List.push({ Id: id, Naziv: naziv, Kolicine: [] });
            return getLokacijaListIndex();
        }

        function sumKolicinaTotal(rowGroup) {
            suma = {};
            var changes = false;

            for (var index in rowGroup) {
                if (!suma[rowGroup[index].VrstaMjernaJedinicaOznaka]) suma[rowGroup[index].VrstaMjernaJedinicaOznaka] = 0;
                suma[rowGroup[index].VrstaMjernaJedinicaOznaka] += toNumber(rowGroup[index].Broj);
            }

            var list = [];
            for (var index in suma) {
                var newObj = { MjernaJedinica: index, Kolicina: suma[index] };
                list.push(newObj);
            }

            return list;
        }

        function sumKolicina(rowGroup) {
            var kolicine = sumKolicinaTotal(rowGroup);
            var list = [];
            for (var index in kolicine) {
                list.push(kolicine[index].Kolicina)
            }
            return list;
        }

        function sumKolicinaMjernaJedinica(rowGroup, index) {
            var kolicine = sumKolicinaTotal(rowGroup);
            return kolicine[index].MjernaJedinica;
        }
    }
})();