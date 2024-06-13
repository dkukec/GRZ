(function () {
    angular
    .module('zp.reports')
    .controller("UsporedbaController", ['appService', 'reportsDataService', '$routeParams', rekapitulacija]);

    function rekapitulacija(appService, reportsDataService, $routeParams) {
        var vm = this;
        
        vm.Data = null;
        vm.title = 'Reports';
        vm.PdfReport = PdfReport;

        getData();
        function getData() {
            return reportsDataService.getUsporedbaReports($routeParams.lokacijaId, $routeParams.godina).then(function (data) {
                vm.Data = data;
            });
        }


        function PdfReport() {
            return reportsDataService.getUsporedbaPdfReport($routeParams.lokacijaId, $routeParams.godina).then(function (data) {
                vm.PDFPodaci = data;
            });
        }
    }
})();