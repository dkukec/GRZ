(function () {
    angular
    .module('zp.reports')
    .controller("TroskovnikIRacunController", ['appService', 'reportsDataService', '$routeParams', troskovnikController]);

    function troskovnikController(appService, reportsDataService, $routeParams) {
        var vm = this;
        vm.UkupniIznosZaSveLokacije = 0;
        vm.UkupniPDVZaSveLokacije =0;
        vm.Svekupno = 0;
        vm.NazivKlijenta = '';

        vm.KlijentId = appService.getKlijentId();

        vm.IzvjestajId = 1;
        vm.PeriodId = '';
        vm.LokacijaId = '';
        vm.PlanId = '';

        vm.MoguceVrijednostiReport = [];
        vm.MoguciVremenskiPeriod = [];

        vm.VrijemeOd = '';
        vm.VrijemeDo = '';

        vm.Mjesto = [];
        vm.TipId = [];
        vm.Iznos = [];
        vm.PDV = [];
        vm.Ukupno = [];
        vm.Vrsta = [];

        vm.Podaci = [];
        vm.PDFPodaci = [];

        vm.getTroskovnikR = getTroskovnikR;
        vm.PdfReport = PdfReport;
        vm.title = 'Reports';

        activate();

        function activate() {
            return getTroskovnikR().then(function () {
                //logger.info('Activated Reports View');
            });
        }
       
        function getTroskovnikR() {
            return reportsDataService.getTroskovnikReports().then(function (data) {
                vm.Podaci = data.Sve;
                vm.UkupniIznosZaSveLokacije = data.UkupniIznosZaSveLokacije;
                vm.UkupniPDVZaSveLokacije = data.UkupniPDVZaSveLokacije;
                vm.Svekupno = data.Svekupno;
                vm.VrijemeOd = data.VrijemeOd;
                vm.VrijemeDo = data.VrijemeDo;
                vm.NazivKlijenta = data.NazivKlijenta;
               
            });
        }


        function PdfReport() {
            return reportsDataService.getTroskovnikPDFReports().then(function (data) {
                vm.PDFPodaci = data;


            });
        }
    }


})();