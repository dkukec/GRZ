(function () {
    angular
    .module('zp.reports')
    .controller("ReportsController", ['appService', 'reportsDataService', '$location', '$routeParams', 'apiRoot', '$filter', 'Flash', listReportController]);

    function listReportController(appService, reportsDataService, $location, $routeParams, apiRoot, $filter, Flash) {
        var vm = this;
        var custom = this;
        var toggleCustom = this;
        vm.planId = $routeParams.planId;
        vm.klijentId = appService.getKlijentId();
        vm.IzvjestajId = null;
        vm.grupeAktivnosti = [];
        vm.GrupaAktivnosti = null;
        vm.LokacijaId = '';
        vm.reparseDateInput = reparseDateInput;
        vm.LokacijeFilter = {};
        vm.MoguceVrijednostiReport = [
            { Id: 5, Naziv: "Radni nalog", Link: "/report/radni-nalog", Report: "" },
            { Id: 8, Naziv: "Specifikacija uz račun - lokacije", Link: "/report/realizirano", Report: "" },
            { Id: 6, Naziv: "Specifikacija uz račun - aktivnosti", Link: "/report/izvjestaj-po-aktivnostima", Report: "" },
            { Id: 10, Naziv: "Realizirane aktivnosti", Link: "/report/realiziranoFotografije", Report: "" },
            { Id: 12, Naziv: "Realizirane aktivnosti prema danima", Link: "/report/realiziranoDnevno", Report: "" },
            { Id: 7, Naziv: "Zadnje aktivnosti po lokacijama", Link: "/report/zadnje-na-lokaciji", Report: "" },
            { Id: 9, Naziv: "Planirano / realizirano", Link: "/report/planirano-realizirano", Report: "" },
            { Id: 13, Naziv: "Indeks realizacije plana", Link: "/report/indeks-realizacije", Report: "" },
            { Id: 11, Naziv: "Cjenici", Link: "/report/cjenici", Report: "" },
            { Id: 14, Naziv: "Količine po lokacijama", Link: "/report/kolicine", Report: "" },
            { Id: 4, Naziv: "Pregled plana - sumirani", Link: "/report/plan-sumirani", Report: "" },
            { Id: 3, Naziv: "Pregled plana - detaljni", Link: "/report/plan-opsiran", Report: "" },
        ];
        vm.DatumOd = new Date(new Date().getFullYear(), new Date().getMonth());
        vm.DatumDo = new Date(new Date().getFullYear(), new Date().getMonth(), lastDayInMonth(new Date().getFullYear(), new Date().getMonth()));

        vm.Lokacije = [];
        vm.Naselja = [];
        vm.Cjenici = [];
        vm.Godina = new Date().getFullYear() + "";
        vm.Date = new Date();
        vm.Datum = '';

        vm.getReports = getReports;
        vm.title = 'Reports';

        vm.messageVisible = false;
        vm.messageType = 'error';
        vm.PrikaziDatume = PrikaziDatume;
        vm.PrikaziLokaciju = PrikaziLokaciju;
        vm.PrikaziNaselje = PrikaziNaselje;
        vm.send = send;
        vm.getNaselja = getNaselja;
        vm.getLokacije = getLokacije;
        vm.PrikaziCjenike = PrikaziCjenike;
        vm.PrikaziGrupeAktivnosti = PrikaziGrupeAktivnosti;
        vm.PrikaziGodine = PrikaziGodine;
        vm.CjenikGrupa = "Tip";


        vm.getGrupeAktivnosti = getGrupeAktivnosti;
        vm.getGodine = getGodine;
        vm.godine = [];



        activate();

        vm.CjenikGrupe = ["Tip", "Grupa aktivnosti"];

        function PrikaziGodine() {
            switch (parseInt(vm.IzvjestajId)) {
                case 13: return true;
                default: return false;
            }
        }

        function PrikaziDatume() {
            switch (parseInt(vm.IzvjestajId)) {
                case 2:
                case 3:
                case 4:
                case 7:
                case 11:
                case 13:
                case 14: return false;
                case 1:
                case 5:
                case 6:
                case 8:
                case 9:
                case 10:
                case 12: return true;
            }
        }

        function PrikaziLokaciju() {
            switch (parseInt(vm.IzvjestajId)) {
                case 3:
                case 4:
                case 7:
                case 11:
                case 13: return false;
                case 5:
                case 6:
                case 8:
                case 9:
                case 10:
                case 12:
                case 14: return true;
            }
        }

        function PrikaziNaselje() {
            switch (parseInt(vm.IzvjestajId)) {
                case 7:
                case 3:
                case 4:
                case 11:
                case 13: return false;
                case 5:
                case 6:
                case 8:
                case 9:
                case 10:
                case 12:
                case 14: return true;
            }
        }

        function PrikaziGrupeAktivnosti() {
            switch (parseInt(vm.IzvjestajId)) {
                case 6: return true;
                default: return false;
            }

        }

        function PrikaziCjenike() {
            switch (parseInt(vm.IzvjestajId)) {
                case 11: return true;
                default: return false;
            }
        }

        function reparseDateInput() {
            if ("string" === typeof vm.DatumOd) {
                vm.DatumOd = stringToDate(vm.DatumOd);
            }

            if ("string" === typeof vm.DatumDo) {
                vm.DatumDo = stringToDate(vm.DatumDo);
            }
        }

        function stringToDate(date) {
            if ("string" === typeof date) {
                var newdate = date.split(".");
                return new Date(newdate[2], parseInt(newdate[1]) - 1, newdate[0]);
            }
            return date;
        }

        function dateToString(date) {
            if ("string" === typeof date) {
                date = stringToDate(date);
            }
            var year = date.getFullYear();
            var month = (date.getMonth() + 1) + "";
            var day = date.getDate() + "";

            if (month.length === 1) month = "0" + month;
            if (day.length === 1) day = "0" + day;

            return year + "-" + month + "-" + day;
        }

        function activate() {
            return getReports().then(function () {
                //  logger.info('Activated Reports View');
            });
        }

        custom = true;
        toggleCustom = function () {
            custom = custom === false ? true : false;
        };

        function getNaselja() {
            var naseljaObj = {};
            var naselja = [];
            var orderBy = $filter('orderBy');
            for (var index in vm.Lokacije) {
                var lokacija = vm.Lokacije[index];
                if (lokacija.Id) {
                    naseljaObj[lokacija.Naselje.Id] = lokacija.Naselje;
                }
            }
            var naseljaAsc = [];
            for (index in naseljaObj) {
                naseljaAsc.push(naseljaObj[index]);
            }
            naseljaAsc = orderBy(naseljaAsc, 'Naziv');
            naselja.push({ Id: 0, Naziv: "Sva naselja" });
            for (index in naseljaAsc) {
                naselja.push(naseljaAsc[index]);
            }
            return naselja;
        }

        function getLokacije() {
            if (vm.LokacijeFilter[vm.NaseljeId]) {
                return vm.LokacijeFilter[vm.NaseljeId];
            }
            var lokacije = [];
            if (vm.NaseljeId === "0") {
                return vm.Lokacije;
            }
            lokacije.push({ Id: 0, Naziv: "Sve  lokacije" });
            for (var index in vm.Lokacije) {
                if (vm.Lokacije[index].Id === "0") {
                    lokacije.push(vm.Lokacije[index]);
                }

                if (vm.Lokacije[index].Naselje && vm.Lokacije[index].Naselje.Id == vm.NaseljeId) {
                    lokacije.push(vm.Lokacije[index]);
                }
            }
            if (lokacije.length > 1) {
                vm.LokacijeFilter[vm.NaseljeId] = lokacije;
                return lokacije;
            }
            return null;
        }

        function getReports(data) {
            return reportsDataService.getReports(vm.klijentId, vm.planId).then(function (data) {
                vm.Lokacije = data.Lokacije;
                vm.planId = data.PlanId;
                vm.Naselja = getNaselja();
                vm.Cjenici = data.Cjenici;
                vm.NaseljeId = "0";
                vm.LokacijaId = "0";
                for (var index in vm.MoguceVrijednostiReport) {
                    if (vm.MoguceVrijednostiReport[index].Link === $location.$$url) {
                        vm.IzvjestajId = vm.MoguceVrijednostiReport[index].Id + "";
                    }
                }
                vm.grupeAktivnosti = [];
                vm.grupeAktivnosti.push(null);
                for (var i in data.GrupeAktivnosti) {
                    vm.grupeAktivnosti.push(data.GrupeAktivnosti[i]);
                }
                vm.godine = data.Godine;
            });
        }

        function lastDayInMonth(year, month) {
            var date = new Date(year, parseInt(month) + 1, 0);
            return date.getDate();
        }

        function validateForm(cjenikId) {
            switch (cjenikId) {
                case 3:
                case 4:
                case 7:
                    return true;
                case 11:
                    return !!vm.CjenikId;
                default:
                    return !!vm.DatumOd && vm.DatumDo;
            }
        }

        function getReportUrl(url) {
            switch (url) {
                case 'Report/GetPlanDetaljni':
                case 'Report/GetPlanSumirani':
                    return getReportUrlPlan(url);
                case 'Report/GetZadnjePoLokacijama':
                    return apiRoot + url;
                case 'Report/GetCjenik':
                    return apiRoot + url + "?CjenikId=" + vm.CjenikId + "&grupa=" + vm.CjenikGrupa;
                case 'Report/GetIzvrsenoPoAktivnostima':
                    if (!vm.GrupaAktivnosti) {
                        vm.GrupaAktivnosti = "";
                    }
                    return apiRoot + url + "?periodOd=" + dateToString(vm.DatumOd) + '&periodDo=' + dateToString(vm.DatumDo) + '&lokacijaId=' + vm.LokacijaId + '&naseljeId=' + vm.NaseljeId + '&GrupaAktivnosti=' + vm.GrupaAktivnosti;
                case 'Report/GetIndeksRealizacije':
                    return apiRoot + url + '?godina=' + vm.Godina;
                case 'Report/GetKolicine':
                    return apiRoot + url + '?lokacijaId=' + vm.LokacijaId + '&naseljeId=' + vm.NaseljeId;
                default:
                    return apiRoot + url + "?periodOd=" + dateToString(vm.DatumOd) + '&periodDo=' + dateToString(vm.DatumDo) + '&lokacijaId=' + vm.LokacijaId + '&naseljeId=' + vm.NaseljeId;
            }
        }

        function getGrupeAktivnosti() {
            return vm.grupeAktivnosti;
        }

        function getGodine() {
            return vm.godine;
        }

        function getReportUrlPlan(url) {
            return apiRoot + url + '?planId=' + vm.planId + '&naseljeId=' + vm.NaseljeId;
        }

        function send() {
            if (validateForm(parseInt(vm.IzvjestajId))) {
                reportsDataService.validateReports(vm.IzvjestajId, dateToString(vm.DatumOd), dateToString(vm.DatumDo)).then(function () {
                    switch (parseInt(vm.IzvjestajId)) {
                        case 3: appService.OpenInNewTab(getReportUrl('Report/GetPlanDetaljni')); break;
                        case 4: appService.OpenInNewTab(getReportUrl('Report/GetPlanSumirani')); break;
                        case 5: appService.OpenInNewTab(getReportUrl('Report/GetRadniNalog')); break;
                        case 6: appService.OpenInNewTab(getReportUrl('Report/GetIzvrsenoPoAktivnostima')); break;
                        case 7: appService.OpenInNewTab(getReportUrl('Report/GetZadnjePoLokacijama')); break;
                        case 8: appService.OpenInNewTab(getReportUrl('Report/GetIzvrseno')); break;
                        case 9: appService.OpenInNewTab(getReportUrl('Report/GetPlaniranoRealizirano')); break;
                        case 10: appService.OpenInNewTab(getReportUrl('Report/GetIzvrsenoPhoto')); break;
                        case 11: appService.OpenInNewTab(getReportUrl('Report/GetCjenik')); break;
                        case 12: appService.OpenInNewTab(getReportUrl('Report/GetIzvrsenoDnevno')); break;
                        case 13: appService.OpenInNewTab(getReportUrl('Report/GetIndeksRealizacije')); break;
                        case 14: appService.OpenInNewTab(getReportUrl('Report/GetKolicine')); break;
                    }
                },
                function (error) {
                    var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("INTERNA_POGRESKA_SERVERA") + "</em>";
                    if (error.data && error.data.ExceptionMessage) {
                        message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
                    }
                    Flash.create('danger', message, 'fixed-message');
                });
            }
        }
    }
})();