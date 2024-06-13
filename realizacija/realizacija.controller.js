(function () {
    angular
        .module('zp.realizacija')
        .controller("RealizacijaController",
        ['$scope', 'appService', 'realizacijaDataService', '$routeParams', 'Flash', 'NgTableParams', 'ngDialog', '$filter', realizacijaController]);

    function realizacijaController($scope, appService, realizacijaDataService, $routeParams, Flash, NgTableParams, ngDialog, $filter) {
        var vm = this;
        vm.noviPlan = false;
        vm.service = realizacijaDataService;
        vm.klijentId = appService.getKlijentId();
        vm.planId = parseInt($routeParams.planId);
        // vm.message = "";
        vm.data = null;

        vm.save = save;
        vm.Datum = null;

        vm.kolicinaOnChange = kolicinaOnChange;
        vm.realiziranoOnChange = realiziranoOnChange;
        vm.komentarOnChange = komentarOnChange;
        vm.novaAktivnost = NovaAktivnostDialog;
        vm.TipoviFilter = [];
        vm.FilterAll = true;
        vm.getTipovi = getTipovi;
        vm.applyFilter = applyFilter;
        vm.applyFilterAll = applyFilterAll;
        vm.Filter = {};
        vm.activeImageSrc = null;
        vm.uploadFile = uploadFile;
        vm.closeOverlay = closeOverlay;
        vm.previewImage = previewImage;
        vm.reportRadniNalog = reportRadniNalog;
        vm.aktivnostClass = aktivnostClass;
        vm.toggleKomentar = toggleKomentar;
        vm.showComment = showComment;
        vm.onFilterChange = onFilterChange;
        vm.odabraneLokacije = null;
        vm.lokacije = [];
        vm.loading = true;

        if ($routeParams.datum === undefined) {
            vm.Datum = new Date();
        } else {
            vm.noviPlan = true;
            vm.Datum = new Date($routeParams.datum);
        }

        vm.cols = [{
            field: "Tip",
            title: "Tip",
            sortable: "Tip",
            show: false,
            groupable: "Tip"
        }, {
            field: "Naziv",
            title: "Naziv aktivnosti",
            sortable: "Naziv",
            show: true,
            filter: { 'Naziv': 'text' }
        }, {
            field: "Kolicina",
            title: "Količina",
            sortable: "Kolicina",
            show: true,
        }, {
            field: "MjernaJedinica",
            title: "",
            show: true,
        }, {
            field: "Realizirano",
            title: "Realizirano",
            filter: { "Realizirano": "select" },
            filterData: [
                { id: '', title: 'Sve' },
                { id: 'true', title: 'Realizirano' },
                { id: 'false', title: 'Nerealizirano' }
            ],
            sortable: "Realizirano",
            show: true
        }];

        vm.tableParams = new NgTableParams({
            group: {
                Tip: "asc"
            },
            sorting: { 'Naziv': 'asc' },
            filter: { Realizirano: "" }
        }, {
            dataset: [], // vm.getAktivnosti(),
        });

        vm.changeDs = function () {
            disableAllFilters();
            var aktivnosti = getAllAktivnostiList();
            var filtriraneAktivnosti = filterAktivnosti(aktivnosti);

            vm.tableParams.settings({
                dataset: filtriraneAktivnosti,
                counts: [] // Disable pagination
            });

            for (var index in aktivnosti) {
                enableTip(aktivnosti[index].Tip);
            }
        };

        function enableTip(tip) {
            for (var index in vm.TipoviFilter) {
                if (vm.TipoviFilter[index].Naziv == tip) {
                    vm.TipoviFilter[index].Disabled = false;
                }
            }
        }

        function disableAllFilters() {
            var tipovi = vm.TipoviFilter;
            for (var index in tipovi) {
                vm.TipoviFilter[index].Disabled = true;
            }
        }

        function applyFilter() {
            var all = true;
            for (var index in vm.TipoviFilter) {
                if (vm.TipoviFilter[index].Aktivno === false) {
                    all = false;
                }
            }
            vm.FilterAll = all;
            vm.changeDs();
        }

        init();

        function init() {
            // #region services
            if ($routeParams.planId === undefined) {
                // Exception or default value
            } else {
                // Load selected data
                realizacijaDataService.getPlan(vm.planId, vm.Datum, undefined).then(getRealizacijaCompleted, getRealizacijaFailed);
            }
        }

        /*function trenutnaLokacijaId() {
            vm.data = vm.data || {};
            vm.data.Lokacija = vm.data.Lokacija || {};
            vm.data.Lokacija.Id = vm.data.Lokacija.Id || undefined;
            return vm.data.Lokacija.Id;
        }*/

        function getBrojRealizacija(lokacija) {
            var ret = 0;

            for (var index in lokacija.Aktivnosti) {
                var aktivnost = lokacija.Aktivnosti[index];
                if (aktivnost.Realizirano) {
                    ret++;
                }
            }
            return ret;
        }

        function getNazivBrojRealizacija(lokacija) {
            return lokacija.Naziv + ' (' + getBrojRealizacija(lokacija) + ')';
        }

        function getRealizacijaCompleted(data) {
            vm.data = data;

            for (var i in data.Lokacije) {
                // vm.data.Lokacije.push(data.Lokacije[i]);
                vm.data.Lokacije[i].brojRealizacija = getBrojRealizacija(vm.data.Lokacije[i]);
                vm.data.Lokacije[i].nazivBrojRealizacija = getNazivBrojRealizacija(vm.data.Lokacije[i]);
               
                for (var j in vm.data.Lokacije[i].Aktivnosti) {
                    vm.data.Lokacije[i].Aktivnosti[j].RealiziranoOrg = vm.data.Lokacije[i].Aktivnosti[j].Realizirano;
                    vm.data.Lokacije[i].Aktivnosti[j].Kolicina = $filter("number")(vm.data.Lokacije[i].Aktivnosti[j].Kolicina, 2);
                }
            }

            initTipovi();
            vm.changeDs();

            if (vm.data.OmoguciIzmjene === false) {
                var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("STARA_REVIZIJA_PLANA", vm.naziv) + "</em>";
                Flash.create('info', message, 'fixed-message');
            }

            appService.enableChangeNotification();
            vm.loading = false;
        }

        function getRealizacijaFailed(error) {
            if (error.status == 401) window.location.reload();
            vm.data = {};
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("INTERNA_POGRESKA_SERVERA") + "</em>";
            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }
            Flash.create('danger', message, 'fixed-message');
        }

        function convertToDate(item) {
            if (item.Datum) {
                item.Datum = new Date(item.Datum);
                return item;
            }
            return null;
        }

        function save() {
            vm.loading = true;
            var saveData = {
                PlanId: vm.data.PlanId,
                Lokacije: filterSaveLokacijeAktivnosti(vm.data.Lokacije),
                Datum: vm.data.Datum
                // Aktivnosti: filterSaveAktivnosti(vm.data.Aktivnosti)
            };
            
            realizacijaDataService.save(saveData).then(saveCompleted, saveFailed);
        }

        function filterSaveLokacijeAktivnosti(data) {
            var list = [];
            for (var index in data) {
                var aktivnosti = filterSaveAktivnosti(data[index].Aktivnosti);
                if (aktivnosti.length) {
                    var lokacija = {
                        Id: data[index].Id,
                        Naziv: data[index].Naziv,
                        Aktivnosti: aktivnosti
                    };
                    list.push(lokacija);
                }
            }
            return list;
        }

        function filterSaveAktivnosti(data){
            var list = [];
            for (var index in data) {
                var item = data[index];
                if (item.Status > 0) {
                    item.Kolicina = parseFloat(item.Kolicina.replace(".", "").replace(",", "."));
                    list.push(item);
                }
            }
            return list;
        }

        function saveCompleted() {
            var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("SPREMANJE_USPJESNO") + "</em>";
            Flash.create('info', message, 'fixed-message');
            appService.disableChangeNotification();
            // init();
            reload();
            // vm.loading = false;
            // nakon spremanja postavi sve statuse na nepromjenjen
            // nije vise potrebno jer se radi ponovni poziv servisa radi uploada slika
            /*
            vm.data.Lokacije.forEach(function (lokacija) {
                lokacija.Aktivnosti.forEach(function (aktivnost) {
                    if (aktivnost.Status != vm.data.Status.Nepromjenjen) {
                        aktivnost.Status = vm.data.Status.Nepromjenjen;
                    }
                });
            });
            */
        }

        function saveFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("ERROR_DODAJ_PODATAK") + "</em>";
            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }
            Flash.create('danger', message, 'fixed-message');
        }

        // end services

        function filterAktivnosti(aktivnosti) {
            if (vm.FilterAll) {
                return aktivnosti;
            }

            var list = [];

            for (var index in aktivnosti) {
                if (activeFilterTipAktivnost(aktivnosti[index])) {
                    list.push(aktivnosti[index]);
                }
            }

            return list;
        }

        function activeFilterTipAktivnost(aktivnost) {
            var active = false;
            var tip = aktivnost.Tip;
            for (var index in vm.TipoviFilter) {
                if (vm.TipoviFilter[index].Naziv == tip && vm.TipoviFilter[index].Aktivno) {
                    active = true;
                }
            }
            return active;
        }

        function getAllAktivnostiList() {
            var aktivnosti = [];
            var lokacije;

            if (vm.odabraneLokacije === null) {
                // dodaj aktivnosti za sve lokacije
                lokacije = vm.data.Lokacije;
            } else {
                // dodaj aktivnosti za odabrane lokacije
                lokacije = vm.odabraneLokacije;
            }

            for (var i in lokacije) {
                if (lokacije[i].Aktivnosti !== undefined)
                    Array.prototype.push.apply(aktivnosti, lokacije[i].Aktivnosti);
            }

            return aktivnosti;
        }

        function kolicinaOnChange(aktivnost) {
            if (aktivnost.Status != vm.data.Status.Novi) {
                aktivnost.Status = vm.data.Status.Izmjenjen;
            }
        }

        function realiziranoOnChange(aktivnost) {
            if (aktivnost.Status != vm.data.Status.Novi) {
                aktivnost.Status = vm.data.Status.Izmjenjen;
            }
        }

        function komentarOnChange(aktivnost) {
            if (aktivnost.Status != vm.data.Status.Novi) {
                aktivnost.Status = vm.data.Status.Izmjenjen;
            }
        }

        function NovaAktivnostDialog() {
            ngDialog.openConfirm({
                template: 'modalDialogId',
                className: 'ngdialog-theme-default',
                data: angular.toJson({ data: { Aktivnosti: vm.data.Aktivnosti, Lokacije: vm.data.Lokacije } })
            }).then(function (value) {
                var newAktivnost = angular.copy(value.Aktivnost);
                newAktivnost.Kolicina = value.Kolicina;
                newAktivnost.Status = vm.data.Status.Novi;
                newAktivnost.Datum = vm.Datum;
                newAktivnost.Realizirano = true;
                newAktivnost.LokacijaId = value.Lokacija.Id;
                newAktivnost.LokacijaNaziv = value.Lokacija.Naziv;

                vm.data.Lokacije.forEach(function (item) {
                    if (item.Id == value.Lokacija.Id) {
                        item.Aktivnosti.push(newAktivnost);
                        vm.data.Lokacija.Aktivnosti.push(newAktivnost);
                    }
                });

                vm.tableParams.total(vm.data.Lokacija.Aktivnosti.length);
                vm.changeDs();
                vm.tableParams.reload();
            }, function (reason) {
                // todo
            });
        }

        function reportRadniNalog() {
            var date = $filter('date')(vm.Datum, "yyyy-MM-dd");
            appService.OpenInNewTab(appService.apiRootUrl + "Report/GetRadniNalog?periodOd=" + date + "&periodDo=" + date);
        }

        function initTipovi() {
            var tipoviFilterUrl = {};
            var routeFilter = $routeParams.filter || "";
            var tipovilist = routeFilter.split("|");
            for (var t in tipovilist) {
                tipoviFilterUrl[tipovilist[t]] = tipovilist[t];
            }
            
            // vm.TipoviFilter = [];
            var list = getAllAktivnostiList();
            var tipovi = convertArrayToTipovi(vm.TipoviFilter);

            var aktivnifilter = vm.FilterAll;
            if (aktivnifilter) {
                aktivnifilter = list.length < 500;
                vm.FilterAll = aktivnifilter;
            }
      
            for (var index in list) {
                if (!tipovi[list[index].Tip]) {
                    tipovi[list[index].Tip] = {
                        Naziv: list[index].Tip,
                        Aktivno: aktivnifilter,
                        Disabled: true,
                        Key: list[index].Tip.replace(/ /g, "-").replace('/', '-')
                    };

                    if (tipovilist.length && routeFilter.length > 0) {
                        if (!tipoviFilterUrl[tipovi[list[index].Tip].Key]) {
                            tipovi[list[index].Tip].Aktivno = false;
                            vm.FilterAll = false;
                        }
                        else {
                            tipovi[list[index].Tip].Aktivno = true;
                        }
                    }
                }
            }

            vm.TipoviFilter = [];

            for (var tip in tipovi) {
                vm.TipoviFilter.push(tipovi[tip]);
            }
        }

        function reload() {
            var aktivniTipoviList = [];
            var aktivniTipoviStr = "";
            var all = true;
            for (var tip in vm.TipoviFilter) {
                if (vm.TipoviFilter[tip].Aktivno) {
                    aktivniTipoviList.push(vm.TipoviFilter[tip].Key);
                }
                else{
                    all = false;
                }
            }
            aktivniTipoviStr = aktivniTipoviList.join("|");
            
            if (!aktivniTipoviStr) {
                aktivniTipoviStr = "0";
            }

            vm.selectedNaseljeId = vm.selectedNaseljeId || 0;
            vm.selectedLokacijaId = vm.selectedLokacijaId || 0;

            var location = "/realizacija/pregled/" + $routeParams.planId + "/" + $routeParams.datum + "/" + aktivniTipoviStr + "/" + vm.selectedNaseljeId + "/" + vm.selectedLokacijaId;

            if (window.location.hash == location) {
                window.location.reload();
            }
            else {
                window.location.hash = location;
            }
        }

        function convertArrayToTipovi(array) {
            var result = {};

            for (var index in array) {
                result[array[index].Naziv] = array[index];
            }

            return result;
        }

        function getTipovi() {
            var retList = [];
            if (vm.data) {
                var list = getAllAktivnostiList();
                var tipovi = {};
                for (var index in list) {
                    tipovi[list[index].Tip] = list[index].Tip;
                }
                var id = 1;
                for (var tip in tipovi) {
                    retList.push(tip);
                }
            }
            return retList;
        }

        function applyFilterAll() {
            for (var item in vm.TipoviFilter) {
                vm.TipoviFilter[item].Aktivno = vm.FilterAll;
            }

            vm.changeDs();
        }

        function uploadFile(aktivnost) {
            vm.loading = true;
            realizacijaDataService.uploadFile(aktivnost.files[0], aktivnost.dataset.aktivnostId, aktivnost.dataset.planId).then(uploadCompleted, saveFailed);
        }

        function uploadCompleted() {
            var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("SPREMANJE_DATOTEKE_USPJESNO") + "</em>";
            Flash.create('info', message, 'fixed-message');
            appService.disableChangeNotification();
            // init();
            reload();
        }

        function previewImage(datoteka) {
            vm.activeImageSrc = datoteka;
        }

        function closeOverlay() {
            vm.activeImageSrc = null;
        }

        function aktivnostClass(aktivnost) {
            if (aktivnost.Komentar) {
                return 'has-comment';
            }
            else {
                return '';
            }
        }

        function showComment(aktivnost) {
            return aktivnost.showKomentar;
        }

        function toggleKomentar(aktivnost) {
            if (aktivnost.Realizirano) {
                var current = !!aktivnost.showKomentar; // convert to boolean (bool)aktivnost.showKomentar
                aktivnost.showKomentar = !current;
                return aktivnost.showKomentar;
            }
            else
                return false;
        }

        function onFilterChange(lokacije, naselje) {
            vm.odabraneLokacije = [];
            vm.selectedNaseljeId = naselje.Id;
            vm.selectedLokacijaId = 0;
            if (lokacije.length == 1) {
                vm.selectedLokacijaId = lokacije[0].Id;
            }
            function compareLokacije(element, index, array) {
                return element.Id == this.Id;
            }

            function getLokacija(array, lokacija) {
                for (var index in array) {
                    if (array[index].Id == lokacija.Id) {
                        return array[index];
                    }
                }
            }

            for (var i in lokacije) {
                // ie ne podržava metodu find....
                // var dataLokacija = vm.data.Lokacije.find(compareLokacije, lokacije[i]);
                var dataLokacija = getLokacija(vm.data.Lokacije, lokacije[i]);
                vm.odabraneLokacije.push(dataLokacija);
            }

            vm.changeDs();
            vm.tableParams.reload();
        }
    }
})();