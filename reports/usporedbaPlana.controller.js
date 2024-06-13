(function () {
    angular
    .module('zp.reports')
    .controller("UsporedbaPlanaController", ['appService', 'reportsDataService', '$routeParams', usporedbaPlanaController]);

    function usporedbaPlanaController(appService, reportsDataService, $routeParams) {
        var vm = this;
        //variable=(vrsta.MjernaJedinicaNaziv =='metar kvadratni' ? 'm2' 'kom')
        vm.klijentId = appService.getKlijentId();

        vm.IzvjestajId = 1;
        vm.PeriodId = '';
        vm.LokacijaId = '';
        vm.PlanId = '';

        MjestoId = [];
        MjestoNaziv = [];
        TipId = [];
        TipNaziv = [];
        DatumIzvrsenja = [];
        StandardnaAktivnostId = [];
        StandardnaAktivnostNaziv = [];
        UkupnaPlaniranaKolicina = [];
        UkupnaPlaniranaCijena = [];
        UkupnaIzvrsenaKolicina = [];
        UkupnaIzvrsenaCijena = [];

        vm.Podaci = [];
        vm.Info = '';
        vm.PDFPodaci = '';
        vm.Klijent = '';
        vm.Revizija = '';

        vm.getUsporedbaPlana = getUsporedbaPlana;
       // vm.getUsporedbaPdfReport = getUsporedbaPdfReport;
        vm.PdfReport = PdfReport;
        vm.getKlijentIRevizija = getKlijentIRevizija;
        vm.title = 'Reports';

        activate();

        function activate() {
            getUsporedbaPlana().then(function () { });
            activeKlijentIRevizija();//****/
        }

        function activeKlijentIRevizija() {
            return getKlijentIRevizija().then(function () {
            });
        }

        function getUsporedbaPlana() {
            return reportsDataService.getUsporedbaPlanaReports().then(function (data) {
                vm.Podaci = data;
                suma();
            });
        }

        function PdfReport() {
            return reportsDataService.getUsporedbaPdfReport().then(function (data) {
                vm.PDFPodaci = data;

            });
        }

        function getKlijentIRevizija() {
            return reportsDataService.getKlijentIRevizija().then(function (data) {
                vm.Klijent = data.KlijentNaziv;
                vm.Revizija = data.Revizija;
            });
        }

        function suma() {
            for (var mjestoIndex in vm.Podaci) {
                vm.Podaci[mjestoIndex].totalMjestoPlaniranaCijena = 0;
                vm.Podaci[mjestoIndex].totalMjestoIzvrsenaCijena = 0;
                for (var tipIndex in vm.Podaci[mjestoIndex].Tipovi) {
                    vm.Podaci[mjestoIndex].Tipovi[tipIndex].totalPlaniranaCijena = 0;
                    vm.Podaci[mjestoIndex].Tipovi[tipIndex].totalIzvrsenaCijena = 0;

                    for (var aktivnostIndex in vm.Podaci[mjestoIndex].Tipovi[tipIndex].Aktivnosti) {
                        vm.Podaci[mjestoIndex].Tipovi[tipIndex].totalPlaniranaCijena += parseFloat(vm.Podaci[mjestoIndex].Tipovi[tipIndex].Aktivnosti[aktivnostIndex].UkupnaPlaniranaCijena);
                        vm.Podaci[mjestoIndex].Tipovi[tipIndex].totalIzvrsenaCijena += parseFloat(vm.Podaci[mjestoIndex].Tipovi[tipIndex].Aktivnosti[aktivnostIndex].UkupnaIzvrsenaCijena);
                    }
                    vm.Podaci[mjestoIndex].totalMjestoPlaniranaCijena += parseFloat(vm.Podaci[mjestoIndex].Tipovi[tipIndex].totalPlaniranaCijena);
                    vm.Podaci[mjestoIndex].totalMjestoIzvrsenaCijena += parseFloat(vm.Podaci[mjestoIndex].Tipovi[tipIndex].totalIzvrsenaCijena);

                }
            }
        }
    }


})();