(function () {
    angular
        .module('zp.plan')
        .controller("ListPlanaController", [
            '$location', '$scope', '$routeParams', 'appService', 'planDataService', 'Flash', 'NgTableParams', '$filter', listPlanaController]);

    function listPlanaController($location, $scope, $routeParams, appService, planDataService, Flash, NgTableParams, $filter) {
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
        vm.Trenutni = null;

        $scope.SelectedDate = {};
        
        vm.tableParams = new NgTableParams({
            sorting: { Naziv: "desc" },
            count: 25,
        }, {
            dataset: [],
            counts: [], // Disable pagination
        });

        if ($routeParams.year === undefined) {
            $location.path('/list/year/' + $filter('date')(new Date(), "yyyy"));
        } else {
            var datum = new Date($routeParams.year);
            vm.godina = datum.getFullYear();
            refreshData();
        }

        function trenutniMjesec() {
            return new Date().getMonth();
        }

        function godinaOnChange() {
            $location.path('/list/year/' + vm.godina);
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

            vm.tableParams.settings({
                dataset: vm.Trenutni.Revizije,
            });
        }

        function getKalendarFailed(error) {
            if (error.status == 401) window.location.reload();
            vm.kalendar = [];
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("INTERNA_POGRESKA_SERVERA") + "</em>";
            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }
            Flash.create('danger', message, 'fixed-message');
        }

        function refreshData() {
            planDataService.getKalendar(vm.klijentId, vm.godina).then(getKalendarCompleted, getKalendarFailed);
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
            planDataService.getForYear(vm.klijentId, year).then(getForDateCompleted, getKalendarFailed);
        }
        
        function getForDateCompleted(data) {
            vm.Trenutni = data;
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
    }
})();