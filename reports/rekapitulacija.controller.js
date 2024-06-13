(function () {
    angular
    .module('zp.reports')
    .controller("RekapitulacijaController", ['appService', 'reportsDataService', '$routeParams', rekapitulacija]);

    function rekapitulacija(appService, reportsDataService, $routeParams) {
        var vm = this;
        vm.Data = null;
        vm.title = 'Reports';
        vm.PdfReport = PdfReport;

        getData();

        function getData() {
            return reportsDataService.getRekapitulacijaReports($routeParams.lokacijaId, $routeParams.periodOd, $routeParams.periodDo).then(function (data) {
                vm.Data = data;
            });
        }

        function PdfReport() {
            reportsDataService.getRekapitulacijaPDF($routeParams.lokacijaId, $routeParams.periodOd, $routeParams.periodDo);
        }
    }
})();