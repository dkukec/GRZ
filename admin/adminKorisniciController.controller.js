(function () {
    angular
        .module('zp.admin')
        .controller('adminKorisniciController', ['appService', 'adminDataService', 'Flash', 'NgTableParams', adminKorisniciController]);

    function adminKorisniciController(appService, adminDataService, Flash, NgTableParams) {
        var vm = this;
        vm.tableParams = new NgTableParams({}, { dataset: [] });
        adminDataService.getKorisnici().then(getKorisniciCompleted, getKorisniciFailed);

        function getKorisniciCompleted(data) {
            data.forEach(function (element, index, array) {
                if (element.Administrator)
                    element.jeAdmin = "Da";
                else
                    element.jeAdmin = "Ne";

                if (element.SamoIzvjestaji)
                    element.samoIzvjestaji = "Da";
                else
                    element.samoIzvjestaji = "Ne";
            });

            vm.tableParams.settings({
                dataset: data
            });
        }

        function getKorisniciFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("INTERNA_POGRESKA_SERVERA") + "</em>";
            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }
            Flash.create('danger', message, 'fixed-message');
        }
    }
})();