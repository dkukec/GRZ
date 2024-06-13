(function () {
    angular
        .module('zp.dashboard')
        .controller("DashboardController",
        ['$location', '$scope', '$routeParams', 'appService', 'planDataService', 'realizacijaDataService', 'Flash', 'NgTableParams', '$filter', dashboardController]);

    function dashboardController($location, $scope, $routeParams, appService, planDataService, realizacijaDataService, Flash, NgTableParams, $filter) {
        var vm = this;
        vm.klijentId = appService.getKlijentId();
        vm.urlBase = appService.apiRootUrl;
        vm.kalendari = [];
        vm.godine = [];
        vm.godina = null;
        vm.getLinkRealizacija = getLinkRealizacija;
        vm.godinaOnChange = godinaOnChange;
        vm.getClass = getClass;
        vm.trenutniMjesec = trenutniMjesec;
        vm.prethodniMjesec = prethodniMjesec;
        vm.slijedeciMjesec = slijedeciMjesec;
        vm.Trenutni = null;
        vm.getAktivnosti = getAktivnostiList;
        vm.dateFrom = null;
        vm.data = null;
        vm.GetNaselja = GetNaselja;
        vm.GetLokacije = GetLokacije;
        vm.changeDsNaselje = changeDsNaselje;
        vm.Naselje = null;
        vm.Loading = 0;

        $scope.SelectedDate = {};

        var datum = new Date($filter('date')(new Date(), "yyyy"));
        vm.godina = datum.getFullYear();
        refreshData();

        function GetNaselja() {
            return vm.data.Naselja || [];
        }

        function GetLokacije() {
            selectLokacija();
            return vm.Naselje.Lokacije;
        }

        function changeDsNaselje() {
            vm.Lokacija = null;
            vm.Lokacija = selectLokacija();
            vm.changeDs();
        }

        function getNaselje() {
            if (vm.Naselje) {
                return vm.Naselje;
            }
            vm.Naselje = GetNaselja()[0];
            return vm.Naselje;
        }

        function trenutniMjesec() {
            return new Date().getMonth();
        }

        function prethodniMjesec(numMonth) {
            if (numMonth === undefined) numMonth = 1;
            return new Date().getMonth() - numMonth;
        }

        function slijedeciMjesec() {
            return new Date().getMonth() + 1;
        }

        function godinaOnChange() {
            var datum = new Date(vm.Trenutni.Datum);
            datum.setYear(datum.getFullYear() + 1);
            $location.path('/list/year/' + $filter('date')(datum, "yyyy"));
        }

        function getKalendarCompleted(data) {
            for (var index in data.Kalendari) {
                data.Kalendari[index].index = index;
                data.Kalendari[index].initDate = new Date(data.Kalendari[index].initDate);
                data.Kalendari[index].maxDate = new Date(data.Kalendari[index].maxDate);
                data.Kalendari[index].minDate = new Date(data.Kalendari[index].minDate);
                data.Kalendari[index].selected = new Date();
            }


            vm.kalendari = data.Kalendari;



            for (var i in data.Kalendari) {
                $scope.$watch('SelectedDate[' + i + ']', setDate, true);
            }

            vm.godine = data.Godine;
            vm.Trenutni = data.Trenutni;

            var dateFrom = new Date(new Date(vm.Trenutni.Datum).getFullYear(), new Date(vm.Trenutni.Datum).getMonth(), 1);
            vm.dateFrom = dateFrom;

            if (vm.Trenutni.Plan.Id > 0) {
                vm.Loading++;
                realizacijaDataService.getRealizirano(vm.Trenutni.Plan.Id, $filter('date')(dateFrom, "yyyy-MM-dd"), $filter('date')(vm.Trenutni.Datum, "yyyy-MM-dd")).then(getRealizacijaCompleted, getRealizacijaFailed);
            }
            vm.Loading--;
        }

        function getKalendarFailed(error) {
            if (error.status === -1) {
                return;
            }
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("INTERNA_POGRESKA_SERVERA") + "</em>";
            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }
            Flash.create('danger', message, 'fixed-message');
        }

        function refreshData() {
            vm.Loading++;
            planDataService.getKalendarDashboard(vm.klijentId, vm.godina).then(getKalendarCompleted, getKalendarFailed);
        }

        function setDate(date) {
            if (date !== undefined) {
                vm.Trenutni.Datum = date;
                if (getLinkRealizacija()) {
                    window.location.href = getLinkRealizacija();
                }
                // $location.path('/list/year/' + $filter('date')(date, "yyyy"));

            }
        }

        function LoadForYear(year) {
            vm.Loading++;
            planDataService.getForYear(vm.klijentId, year).then(getForDateCompleted, getKalendarFailed);
        }

        function getForDateCompleted(data) {
            vm.Trenutni = data;
            vm.Loading--;
        }

        function getLinkRealizacija() {
            if (vm.Trenutni === null) return;
            return vm.urlBase +
                "realizacija/#/realizacija/pregled/" +
                vm.Trenutni.Plan.Id + "/" +
                $filter('date')(vm.Trenutni.Datum, "yyyy-MM-dd");
        }

        function getSelectedDate() {
            for (var i in $scope.SelectedDate) {
                return $scope.SelectedDate[i];
            }
        }


        function getClass(date, mode) {
            if (mode == 'day') {
                var month = date.getMonth();
                var key = $filter('date')(date, "yyyy-MM-dd");
                if (key == $filter('date')(new Date(), "yyyy-MM-dd")) {
                    return "today " + vm.kalendari[month].Classes[key];
                }
                if (date > new Date()) {
                    return "future " + vm.kalendari[month].Classes[key];
                }
                return vm.kalendari[month].Classes[key];
            }

        }



        /// Realizacija

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
            // filter: { 'Naziv': 'text' }
        }, {
            field: "Kolicina",
            title: "Količina",
            sortable: "Kolicina",
            show: true,
        }, {
            field: "Datum",
            title: "Realizirano",
            sortable: "Datum",
            show: true
        }];

        vm.tableParams = new NgTableParams({
            group: {
                Tip: "asc"
            },
        }, {
            dataset: [], // vm.getAktivnosti(),
        });

        function selectLokacija() {
            if (vm.Lokacija) {
                return vm.Lokacija;
            }
            vm.Lokacija = getNaselje().Lokacije[0];
            return vm.Lokacija;
        }

        function getAktivnostiList() {
            var selectedLoc = selectLokacija();
            if (selectedLoc !== undefined) {
                return selectedLoc.Aktivnosti;
            }
        }

        function getRealizacijaCompleted(data) {
            vm.data = data;
            var naselja = {};
            var orderBy = $filter('orderBy');
            for (var index in vm.data.Lokacije) {
                var lokacija = vm.data.Lokacije[index];
                if (!naselja[lokacija.Naselje.Id]) {
                    naselja[lokacija.Naselje.Id] = lokacija.Naselje;
                    naselja[lokacija.Naselje.Id].Lokacije = Array();
                }
                naselja[lokacija.Naselje.Id].Lokacije.push(lokacija);
            }
            vm.naselja = naselja;
            vm.data.Naselja = Array();
            for (var index in naselja) {
                var lokacije = orderBy(naselja[index].Lokacije, 'Naziv');
                vm.data.Naselja.push({ Id: naselja[index].Id, Naziv: naselja[index].Naziv, Lokacije: lokacije });
            }
            vm.data.Naselja = orderBy(vm.data.Naselja, 'Naziv');
            selectLokacija();
            vm.changeDs();
            vm.Loading--;
        }

        function getRealizacijaFailed(error) {
            if (error.status === -1) {
                return;
            }
            if (error.status == 401) window.location.reload();
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

        vm.changeDs = function () {
            vm.tableParams.settings({
                dataset: vm.getAktivnosti(),
                counts: [] // Disable pagination
            });
        };
    }
})();