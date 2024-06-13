(function () {
	angular
    .module('zp.reports')
    .controller("PDFController", ['$location', 'appService', 'reportsDataService', '$routeParams', pdfReportController]);

	function pdfReportController($location, appService, reportsDataService, $routeParams) {
		var vm = this;


		vm.KlijentId = appService.getKlijentId();

		vm.IzvjestajId = 1;
		vm.PeriodId = '';
		vm.LokacijaId = '';
		vm.PlanId = '';

		vm.MoguceVrijednostiReport = [];
		vm.MoguciVremenskiPeriod = [];

		vm.VrijemeOd = '';
		vm.VrijemeDo = '';


		vm.TipId = [];

		vm.Podaci = [];
		vm.getPDF = getPDF;
		vm.title = 'PDF';

		getPDF();

		
		function getPDF() {
			var izvjestajId = $routeParams.IzvjestajId;
			var lokacijaId = $routeParams.LokacijaId;
			var periodId = $routeParams.PeriodId;
			var planId = $routeParams.PlanId;
			var vrijemeDo = new Date($routeParams.VrijemeDo);
			var vrijemeOd = new Date($routeParams.VrijemeOd);
			var klijentId = $routeParams.KlijentId;
			 
			
			reportsDataService.send(izvjestajId, periodId, lokacijaId, vrijemeDo, vrijemeOd, planId, klijentId);
			//.then(sendCompleted, sendFailed);
			if (parseInt(izvjestajId) == 2) {
				$location.path('/reportTroskovnik');
				//console.log(izvjestajId);
				return;
			}
			else {
				$location.path('/reportPlana');
				//console.log(izvjestajId);
				return;
			}

		}

	}


})();