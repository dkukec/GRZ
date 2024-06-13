(function () {
    angular
        .module('zp.realizacija')
        .controller("RealizacijaOdabirController",[
            'appService', 'realizacijaDataService', '$routeParams', 'Flash', 'NgTableParams', '$filter', realizacijaOdabirController]);

    function realizacijaOdabirController(appService, realizacijaDataService, $routeParams, Flash, NgTableParams, $filter) {
        var vm = {};
        vm.DataList = null;
        vm.OnemoguciNovi = null;
        vm.Godina = null;
        vm.Revizija = null;
        vm.PlanId = null;
        vm.Data = null;
        vm.RootUrl = appService.apiRootUrl;

        vm.cols = [{
            field: "Datum",
            title: "Datum",
            sortable: "Datum",
            show: true
        }, {
            field: "Akcije",
            title: "Akcije",
            show: true
        }];

        vm.tableParams = new NgTableParams({
            sorting: { datum2: "desc" }
        }, {
            dataset: [],
        });


        if ($routeParams.planId === undefined) {
            // Exception or default value
        } else {
            // Load selected data
            vm.PlanId = $routeParams.planId;
            realizacijaDataService.getRealizacijaOdabir($routeParams.planId).then(getRealizacijaCompleted, getRealizacijaFailed);
            
            
            /*
            vm.tableParams.reload();
            */
        }

        function getRealizacijaCompleted(data) {
            vm.DataList = [];
            data.ListData.forEach(function (item) {
                vm.DataList.push({
                    datum: $filter('date')(item, "dd.MM.yyyy"),
                    datum2: $filter('date')(item, "yyyy-MM-dd"),
                }); // for conversion to string);

            });
            vm.OnemoguciNovi = data.OnemoguciNovi;
            vm.Godina = data.Godina;
            vm.Revizija = data.Revizija;
            vm.tableParams.settings({
                dataset: vm.DataList,
                counts: [] // Disable pagination
            });
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
    }
})();