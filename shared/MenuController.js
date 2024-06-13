(function () {
    angular
        .module('zp.shared')
        .controller('MenuController', ['$rootScope', 'appService', '$window', menuController]);

    function menuController($rootScope, appService, $window) {
        var vm = this;
        vm.korisnik = null;
        vm.administrator = false;
        vm.klijenti = [];
        vm.odaberiKlijent = odaberiKlijent;
        vm.trenutniKlijentNaziv = "";
        vm.odabraniKlijent = null;

        loadKorisnik();        

        function loadKorisnik() {
            appService.getKorisnik().then(loadKorisnikCompleted,loadKorisnikFailed);
        }

        function loadKorisnikCompleted(response) {
            vm.korisnik = response.data;
            vm.administrator = vm.korisnik.Administrator;
            vm.trenutniKlijentNaziv = vm.korisnik.KlijentNaziv;
            loadKlijenti(vm.korisnik.Id);
        }

        function loadKorisnikFailed(response) {
            
        }        

        function loadKlijenti(korisnikId) {
            appService.getKlijentiByKorisnik(korisnikId).then(loadKlijentiCompleted, loadKlijentiFailed);

            function loadKlijentiCompleted(data) {
                vm.klijenti = data;
            }

            function loadKlijentiFailed(response) {

            }
        }

        function odaberiKlijent(klijent) {
            vm.odabraniKlijent = klijent; // spremam klijenta da ne moram ponovno pozvati web API
            appService.selectKlijent(klijent.Id).then(selectKlijentCompleted, selectKlijentFailed);

            function selectKlijentCompleted(response) {
                vm.trenutniKlijentNaziv = vm.odabraniKlijent.Naziv;
                var apiRootUrl = $("#linkApiRoot").attr("href");
                if (window.location.pathname == apiRootUrl + "Quercus/") {
                    window.location.reload();
                }
                else {
                    $window.location = apiRootUrl + "Quercus/#/dashboard";
                }
            }

            function selectKlijentFailed(response) {

            }
        }

        function cleanUpPage() {
            $rootScope.lastCall = new Date();
        }

        $rootScope.$on('$locationChangeStart', function (event) {
            if (appService.isPageDirty()) {
                var answer = confirm("Imate nespremljene stavke, želite li napustiti stranicu?");
                if (!answer) {
                    cleanUpPage();
                    event.preventDefault();
                }
                else {
                    cleanUpPage();
                }
            }
        });


        window.onbeforeunload = function (event) {
            if (appService.isPageDirty()) {
                return "Imate nespremljene stavke, želite li napustiti stranicu?";
            }
            else {
                // event.preventDefault();
                // return null;
            }
            
        };
    }
})();