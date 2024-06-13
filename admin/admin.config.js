(function () {
    angular
        .module('zp.admin')
        .config(['$routeProvider',
        function ($routeProvider) {
            var apiRootUrl = $("#linkApiRoot").attr("href");

            //apiRootUrl = apiRoot;
            $routeProvider
                .when('/admin/registers/lokacije', {
                    templateUrl: apiRootUrl + 'app/admin/lokacije.html',
                    controller: 'adminRegisterLokacijeController',
                    controllerAs: 'registerCtrl'
                }).
                when('/admin/registers/mjerne_jedinice', {
                    templateUrl: apiRootUrl + 'app/admin/mjerne_jedinice.html',
                    controller: 'adminRegisterMjerneJedniniceController',
                    controllerAs: 'registerCtrl'
                })
                .when('/admin/registers/standardne_aktivnosti', {
                    templateUrl: apiRootUrl + 'app/admin/standardne_aktivnosti.html',
                    controller: 'adminRegisterStandardneAktivnostiController',
                    controllerAs: 'registerCtrl'
                })
                .when('/admin/registers/tipovi', {
                    templateUrl: apiRootUrl + 'app/admin/tipovi.html',
                    controller: 'adminRegisterTipoviController',
                    controllerAs: 'registerCtrl'
                })
                .when('/admin/registers/vrste', {
                    templateUrl: apiRootUrl + 'app/admin/vrste.html',
                    controller: 'adminRegisterVrsteController',
                    controllerAs: 'registerCtrl'
                }).
                when('/admin/registers/lokacije/add', {
                    templateUrl: apiRootUrl + 'app/admin/lokacije_add.html',
                    controller: 'adminRegisterAddLokacijeController',
                    controllerAs: 'registerCtrl'
                }).
                when('/admin/registers/mjerne_jedinice/add', {
                    templateUrl: apiRootUrl + 'app/admin/mjerne_jedinice_add.html',
                    controller: 'adminRegisterAddMjerneJedniniceController',
                    controllerAs: 'registerCtrl'
                })
                .when('/admin/registers/standardne_aktivnosti/add', {
                    templateUrl: apiRootUrl + 'app/admin/standardne_aktivnosti_add.html',
                    controller: 'adminRegisterAddStandardneAktivnostiController',
                    controllerAs: 'registerCtrl'
                })
                .when('/admin/registers/tipovi/add', {
                    templateUrl: apiRootUrl + 'app/admin/tipovi_add.html',
                    controller: 'adminRegisterAddTipoviController',
                    controllerAs: 'registerCtrl'
                })
                .when('/admin/registers/vrste/add', {
                    templateUrl: apiRootUrl + 'app/admin/vrste_add.html',
                    controller: 'adminRegisterAddVrsteController',
                    controllerAs: 'registerCtrl'
                })
                .when('/admin/registers/lokacije/edit/:id', {
                    templateUrl: apiRootUrl + 'app/admin/lokacije_edit.html',
                    controller: 'adminRegisterEditLokacijeController',
                    controllerAs: 'registerCtrl'
                }).
                when('/admin/registers/mjerne_jedinice/edit/:id', {
                    templateUrl: apiRootUrl + 'app/admin/mjerne_jedinice_edit.html',
                    controller: 'adminRegisterEditMjerneJedniniceController',
                    controllerAs: 'registerCtrl'
                })
                .when('/admin/registers/standardne_aktivnosti/edit/:id', {
                    templateUrl: apiRootUrl + 'app/admin/standardne_aktivnosti_edit.html',
                    controller: 'adminRegisterEditStandardneAktivnostiController',
                    controllerAs: 'registerCtrl'
                })
                .when('/admin/registers/tipovi/edit/:id', {
                    templateUrl: apiRootUrl + 'app/admin/tipovi_edit.html',
                    controller: 'adminRegisterEditTipoviController',
                    controllerAs: 'registerCtrl'
                })
                .when('/admin/registers/vrste/edit/:id', {
                    templateUrl: apiRootUrl + 'app/admin/vrste_edit.html',
                    controller: 'adminRegisterEditVrsteController',
                    controllerAs: 'registerCtrl'
                })
                .when('/admin/cjenik', {
                    templateUrl: apiRootUrl + 'app/admin/cjenik.html',
                    controller: 'adminCjenikController',
                    controllerAs: 'cjenikCtrl'
                })
                .when('/admin/cjenik/:id', {
                    templateUrl: apiRootUrl + 'app/admin/cjenik.html',
                    controller: 'adminCjenikController',
                    controllerAs: 'cjenikCtrl'
                })
                .when('/admin/cjenici', {
                    templateUrl: apiRootUrl + 'app/admin/cjenici.html',
                    controller: 'adminCjeniciController',
                    controllerAs: 'cjenikCtrl'
                })
                .when('/admin/dodajCjenik', {
                    templateUrl: apiRootUrl + 'app/admin/cjenik.html',
                    controller: 'adminDodajCjenikController',
                    controllerAs: 'cjenikCtrl'
                })
                .when('/admin/kolicine', {
                    templateUrl: apiRootUrl + 'app/admin/kolicine.html',
                    controller: 'adminKolicineController',
                    controllerAs: 'registerCtrl'
                })
                .when('/admin/kolicine/:id', {
                    templateUrl: apiRootUrl + 'app/admin/kolicine.html',
                    controller: 'adminKolicineController',
                    controllerAs: 'registerCtrl'
                })
                .when('/admin/problemi', {
                    templateUrl: apiRootUrl + 'app/admin/problemi.html',
                    controller: 'adminProblemiController',
                    controllerAs: 'adminCtrl'
                })
                .when('/admin/problem/:id', {
                    templateUrl: apiRootUrl + 'app/admin/problem.html',
                    controller: 'adminProblemController',
                    controllerAs: 'adminCtrl'
                }).
                when('/admin/postavke', {
                    templateUrl: apiRootUrl + 'app/admin/postavke.html',
                    controller: 'adminPostavkeController',
                    controllerAs: 'registerCtrl'
                }).
                when('/admin/postavka/edit/:id', {
                    templateUrl: apiRootUrl + 'app/admin/postavke_edit.html',
                    controller: 'adminPostavkeEditController',
                    controllerAs: 'registerCtrl'
                }).
                when('/admin/postavke/add', {
                    templateUrl: apiRootUrl + 'app/admin/postavke_add.html',
                    controller: 'adminPostavkeAddController',
                    controllerAs: 'registerCtrl'
                }).
                when('/admin/korisnici/add', {
                    templateUrl: apiRootUrl + 'app/admin/korisnik_kreiraj.html',
                    controller: 'adminKreirajKorisnikaController',
                    controllerAs: 'korisnikCtrl'
                })
                .when('/admin/registers/grupa_lokacije/edit/:id', {
                    templateUrl: apiRootUrl + 'app/admin/grupa_lokacije_edit.html',
                    controller: 'adminRegisterEditGrupaLokacijeController',
                    controllerAs: 'registerCtrl'
                })
                .when('/admin/registers/grupa_lokacije/add', {
                    templateUrl: apiRootUrl + 'app/admin/grupa_lokacije_add.html',
                    controller: 'adminRegisterAddGrupaLokacijeController',
                    controllerAs: 'registerCtrl'
                })
                .when('/admin/registers/grupa_lokacije', {
                    templateUrl: apiRootUrl + 'app/admin/grupa_lokacije.html',
                    controller: 'adminRegisterGrupaLokacijeController',
                    controllerAs: 'registerCtrl'
                })
                .when('/admin/resource/edit/:id', {
                    templateUrl: apiRootUrl + 'app/admin/resource_edit.html',
                    controller: 'adminResourceEditController',
                    controllerAs: 'registerCtrl'
                })
                .when('/admin/resource/add', {
                    templateUrl: apiRootUrl + 'app/admin/resource_add.html',
                    controller: 'adminResourceAddController',
                    controllerAs: 'registerCtrl'
                })
                .when('/admin/resource', {
                    templateUrl: apiRootUrl + 'app/admin/resource.html',
                    controller: 'adminResourceController',
                    controllerAs: 'registerCtrl'
                })
                .when('/admin/klijenti', {
                    templateUrl: apiRootUrl + 'app/admin/klijenti.html',
                    controller: 'adminKlijentiController',
                    controllerAs: 'registerCtrl'
                })
                .when('/admin/klijent/add', {
                    templateUrl: apiRootUrl + 'app/admin/klijent_add.html',
                    controller: 'adminAddKlijentController',
                    controllerAs: 'registerCtrl'
                })
                .when('/admin/korisnici', {
                    templateUrl: apiRootUrl + 'app/admin/korisnici.html',
                    controller: 'adminKorisniciController',
                    controllerAs: 'korisniciCtrl'
                })
                .when('/admin/korisnici/:id', {
                    templateUrl: apiRootUrl + 'app/admin/korisnik.html',
                    controller: 'adminKorisnikController',
                    controllerAs: 'korisnikCtrl'
                })
                .when('/admin/klijent/edit/:id', {
                    templateUrl: apiRootUrl + 'app/admin/klijent_edit.html',
                    controller: 'adminEditKlijentController',
                    controllerAs: 'registerCtrl'
                })
                .when('/admin/naselja', {
                    templateUrl: apiRootUrl + 'app/admin/naselja.html',
                    controller: 'adminNaseljeController',
                    controllerAs: 'registerCtrl'
                })
                .when('/admin/naselje/add', {
                    templateUrl: apiRootUrl + 'app/admin/naselje_add.html',
                    controller: 'adminNaseljeAddController',
                    controllerAs: 'registerCtrl'
                })
                .when('/admin/naselje/edit/:id', {
                    templateUrl: apiRootUrl + 'app/admin/naselje_edit.html',
                    controller: 'adminNaseljeEditController',
                    controllerAs: 'registerCtrl'
                });
        }]);
})();