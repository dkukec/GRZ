(function () {
    angular
        .module('zp.admin')
        .controller("adminCjenikController", [
            '$location', '$routeParams', '$filter', 'appService', 'adminDataService', 'Flash', 'NgTableParams', adminController]);

    function adminController($location, $routeParams, $filter, appService, adminDataService, Flash, NgTableParams) {
        appService.enableChangeNotification();
        var vm = this;
        vm.klijentId = appService.getKlijentId();
        // vm.Stavke = null;
        vm.Id = null;
        vm.CjenikId = null;
        vm.DatumOd = null;
        vm.DatumDo = null;
        vm.Pdv = null;
        vm.save = save;
        vm.jedinicnaCijenaChange = jedinicnaCijenaChange;
        vm.changeVrijemeOd = changeVrijemeOd;
        vm.changeVrijemeDo = changeVrijemeDo;
        vm.applyFilter = applyFilter;
        vm.filter = false;

        init();

        vm.cols = [{
            field: "Tip",
            title: "Tip",
            sortable: "Tip",
            show: false,
            groupable: "Tip"
        }, {
            field: "Aktivnost",
            title: "Naziv aktivnosti",
            sortable: "Aktivnost",
            show: true,
            filter: { 'Aktivnost': 'text' }
        }, {
            field: "JedinicnaCijena",
            title: "Cijena",
            sortable: "JedinicnaCijena",
            filter: { 'JedinicnaCijena': 'text' },
            show: true,
        },
        {
            field: "MjernaJedinica",
            title: "",
            show: true,
        }];

        vm.tableParams = new NgTableParams({
            group: {
                Tip: "asc"
            },
        }, {
            dataset: [], // vm.getAktivnosti(),
            counts: [], // Disable pagination
        });

        function init() {
            if ($routeParams.id) {
                adminDataService.getCjenik(vm.klijentId, $routeParams.id).then(loadCompleted, loadFailed);
            }
            else {
                adminDataService.getAktualniCjenik(vm.klijentId).then(loadCompleted, loadFailed);
            }
        }

        function jedinicnaCijenaChange(item) {
            if (item.Status == 0) item.Status = 2;
        }

        function save() {
            adminDataService.saveCjenik(vm.klijentId, { Id: vm.Id, VrijediOd:vm.DatumOd, VrijediDo: vm.DatumDo, CjenikId:vm.CjenikId, Pdv: vm.Pdv, Stavke: vm.Stavke }).then(saveCompleted, saveFailed);
        }

        function loadCompleted(data) {
            
            vm.Stavke = data.Stavke;
            for (var i in vm.Stavke) {
                vm.Stavke[i].JedinicnaCijena = $filter("number")(vm.Stavke[i].JedinicnaCijena, 2);
            }
            vm.tableParams.settings({
                dataset: vm.Stavke,
            });
            
            vm.CjenikId = data.Id;
            vm.DatumOd = new Date(data.VrijediOd);
            vm.DatumDo = new Date(data.VrijediDo);
            vm.Pdv = data.Pdv;
            vm.Id = data.Id;
        }

        function applyFilter() {
            if (vm.filter) {
                var data = [];
                for (index in vm.Stavke) {
                    if (vm.Stavke[index].JedinicnaCijena == 0 || vm.Stavke[index].JedinicnaCijena == "0,00") {
                        data.push(vm.Stavke[index]);
                    }
                }
                vm.tableParams.settings({
                    dataset: data,
                });
            }
            else {
                vm.tableParams.settings({
                    dataset: vm.Stavke,
                });
            }
        }

        function loadFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("INTERNA_POGRESKA_SERVERA") + "</em>";
            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }
            Flash.create('danger', message, 'fixed-message');
        }

        function saveFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("ERROR_DODAJ_PODATAK") + "</em>";
            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }
            Flash.create('danger', message, 'fixed-message');
            vm.List = [];
        }

        function saveCompleted() {
            var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("SPREMANJE_USPJESNO") + "</em>";
            Flash.create('info', message, 'fixed-message');
        }

        function changeVrijemeOd() {
            if (vm.DatumOd !== undefined) {
                var date = vm.DatumOd.split(".");
                vm.DatumOd = new Date(date[2] + "-" + date[1] + "-" + date[0]);
            }
        }

        function changeVrijemeDo() {
            if (vm.DatumDo !== undefined) {
                var date = vm.DatumDo.split(".");
                vm.DatumDo = new Date(date[2] + "-" + date[1] + "-" + date[0]);
            }
        }
    }
})();