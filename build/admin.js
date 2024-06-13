(function () {
    angular.module('zp.admin', ['ngRoute', 'ngCookies', 'zp', 'datePicker', 'zp.shared', "ngTable", "ui.bootstrap"]);
})();
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
(function () {
    angular
        .module('zp.admin')
        .factory('adminDataService', ['$http', 'apiRoot', function ($http, apiRoot) {

            var service = {
                getLokacije: getLokacije,
                getMjerneJedninice: getMjerneJedninice,
                getStandardneAktivnosti: getStandardneAktivnosti,
                getTipovi: getTipovi,
                getVrste: getVrste,
                getVrsteSync: getVrsteSync,
                getPostavke: getPostavke,
                getLokacija: getLokacija,
                getMjernaJedninica: getMjernaJedninica,
                getStandardnaAktivnost: getStandardnaAktivnost,
                getTip: getTip,
                getVrsta: getVrsta,
                getPostavka: getPostavka,
                getAktualniCjenik: getAktualniCjenik,
                getNoviCjenik: getNoviCjenik,
                getCjenik: getCjenik,
                getCjenici: getCjenici,
                getKolicine: getKolicine,
                getProblemi: getProblemi,
                getProblem: getProblem,
                getGrupaLokacije: getGrupaLokacije,
                getGrupaLokacija: getGrupaLokacija,
                getResources: getResources,
                getResource: getResource,
                getKlijenti: getKlijenti,
                getKlijent: getKlijent,
                getKorisnici: getKorisnici,
                getKorisnik: getKorisnik,
                updateGrupaLokacija: updateGrupaLokacija,
                getNaselja: getNaselja,
                getNaselje: getNaselje,
                getGrupeKlijenata: getGrupeKlijenata,

                addLokacija: addLokacija,
                addMjernaJedninica: addMjernaJedninica,
                addStandardnaAktivnost: addStandardnaAktivnost,
                addTip: addTip,
                addVrsta: addVrsta,
                addPostavka: addPostavka,
                addCjenik: addCjenik,
                addGrupaLokacija: addGrupaLokacija,
                addResource: addResource,
                addKlijent: addKlijent,
                addNaselje: addNaselje,

                arhivirajStandardnuAktivnost: arhivirajStandardnuAktivnost,

                updateLokacija: updateLokacija,
                updateMjernaJedninica: updateMjernaJedninica,
                updateStandardnaAktivnost: updateStandardnaAktivnost,
                updateTip: updateTip,
                updateVrsta: updateVrsta,
                updatePostavka: updatePostavka,
                updateResource: updateResource,
                updateKlijent: updateKlijent,
                updateNaselje: updateNaselje,
                updateKorisnik: updateKorisnik,
                saveCjenik: saveCjenik,
                saveKolicine: saveKolicine,

                removeLokacija: removeLokacija,
                removeMjernaJedinica: removeMjernaJedinica,
                removeStandardnaAktivnost: removeStandardnaAktivnost,
                removeTip: removeTip,
                removeVrsta: removeVrsta,
                removePostavka: removePostavka,
                removeResource: removeResource,
                removeKlijent: removeKlijent,
                removeNaselje: removeNaselje,
                removeGrupaLokacije: removeGrupaLokacije,
                kreirajKorisnika: kreirajKorisnika,
                selectKlijent: selectKlijent,

                urlBase: apiRoot + 'api/admin/'
            };

            function getLokacije(klijentId) {
                return $http.get(this.urlBase + 'getLokacije', { params: { klijentId: klijentId } }).then(getCompleted);
                function getCompleted(response) {
                    return response.data;
                }
            }

            function getNaselja() {
                return $http.get(this.urlBase + 'getNaselja', {}).then(getCompleted);
                function getCompleted(response) {
                    return response.data;
                }
            }

            function getNaselje(id) {
                return $http.get(this.urlBase + 'getNaselje', { params: { id: id } }).then(getCompleted);
                function getCompleted(response) {
                    return response.data;
                }
            }

            function getLokacija(klijentId, id) {
                return $http.get(this.urlBase + 'getLokacija', { params: { klijentId: klijentId, id: id } }).then(getCompleted);
                function getCompleted(response) {
                    return response.data;
                }
            }

            function getMjerneJedninice(klijentId) {
                return $http.get(this.urlBase + 'getMjerneJedninice', null).then(getCompleted);
                function getCompleted(response) {
                    return response.data;
                }
            }

            function getMjernaJedninica(klijentId, id) {
                return $http.get(this.urlBase + 'getMjernaJedninica', { params: { id: id } }).then(getCompleted);
                function getCompleted(response) {
                    return response.data;
                }
            }

            function getStandardneAktivnosti(klijentId) {
                return $http.get(this.urlBase + 'getStandardneAktivnosti', { params: { klijentId: klijentId } }).then(getCompleted);
                function getCompleted(response) {
                    return response.data;
                }
            }

            function getStandardnaAktivnost(klijentId, id) {
                return $http.get(this.urlBase + 'getStandardnaAktivnost', { params: { klijentId: klijentId, id: id } }).then(getCompleted);
                function getCompleted(response) {
                    return response.data;
                }
            }

            function getTipovi(klijentId) {
                return $http.get(this.urlBase + 'getTipovi', { params: { klijentId: klijentId } }).then(getCompleted);
                function getCompleted(response) {
                    return response.data;
                }
            }

            function getTip(klijentId, id) {
                return $http.get(this.urlBase + 'getTip', { params: { klijentId: klijentId, id: id } }).then(getCompleted);
                function getCompleted(response) {
                    return response.data;
                }
            }

            function getVrste(klijentId) {
                return $http.get(this.urlBase + 'getVrste', { params: { klijentId: klijentId } }).then(getCompleted);
                function getCompleted(response) {
                    return response.data;
                }
            }

            function getVrsteSync(klijentId) {

                if (typeof ActiveXObject == 'undefined') {
                    resource = new XMLHttpRequest();
                }
                else {
                    // IE
                    resource = new ActiveXObject("Microsoft.XMLHTTP");
                }

                resource.open('GET', this.urlBase + 'getVrste?klijentId=' + klijentId, false);
                resource.setRequestHeader("accept", "application / json");
                resource.send(null);

                return angular.fromJson(resource.responseText);
            }

            function getVrsta(klijentId, id) {
                return $http.get(this.urlBase + 'getVrsta', { params: { klijentId: klijentId, id: id } }).then(getCompleted);
                function getCompleted(response) {
                    return response.data;
                }
            }

            function getGrupaLokacije(klijentId) {
                return $http.get(this.urlBase + 'getGrupaLokacije', { params: { klijentId: klijentId } }).then(getCompleted);
                function getCompleted(response) {
                    return response.data;
                }
            }

            function getKlijenti() {
                return $http.get(this.urlBase + 'getKlijenti', {}).then(getCompleted);
                function getCompleted(response) {
                    return response.data;
                }
            }

            function getKlijent(id) {
                return $http.get(this.urlBase + 'getKlijent', { params: { id: id } }).then(getCompleted);
                function getCompleted(response) {
                    return response.data;
                }
            }

            function getGrupaLokacija(klijentId, id) {
                return $http.get(this.urlBase + 'getGrupaLokacija', { params: { klijentId: klijentId, id: id } }).then(getCompleted);
                function getCompleted(response) {
                    return response.data;
                }
            }

            function addKlijent(klijentId, data) {
                return $http.post(this.urlBase + 'addKlijent', null, { params: data }).then(workCompleted);

                function workCompleted(response) {
                    return response.data;
                }
            }

            function addGrupaLokacija(klijentId, data) {
                data.klijentId = klijentId;
                return $http.post(this.urlBase + 'addGrupaLokacija', { klijentId: klijentId }, { params: data }).then(workCompleted);

                function workCompleted(response) {
                    return response.data;
                }
            }

            function addLokacija(klijentId, data) {
                data.klijentId = klijentId;
                return $http.post(this.urlBase + 'addLokacija', { klijentId: klijentId }, { params: data }).then(workCompleted);

                function workCompleted(response) {
                    return response.data;
                }
            }

            function addMjernaJedninica(klijentId, data) {
                data.klijentId = klijentId;
                return $http.post(this.urlBase + 'addMjernaJedninica', { klijentId: klijentId }, { params: data }).then(workCompleted);

                function workCompleted(response) {
                    return response.data;
                }
            }

            function addStandardnaAktivnost(klijentId, data) {
                data.klijentId = klijentId;
                return $http.post(this.urlBase + 'addStandardnaAktivnost', data, {}).then(workCompleted);

                function workCompleted(response) {
                    return response.data;
                }
            }

            function addTip(klijentId, data) {
                data.klijentId = klijentId;
                return $http.post(this.urlBase + 'addTip', {}, { params: data }).then(workCompleted);

                function workCompleted(response) {
                    return response.data;
                }
            }

            function addVrsta(klijentId, data) {
                data.klijentId = klijentId;
                return $http.post(this.urlBase + 'addVrsta', {}, { params: data }).then(workCompleted);

                function workCompleted(response) {
                    return response.data;
                }
            }

            function updateLokacija(klijentId, data) {
                data.klijentId = klijentId;
                return $http.post(this.urlBase + 'updateLokacija', data, { params: data }).then(workCompleted);

                function workCompleted(response) {
                    return response.data;
                }
            }

            function updateKlijent(data) {
                return $http.post(this.urlBase + 'updateKlijent', data, { params: data }).then(workCompleted);

                function workCompleted(response) {
                    return response.data;
                }
            }

            function updateGrupaLokacija(klijentId, data) {
                data.klijentId = klijentId;
                return $http.post(this.urlBase + 'updateGrupaLokacija', data, { params: data }).then(workCompleted);

                function workCompleted(response) {
                    return response.data;
                }
            }

            function updateMjernaJedninica(klijentId, data) {
                data.klijentId = klijentId;
                return $http.post(this.urlBase + 'updateMjernaJedninica', data, { params: data }).then(workCompleted);

                function workCompleted(response) {
                    return response.data;
                }
            }

            function updateStandardnaAktivnost(klijentId, data) {
                data.klijentId = klijentId;
                return $http.post(this.urlBase + 'updateStandardnaAktivnost', data, null).then(workCompleted);

                function workCompleted(response) {
                    return response.data;
                }
            }

            function updateTip(klijentId, data) {
                data.klijentId = klijentId;
                return $http.post(this.urlBase + 'updateTip', data, { params: data }).then(workCompleted);

                function workCompleted(response) {
                    return response.data;
                }
            }

            function updateVrsta(klijentId, data) {
                data.klijentId = klijentId;
                return $http.post(this.urlBase + 'updateVrsta', data, { params: data }).then(workCompleted);

                function workCompleted(response) {
                    return response.data;
                }
            }

            function updateNaselje(id, naziv) {
                return $http.post(this.urlBase + 'updateNaselje', null, { params: { Id: id, Naziv: naziv } }).then(workCompleted);

                function workCompleted(response) {
                    return response.data;
                }
            }

            //remove

            function removeLokacija(klijentId, data) {
                data.klijentId = klijentId;
                return $http.post(this.urlBase + 'removeLokacija', null, { params: { KlijentId: klijentId, Id: data.Id } }).then(workCompleted);

                function workCompleted(response) {
                    return response.data;
                }
            }

            function removeGrupaLokacije(klijentId, data) {
                data.klijentId = klijentId;
                return $http.post(this.urlBase + 'removeGrupaLokacija', null, { params: { KlijentId: klijentId, Id: data.Id } }).then(workCompleted);

                function workCompleted(response) {
                    return response.data;
                }
            }

            function removeKlijent(data) {
                return $http.post(this.urlBase + 'removeKlijent', null, { params: { Id: data.Id } }).then(workCompleted);

                function workCompleted(response) {
                    return response.data;
                }
            }

            function removeNaselje(id) {
                return $http.post(this.urlBase + 'removeNaselje', null, { params: { Id: id } }).then(workCompleted);

                function workCompleted(response) {
                    return response.data;
                }
            }

            function removeMjernaJedinica(klijentId, data) {
                data.klijentId = klijentId;
                return $http.post(this.urlBase + 'removeMjernaJedninica', null, { params: { KlijentId: klijentId, Id: data.Id } }).then(workCompleted);

                function workCompleted(response) {
                    return response.data;
                }
            }

            function removeStandardnaAktivnost(klijentId, data) {
                data.klijentId = klijentId;
                return $http.post(this.urlBase + 'removeStandardnaAktivnost', null, { params: { KlijentId: klijentId, Id: data.Id } }).then(workCompleted);

                function workCompleted(response) {
                    return response.data;
                }
            }

            function removeTip(klijentId, data) {
                data.klijentId = klijentId;
                return $http.post(this.urlBase + 'removeTip', null, { params: { KlijentId: klijentId, Id: data.Id } }).then(workCompleted);

                function workCompleted(response) {
                    return response.data;
                }
            }

            function removeVrsta(klijentId, data) {
                data.klijentId = klijentId;
                return $http.post(this.urlBase + 'removeVrsta', null, { params: { KlijentId: klijentId, Id: data.Id, TipId: data.Tip.Id } }).then(workCompleted);

                function workCompleted(response) {
                    return response.data;
                }
            }

            function getKolicine(klijentId) {
                return $http.get(this.urlBase + 'getKolicine', { params: { klijentId: klijentId } }).then(getCompleted);
                function getCompleted(response) {
                    return response.data;
                }
            }

            function saveKolicine(klijentId, data) {
                data.klijentId = klijentId;
                return $http.post(this.urlBase + 'saveKolicine', data, { params: { klijentId: klijentId } }).then(workCompleted);
                function workCompleted(response) {
                    return response.data;
                }
            }

            function getAktualniCjenik(klijentId) {
                return $http.get(this.urlBase + 'getAktualniCjenik', { params: { klijentId: klijentId } }).then(getCompleted);
                function getCompleted(response) {
                    return response.data;
                }
            }

            function getCjenik(klijentId, id) {
                return $http.get(this.urlBase + 'getCjenik', { params: { klijentId: klijentId, id: id } }).then(getCompleted);
                function getCompleted(response) {
                    return response.data;
                }
            }

            function saveCjenik(klijentId, data) {
                data.klijentId = klijentId;
                return $http.post(this.urlBase + 'saveCjenik', data, { params: { klijentId: klijentId } }).then(workCompleted);
                function workCompleted(response) {
                    return response.data;
                }
            }

            function addCjenik(klijentId, data) {
                data.klijentId = klijentId;
                return $http.post(this.urlBase + 'addCjenik', data, { params: { klijentId: klijentId } }).then(workCompleted);
                function workCompleted(response) {
                    return response.data;
                }
            }

            function addNaselje(data) {
                return $http.post(this.urlBase + 'addNaselje', data, { params: { Naziv: data.naziv } }).then(workCompleted);
                function workCompleted(response) {
                    return response.data;
                }
            }

            function getCjenici(klijentId) {
                return $http.get(this.urlBase + 'getCjenici', { params: { klijentId: klijentId } }).then(workCompleted);
                function workCompleted(response) {
                    return response.data;
                }
            }

            function getNoviCjenik(klijentId) {
                return $http.get(this.urlBase + 'getNoviCjenik', { params: { klijentId: klijentId } }).then(workCompleted);
                function workCompleted(response) {
                    return response.data;
                }
            }

            function getProblemi() {
                return $http.get(this.urlBase + 'getProblemi').then(workCompleted);
                function workCompleted(response) {
                    return response.data;
                }
            }

            function getProblem(id) {
                return $http.get(this.urlBase + 'getProblem', { params: { id: id } }).then(workCompleted);
                function workCompleted(response) {
                    return response.data;
                }
            }

            function getPostavke() {
                return $http.get(this.urlBase + 'getPostavke').then(workCompleted);
                function workCompleted(response) {
                    return response.data;
                }
            }

            function getResources() {
                return $http.get(this.urlBase + 'getRersources').then(workCompleted);
                function workCompleted(response) {
                    return response.data;
                }
            }

            function addResource(data) {
                return $http.post(this.urlBase + 'AddResource', {}, { params: data }).then(workCompleted);
                function workCompleted(response) {
                    return response.data;
                }
            }

            function getResource(id) {
                return $http.get(this.urlBase + 'getResource', { params: { id: id } }).then(workCompleted);
                function workCompleted(response) {
                    return response.data;
                }
            }

            function updateResource(data) {
                return $http.post(this.urlBase + 'editResource', data, { params: data }).then(workCompleted);
                function workCompleted(response) {
                    return response.data;
                }
            }

            function getPostavka(id) {
                return $http.get(this.urlBase + 'getPostavka', { params: { id: id } }).then(workCompleted);
                function workCompleted(response) {
                    return response.data;
                }
            }

            function addPostavka(data) {
                return $http.post(this.urlBase + 'addPostavka', {}, { params: data }).then(workCompleted);
                function workCompleted(response) {
                    return response.data;
                }
            }

            function updatePostavka(data) {
                return $http.post(this.urlBase + 'editPostavka', data, { params: data }).then(workCompleted);
                function workCompleted(response) {
                    return response.data;
                }
            }

            function removePostavka(data) {
                return $http.post(this.urlBase + 'removePostavka', data, { params: { Id: data.Id } }).then(workCompleted);

                function workCompleted(response) {
                    return response.data;
                }
            }

            function removeResource(data) {
                return $http.post(this.urlBase + 'removeResource', data, { params: { Id: data.Id } }).then(workCompleted);

                function workCompleted(response) {
                    return response.data;
                }
            }

            function kreirajKorisnika(eMail, klijentId) {
                return $http.post(this.urlBase + 'kreirajKorisnika', {}, { params: { eMail: eMail, klijentId: klijentId } });
            }

            function selectKlijent(klijent) {
                return $http.post(this.urlBase + 'selectKlijent', {}, { params: { klijentId: klijent.Id } });
            }

            function getKorisnici() {
                return $http.get(this.urlBase + 'getAllKorisnici').then(workCompleted);

                function workCompleted(response) {
                    return response.data;
                }
            }

            function getKorisnik(korisnikId) {
                return $http.get(this.urlBase + 'getKorisnik', { params: { id: korisnikId } }).then(workCompleted);

                function workCompleted(response) {
                    return response.data;
                }
            }

            function updateKorisnik(korisnikId, samoIzvjestaji) {
                return $http.post(this.urlBase + 'updateKorisnik', {}, { params: { id: korisnikId, izvjestaji: samoIzvjestaji } });
            }

            function getGrupeKlijenata() {
                return $http.get(this.urlBase + 'getGrupeKlijenata').then(getGrupeKlijenataCompleted);

                function getGrupeKlijenataCompleted(response) {
                    return response.data;
                }
            }

            function arhivirajStandardnuAktivnost(standardnaAktivnostId) {
                return $http.post(this.urlBase + 'arhivirajStandardnuAktivnost', {}, { params: { standardnaAktivnostId: standardnaAktivnostId } });
            }

            return service;
        }]);
})();
(function () {
    angular
        .module('zp.admin')
        .controller("adminRegisterLokacijeController", [
            'appService', 'adminDataService', 'Flash', 'NgTableParams', 'ngDialog', '$filter', adminController]);

    function adminController(appService, adminDataService, Flash, NgTableParams, ngDialog, $filter) {
        var vm = this;
        vm.List = null;
        vm.klijentId = appService.getKlijentId();
        vm.grupeLokacija = [];
        vm.remove = remove;
        vm.applyFilter = applyFilter;
        // vm.applyFilterNaselje = applyFilterNaselje;
        vm.applyFilterAll = applyFilterAll;
        vm.applyFilterAllNaselje = applyFilterAllNaselje;
        vm.filterAll = true;
        vm.filterAllNaselje = true;
        vm.kolicineLink = kolicineLink;
        vm.Naselja = [];
        

        vm.tableParams = new NgTableParams({
            sorting: { 'Naselje.Naziv': "asc", 'Naziv': 'asc' },
            count: appService.tableRowCount,
        }, {
            dataset: [],
            counts: [], // Disable pagination
        });

        init();

        function applyFilterAllNaselje() {
            vm.List = [];
            for (var index in vm.Naselja) {
                vm.Naselja[index].Aktivno = vm.filterAllNaselje;
            }
            applyFilter();
        }

        function kolicineLink(lokacija) {
            return appService.apiRootUrl + "admin#/admin/kolicine/" + lokacija.Id;
        }

        function applyFilter() {
            vm.List = [];
            for (var i in vm.LoadedList) {
                if (isActive(vm.LoadedList[i])) {
                    vm.List.push(vm.LoadedList[i]);
                }
            }

            var allGrupe = true;
            var allNaselja = true;

            for (var index in vm.Grupe) {
                if (!(vm.Grupe[index].Aktivno && allGrupe)) {
                    allGrupe = false;
                }
            }

            for (var index in vm.Naselja) {
                if (!(vm.Naselja[index].Aktivno && allNaselja)) {
                    allNaselja = false;
                }
            }

            vm.filterAll = allGrupe;
            vm.filterAllNaselje = allNaselja;

           //  vm.filterAll = false;
            vm.tableParams.settings({
                dataset: vm.List,
            });
        }

        function isActive(data) {
            var ret = false;
            for (var index in vm.Grupe) {
                if (data.Grupa && vm.Grupe[index].Id === data.Grupa.Id) {
                    ret = vm.Grupe[index].Aktivno;
                }
            }

            for (var index in vm.Naselja) {
                if (data.Grupa && vm.Naselja[index].Id === data.Naselje.Id && ret) {
                    ret = vm.Naselja[index].Aktivno;
                }
            }

            return ret;
        }

        function applyFilterAll() {
            vm.List = [];
            for (var index in vm.Grupe) {
                vm.Grupe[index].Aktivno = vm.filterAll;
            }
            applyFilter();
        }

        function init() {
            appService.disableChangeNotification();
            adminDataService.getLokacije(vm.klijentId).then(loadCompleted, loadFailed);
            adminDataService.getGrupaLokacije(vm.klijentId).then(loadGrupeCompleted, loadFailed);
            adminDataService.getNaselja().then(loadNaseljaCompleted, loadFailed);
        }

        function loadCompleted(data) {
            vm.List = data;
            vm.LoadedList = data;

            vm.tableParams.settings({
                dataset: vm.List,
            });

        }

        function loadFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("INTERNA_POGRESKA_SERVERA") + "</em>";
            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }
            Flash.create('danger', message, 'fixed-message');
        }

        function loadGrupeCompleted(data) {
            vm.Grupe = data;
            for (var index in vm.Grupe) {
                vm.Grupe[index].Aktivno = true;
            }
        }

        function loadNaseljaCompleted(data) {
            vm.Naselja = data;
            for (var index in vm.Naselja) {
                vm.Naselja[index].Aktivno = true;
            }
        }

        function remove(item) {
            ngDialog.openConfirm({
                template: appService.apiRootUrl + 'app/admin/confirmDeleteDialog.html',
                className: 'ngdialog-theme-default',
                data: angular.toJson(item)
            }).then(function (data) {
                adminDataService.removeLokacija(vm.klijentId, data).then(deleteCompleted, deleteFailed);
            });

            function deleteCompleted() {
                var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("PODATAK_OBRISAN") + "</em>";
                Flash.create('info', message, 'fixed-message');
                init();
            }

            function deleteFailed() {
                if (error.status == 401) window.location.reload();
                var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("BRISANJE_POGRESKA") + "</em>";
                Flash.create('danger', message, 'fixed-message');
            }
        }
    }
})();
(function () {
    angular
        .module('zp.admin')
        .controller("adminRegisterMjerneJedniniceController", [
            'appService', 'adminDataService', 'Flash', 'NgTableParams', 'ngDialog', '$filter', adminController]);

    function adminController(appService, adminDataService, Flash, NgTableParams, ngDialog, $filter) {
        var vm = this;
        vm.List = null;
        vm.klijentId = appService.getKlijentId();
        vm.remove = remove;
        
        vm.tableParams = new NgTableParams({
            sorting: { Id: "asc" },
            count: appService.tableRowCount,
        }, {
            dataset: [],
            counts: [], // Disable pagination
        });

        init();

        function init() {
            adminDataService.getMjerneJedninice(vm.klijentId).then(loadCompleted, loadFailed);
        }

        function loadCompleted(data) {
            vm.List = data;
            vm.tableParams.settings({
                dataset: vm.List,
            });
        }

        function loadFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("INTERNA_POGRESKA_SERVERA") + "</em>";
            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR")  + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }
            Flash.create('danger', message, 'fixed-message');
        }

        function remove(item) {
            ngDialog.openConfirm({
                template: appService.apiRootUrl + 'app/admin/confirmDeleteDialog.html',
                className: 'ngdialog-theme-default',
                data: angular.toJson(item)
            }).then(function (data) {
                adminDataService.removeMjernaJedinica(vm.klijentId, data).then(deleteCompleted, deleteFailed);
            });

            function deleteCompleted() {
                var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("PODATAK_OBRISAN") + "</em>";
                Flash.create('info', message, 'fixed-message');
                init();
            }

            function deleteFailed() {
                if (error.status == 401) window.location.reload();
                var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("BRISANJE_POGRESKA") + "</em>";
                Flash.create('danger', message, 'fixed-message');
            }
        }
    }
})();
(function () {
    angular
        .module('zp.admin')
        .controller("adminRegisterStandardneAktivnostiController", [
            'appService', 'adminDataService', 'Flash', 'NgTableParams', 'ngDialog', '$filter', adminController]);

    function adminController(appService, adminDataService, Flash, NgTableParams, ngDialog, $filter) {
        var vm = this;
        vm.List = null;
        vm.LoadedList = null;
        vm.Tipovi = null;
        vm.klijentId = appService.getKlijentId();
        vm.remove = remove;
        vm.applyFilter = applyFilter;
        vm.applyFilterAll = applyFilterAll;
        vm.filterAll = true;

        vm.tableParams = new NgTableParams({
            sorting: { Naziv: "asc" },
            count: appService.tableRowCount,
        }, {
            dataset: [],
            counts: [], // Disable pagination
        });

        init();

        function init() {
            adminDataService.getStandardneAktivnosti(vm.klijentId).then(loadCompleted, loadFailed);
            adminDataService.getTipovi(vm.klijentId).then(loadTipoviCompleted, loadFailed);
        }

        function loadTipoviCompleted(data) {
            vm.Tipovi = data;
            for (var i in vm.Tipovi) {
                vm.Tipovi[i].Aktivno = true;
            }
        }

        function loadCompleted(data) {
            vm.List = data;
            vm.LoadedList = data;
            vm.tableParams.settings({
                dataset: vm.List,
            });
        }

        function loadFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("INTERNA_POGRESKA_SERVERA") + "</em>";
            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR")  + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }
            Flash.create('danger', message, 'fixed-message');
        }

        function remove(item) {
            ngDialog.openConfirm({
                template: appService.apiRootUrl + 'app/admin/confirmDeleteDialog.html',
                className: 'ngdialog-theme-default',
                data: angular.toJson(item)
            }).then(function (data) {
                adminDataService.removeStandardnaAktivnost(vm.klijentId, data).then(deleteCompleted, deleteFailed);
            });

            function deleteCompleted() {
                var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("PODATAK_OBRISAN") + "</em>";
                Flash.create('info', message, 'fixed-message');
                init();
            }

            function deleteFailed() {
                if (error.status == 401) window.location.reload();
                var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("BRISANJE_POGRESKA") + "</em>";

                
                var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("BRISANJE_POGRESKA") + "</em>";
                Flash.create('danger', message, 'fixed-message');
            }
        }

        function isSelected(ciljId) {
            for (var i in vm.Tipovi) {
                if (vm.Tipovi[i].Id == ciljId && vm.Tipovi[i].Aktivno) {
                    return true;
                }
            }
            return false;
        }

        function setSelected(ciljId, val) {
            for (var i in vm.Tipovi) {
                if (vm.Tipovi[i].Id == ciljId) { // && vm.Tipovi[i].Aktivno) {
                    vm.Tipovi[i].Aktivno = val;
                    // return true;
                }
            }
            return false;
        }

        function isActiveTip(cilj) {
            for (var i in cilj) {
                if(isSelected(cilj[i].tipId)){
                    return true;
                }
            }
            return false;
        }

        function applyFilterAll() {
            vm.List = [];
            for (var i in vm.Tipovi) {
                vm.Tipovi[i].Aktivno = vm.filterAll;
            }

            if (vm.filterAll) {
                for (var i in vm.LoadedList) {
                    vm.List.push(vm.LoadedList[i]);
                }
            }
            vm.tableParams.settings({
                dataset: vm.List
            });
        }

        function applyFilter() {
            vm.List = [];
            var all = true;
            for (var i in vm.LoadedList) {
                if(isActiveTip(vm.LoadedList[i].CiljeviAktivnosti)){
                    vm.List.push(vm.LoadedList[i]);
                }
                else {
                    all = false;
                }
            }

            if (all) {
                vm.filterAll = true;
                applyFilterAll();
            }
            else {
                vm.filterAll = false;
                vm.tableParams.settings({
                    dataset: vm.List,
                });
            }
        }
    }
})();
(function () {
    angular
        .module('zp.admin')
        .controller("adminRegisterTipoviController", [
            'appService', 'adminDataService', 'Flash', 'NgTableParams', 'ngDialog', '$filter', adminController]);

    function adminController(appService, adminDataService, Flash, NgTableParams, ngDialog, $filter) {
        var vm = this;
        vm.List = null;
        vm.klijentId = appService.getKlijentId();
        vm.remove = remove;

        vm.tableParams = new NgTableParams({
            sorting: { Naziv: "asc" },
            count: appService.tableRowCount,
        }, {
            dataset: [],
            counts: [], // Disable pagination
        });

        init();

        function init() {
            adminDataService.getTipovi(vm.klijentId).then(loadCompleted, loadFailed);
        }

        function loadCompleted(data) {
            vm.List = data;
            vm.tableParams.settings({
                dataset: vm.List,
            });
        }

        function loadFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("INTERNA_POGRESKA_SERVERA") + "</em>";
            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR")  + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }
            Flash.create('danger', message, 'fixed-message');
        }

        function remove(item) {
            ngDialog.openConfirm({
                template: appService.apiRootUrl +  'app/admin/confirmDeleteDialog.html',
                className: 'ngdialog-theme-default',
                data: angular.toJson(item)
            }).then(function (data) {
                adminDataService.removeTip(vm.klijentId, data).then(deleteCompleted, deleteFailed);
            });

            function deleteCompleted() {
                var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("PODATAK_OBRISAN") + "</em>";
                Flash.create('info', message, 'fixed-message');
                init();
            }

            function deleteFailed() {
                if (error.status == 401) window.location.reload();
                var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("BRISANJE_POGRESKA") + "</em>";
                Flash.create('danger', message, 'fixed-message');
            }
        }
    }
})();
(function () {
    angular
        .module('zp.admin')
        .controller("adminRegisterVrsteController", [
            'appService', 'adminDataService', 'Flash', 'NgTableParams', 'ngDialog', '$filter', adminController]);

    function adminController(appService, adminDataService, Flash, NgTableParams, ngDialog, $filter) {
        var vm = this;
        vm.List = null;
        vm.klijentId = appService.getKlijentId();
        vm.remove = remove;
        vm.TipDataFilter = TipDataFilter;

        vm.tableParams = new NgTableParams({
            sorting: { Naziv: "asc" },
            count: appService.tableRowCount
        }, {
            dataset: [],
            counts: [], // Disable pagination
        });

        init();

        function init() {
            // adminDataService.getVrste(vm.klijentId).then(loadCompleted, loadFailed);
            loadCompleted(adminDataService.getVrsteSync(vm.klijentId));
        }

        function loadCompleted(data) {
            vm.List = data;
            vm.tableParams.settings({
                dataset: vm.List
            });
        }

        function loadFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("INTERNA_POGRESKA_SERVERA") + "</em>";
            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR")  + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }
            Flash.create('danger', message, 'fixed-message');
        }

        function remove(item) {
            ngDialog.openConfirm({
                template: appService.apiRootUrl + 'app/admin/confirmDeleteDialog.html',
                className: 'ngdialog-theme-default',
                data: angular.toJson(item)
            }).then(function (data) {
                adminDataService.removeVrsta(vm.klijentId, data).then(deleteCompleted, deleteFailed);
            });

            function deleteCompleted() {
                var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("PODATAK_OBRISAN") + "</em>";
                Flash.create('info', message, 'fixed-message');
                init();
            }

            function deleteFailed() {
                if (error.status == 401) window.location.reload();
                var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("BRISANJE_POGRESKA") + "</em>";
                Flash.create('danger', message, 'fixed-message');
            }
        }

        function TipDataFilter() {
            var tmpTipovi = {};
            var tipoviList = [];
            var dataList = vm.List; // adminDataService.getVrsteSync(vm.klijentId);

            if (dataList !== null) {
                for (var index in dataList) {
                    tmpTipovi[dataList[index].Tip.Naziv] = dataList[index].Tip.Naziv;
                }
            }

            for (var tip in tmpTipovi) {
                tipoviList.push({ id: tip, title: tip });
            }
            
            return $filter('orderBy')(tipoviList, 'title');
        }
    }
})();
(function () {
    angular
        .module('zp.admin')
        .controller("adminRegisterEditLokacijeController", [
            '$location', '$routeParams', 'appService', 'adminDataService', 'Flash', adminController]);

    function adminController($location, $routeParams, appService, adminDataService, Flash) {
        appService.enableChangeNotification();
        var vm = this;
        vm.klijentId = appService.getKlijentId();
        vm.id = $routeParams.id;
        vm.grupeLokacija = [];
        vm.naziv = null;
        vm.save = save;
        vm.Grupa = {};

        init();

        function init() {
            adminDataService.getLokacija(vm.klijentId, vm.id).then(loadCompleted, loadFailed);
            adminDataService.getGrupaLokacije(vm.klijentId).then(loadGrupeCompleted, loadGrupeFailed);
        }

        function loadCompleted(data) {
            vm.id = data.Id;
            vm.naziv = data.Naziv;
            data.Grupa = data.Grupa || {};
            vm.Grupa.Id = data.Grupa.Id + "";
        }

        function loadFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("INTERNA_POGRESKA_SERVERA") + "</em>";
            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }
            Flash.create('danger', message, 'fixed-message');
        }
        
        function save() {
            adminDataService.updateLokacija(vm.klijentId, { Id: vm.id, Naziv: vm.naziv, GrupaLokacijaId: vm.Grupa.Id }).then(saveCompleted, saveFailed);
        }

        function saveCompleted() {
            appService.disableChangeNotification();
            $location.path('/admin/registers/lokacije');
            var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("SPREMANJE_USPJESNO", vm.naziv) + "</em>";
            Flash.create('info', message, 'fixed-message');
        }

        function saveFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("ERROR_DODAJ_PODATAK") + "</em>";
            Flash.create('danger', message, 'fixed-message');
            vm.List = [];
        }

        function loadGrupeCompleted(data) {
            vm.grupeLokacija = data;
        }

        function loadGrupeFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("INTERNA_POGRESKA_SERVERA") + "</em>";
            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }
            Flash.create('danger', message, 'fixed-message');
        }
    }
})();
(function () {
    angular
        .module('zp.admin')
        .controller("adminRegisterEditMjerneJedniniceController", [
            '$location', '$routeParams', 'appService', 'adminDataService', 'Flash', adminController]);

    function adminController($location, $routeParams, appService, adminDataService, Flash) {
        appService.enableChangeNotification();
        var vm = this;
        vm.List = null;
        vm.klijentId = appService.getKlijentId();
        vm.id = $routeParams.id;
        vm.naziv = null;
        vm.oznaka = null;
        vm.tipovi = null;
        vm.vrste = null;
        vm.save = save;

        init();

        function init() {
            adminDataService.getMjernaJedninica(vm.klijentId, vm.id).then(loadCompleted, loadFailed);
            adminDataService.getTipovi(vm.klijentId).then(loadTipoviCompleted, loadFailed);
            adminDataService.getVrste(vm.klijentId).then(loadVrsteCompleted, loadFailed);
        }

        function loadTipoviCompleted(data) {
            vm.tipovi = data;
        }

        function loadVrsteCompleted(data) {
            vm.vrste = data;
        }

        function loadCompleted(data) {
            vm.id = data.Id;
            vm.naziv = data.Naziv;
            vm.oznaka = data.Oznaka;
        }

        function loadFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("INTERNA_POGRESKA_SERVERA") + "</em>";
            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR")  + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }
            Flash.create('danger', message, 'fixed-message');
        }

        function save() {
            adminDataService.updateMjernaJedninica(vm.klijentId, { Id: vm.id, Naziv: vm.naziv, Oznaka: vm.oznaka }).then(saveCompleted, saveFailed);
        }

        function saveCompleted() {
            appService.disableChangeNotification();
            $location.path('/admin/registers/mjerne_jedinice');
            var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("SPREMANJE_USPJESNO", vm.naziv) + "</em>";
            Flash.create('info', message, 'fixed-message');
        }

        function saveFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("ERROR_DODAJ_PODATAK") + "</em>";
            Flash.create('danger', message, 'fixed-message');
            vm.List = [];
        }
    }
})();
(function () {
    angular
        .module('zp.admin')
        .controller("adminRegisterEditStandardneAktivnostiController", [
            '$location', '$routeParams', 'appService', 'adminDataService', 'Flash', adminController]);

    function adminController($location, $routeParams, appService, adminDataService, Flash) {
        var vm = this;
        vm.List = null;
        vm.klijentId = appService.getKlijentId();
        vm.id = $routeParams.id;
        vm.mjerneJedinice = null;
        vm.mjernaJedinicaId = null;
        vm.save = save;
        vm.arhiviraj = arhiviraj;

        vm.ciljeviAktivnosti = [];
        vm.getVrste = getVrste;
        vm.dodaj = dodaj;
        vm.ukloni = ukloni;
        vm.getDisabledAktivnost = getDisabledAktivnost;
        vm.getDisabledTip = getDisabledTip;
        vm.changeTip = changeTip;
        vm.getDisabledAdd = getDisabledAdd;
        vm.getDisabledDelete = getDisabledDelete;

        init();

        function init() {
            adminDataService.getStandardnaAktivnost(vm.klijentId, vm.id).then(loadCompleted, loadFailed);
            adminDataService.getMjerneJedninice(vm.klijentId).then(loadMJCompleted, loadFailed);
            adminDataService.getTipovi(vm.klijentId).then(loadTipoviCompleted, loadFailed);
            adminDataService.getVrste(vm.klijentId).then(loadVrsteCompleted, loadFailed);
            appService.disableChangeNotification();
        }

        function loadCompleted(data) {
            vm.id = data.Id;
            vm.naziv = data.Naziv;
            vm.mjernaJedinicaId = data.MjernaJedinica.Id + "";
            vm.ciljeviAktivnosti = data.CiljeviAktivnosti;
            vm.grupaAktivnosti = data.GrupaAktivnosti;
            vm.arhivirana = data.Arhivirana;

            for (var i in vm.ciljeviAktivnosti) {
                vm.ciljeviAktivnosti[i].tipId = vm.ciljeviAktivnosti[i].tipId + "";
                if (vm.ciljeviAktivnosti[i].vrstaId) {
                    vm.ciljeviAktivnosti[i].vrstaId = vm.ciljeviAktivnosti[i].vrstaId + "";
                }
            }
        }

        function loadMJCompleted(data) {
            vm.mjerneJedinice = data;
        }

        function loadTipoviCompleted(data) {
            vm.tipovi = data;
        }

        function loadVrsteCompleted(data) {
            vm.vrste = data;
        }

        function loadFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("INTERNA_POGRESKA_SERVERA") + "</em>";
            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR")  + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }
            Flash.create('danger', message, 'fixed-message');
        }

        function save() {
            adminDataService.updateStandardnaAktivnost(vm.klijentId, {
                Id: vm.id,
                Naziv: vm.naziv,
                MjernaJedinica: { Id: vm.mjernaJedinicaId },
                CiljeviAktivnosti: vm.ciljeviAktivnosti,
                GrupaAktivnosti: vm.grupaAktivnosti
            }).then(saveCompleted, saveFailed);
        }


        function saveCompleted() {
            appService.disableChangeNotification();
            $location.path('/admin/registers/standardne_aktivnosti');
            var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("SPREMANJE_USPJESNO", vm.naziv) + "</em>";
            Flash.create('info', message, 'fixed-message');
        }

        function saveFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("ERROR_DODAJ_PODATAK") + "</em>";
            Flash.create('danger', message, 'fixed-message');
            vm.List = [];
        }

        function dodaj() {
            vm.ciljeviAktivnosti.push({ tipId: null, vrstaId: null, status: 1 });
        }

        function getVrste(ciljAktivnosti) {
            var vrste = [];
            for (var i in vm.vrste) {
                if (vm.vrste[i].Tip.Id == ciljAktivnosti.tipId) {
                    vrste.push(vm.vrste[i]);
                }
            }
            return vrste;
        }
        function ukloni(object) {
            var index = vm.ciljeviAktivnosti.indexOf(object);
            vm.ciljeviAktivnosti[index].status = 3;
           // vm.ciljeviAktivnosti.splice(index, 1);
        }

        function isAllDisabled(ciljAktivnosti) {
            var listVrste = getVrste(ciljAktivnosti);
            var result = false;
            for (var i = 0; i < listVrste.length; i++) {
                result = getDisabledAktivnost(ciljAktivnosti, listVrste[i]);
                if (result == false) return false;
            }
            return result;
        }

        function getDisabledAktivnost(item, option) {
            if (option == '') {
                for (index in vm.ciljeviAktivnosti) {
                    if (vm.ciljeviAktivnosti[index].tipId == item.tipId && vm.ciljeviAktivnosti[index] !== item) {
                        return true;
                    }
                }
            }

            for (index in vm.ciljeviAktivnosti) {
                var ciljKey = vm.ciljeviAktivnosti[index].tipId + "_" + vm.ciljeviAktivnosti[index].vrstaId;
                if (option.Id === undefined) option.Id = null;
                var itemKey = item.tipId + "_" + option.Id;
                if (ciljKey == itemKey && vm.ciljeviAktivnosti[index] !== item) {
                    return true;
                }
            }

            return false;
        }

        function getDisabledTip(item, option) {
            for (index in vm.ciljeviAktivnosti) {
                if (vm.ciljeviAktivnosti[index].tipId == option.Id
                    && vm.ciljeviAktivnosti[index].vrstaId == ''
                    && vm.ciljeviAktivnosti[index] !== item) {
                    return true;
                }
            }

            var allDisabled = isAllDisabled({ tipId: option.Id, vrstaId: null });
            return allDisabled;
        }

        function changeTip(ciljAktivnosti) {
            ciljAktivnosti.vrstaId = findFirstNonDisabledVrsta(ciljAktivnosti);
        }

        function findFirstNonDisabledVrsta(ciljAktivnosti) {
            var result = getDisabledAktivnost(ciljAktivnosti, '');
            if (result == false) return '';

            var listVrste = getVrste(ciljAktivnosti);
            for (var i = 0; i < listVrste.length; i++) {
                result = getDisabledAktivnost(ciljAktivnosti, listVrste[i]);
                if (result == false) return listVrste[i].Id + "";
            }
        }

        function getDisabledAdd() {
            for (index in vm.ciljeviAktivnosti) {
                if (!(vm.ciljeviAktivnosti[index].tipId || vm.ciljeviAktivnosti[index].vrstaId)) {
                    return true;
                }
            }
        }

        function getDisabledDelete() {
            return vm.ciljeviAktivnosti.length == 1;
        }

        function arhiviraj() {
            adminDataService.arhivirajStandardnuAktivnost(vm.id).then(saveCompleted, saveFailed);
        }
    }
})();
(function () {
    angular
        .module('zp.admin')
        .controller("adminRegisterEditTipoviController", [
            '$location', '$routeParams', 'appService', 'adminDataService', 'Flash', adminController]);

    function adminController($location, $routeParams, appService, adminDataService, Flash) {
        appService.enableChangeNotification();
        var vm = this;
        vm.List = null;
        vm.klijentId = appService.getKlijentId();
        vm.id = $routeParams.id;
        vm.naziv = null;
        vm.save = save;

        init();

        function init() {
            adminDataService.getTip(vm.klijentId, vm.id).then(loadCompleted, loadFailed);
        }

        function loadCompleted(data) {
            vm.Id = data.id;
            vm.naziv = data.Naziv;
        }


        function save() {
            adminDataService.updateTip(vm.klijentId, { Id: vm.id, Naziv: vm.naziv }).then(saveCompleted, saveFailed);
        }

        function saveCompleted() {
            appService.disableChangeNotification();
            $location.path('/admin/registers/tipovi');
            var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("SPREMANJE_USPJESNO", vm.naziv) + "</em>";
            Flash.create('info', message, 'fixed-message');
        }

        function saveFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("ERROR_DODAJ_PODATAK") + "</em>";
            Flash.create('danger', message, 'fixed-message');
            vm.List = [];
        }

        function loadFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("INTERNA_POGRESKA_SERVERA") + "</em>";
            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR")  + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }
            Flash.create('danger', message, 'fixed-message');
        }

    }
})();
(function () {
    angular
        .module('zp.admin')
        .controller("adminRegisterEditVrsteController", [
            '$location', '$routeParams', 'appService', 'adminDataService', 'Flash', 'NgTableParams', '$filter', adminController]);

    function adminController($location, $routeParams, appService, adminDataService, Flash, NgTableParams, $filter) {
        appService.enableChangeNotification();
        var vm = this;
        vm.List = null;
        vm.klijentId = appService.getKlijentId();
        vm.id = $routeParams.id;
        vm.naziv = null;
        vm.tipId = null;
        vm.mjernaJedinicaId = null;
        vm.save = save;

        init();

        function init() {
            adminDataService.getVrsta(vm.klijentId, vm.id).then(loadCompleted, loadFailed);
            adminDataService.getMjerneJedninice(vm.klijentId).then(loadMJCompleted, loadFailed);
            adminDataService.getTipovi(vm.klijentId).then(loadTCompleted, loadFailed);
        }

        function loadCompleted(data) {
            vm.id = data.Id;
            vm.naziv = data.Naziv;
            vm.tipId = data.Tip.Id + "";
            vm.mjernaJedinicaId = data.MjernaJedinica.Id + "";
        }

        function loadMJCompleted(data) {
            vm.mjerneJedinice = data;
        }

        function loadTCompleted(data) {
            vm.tipovi = data;
        }

        function loadFailed(error) {
            if (error.status == 401) window.location.reload();

            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("INTERNA_POGRESKA_SERVERA") + "</em>";

            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR")  + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }

            Flash.create('danger', message, 'fixed-message');
        }

        function save() {
            adminDataService.updateVrsta(vm.klijentId, { Id: vm.id, Naziv: vm.naziv, TipId: vm.tipId, MjernaJedinicaId: vm.mjernaJedinicaId }).then(saveCompleted, saveFailed);
        }

        function saveCompleted() {
            appService.disableChangeNotification();
            $location.path('/admin/registers/vrste');
            var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("SPREMANJE_USPJESNO", vm.naziv) + "</em>";
            Flash.create('info', message, 'fixed-message');
        }

        function saveFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("ERROR_DODAJ_PODATAK") + "</em>";
            Flash.create('danger', message, 'fixed-message');
            vm.List = [];
        }

    }
})();
(function () {
    angular
        .module('zp.admin')
        .controller("adminRegisterAddLokacijeController", [
            '$location', '$routeParams', 'appService', 'adminDataService', 'Flash', adminController]);

    function adminController($location, $routeParams, appService, adminDataService, Flash) {
        appService.enableChangeNotification();
        var vm = this;
        vm.klijentId = appService.getKlijentId();
        vm.id = null;
        vm.naziv = null;
        vm.save = save;
        vm.Grupa = {};
        vm.Naselja = [];
        vm.Naselje = { Id: null };

        init();

        function init() {
            adminDataService.getGrupaLokacije(vm.klijentId).then(loadGrupeCompleted, loadFailed);
            adminDataService.getNaselja().then(loadNaseljaCompleted, loadFailed);
        }
       
        function loadNaseljaCompleted(data) {
            vm.Naselja = data;
        }

        function save() {
            adminDataService.addLokacija(vm.klijentId, { Id: vm.id, Naziv: vm.naziv, GrupaLokacijaId: vm.Grupa.Id, NaseljeId: vm.Naselje.Id }).then(saveCompleted, saveFailed);
        }

        function saveCompleted() {
            appService.disableChangeNotification();
            $location.path('/admin/registers/lokacije');
            var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("SPREMANJE_USPJESNO", vm.naziv) + "</em>";
            Flash.create('info', message, 'fixed-message');
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

        function loadGrupeCompleted(data) {
            vm.grupeLokacija = data;
        }

        function loadFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("INTERNA_POGRESKA_SERVERA") + "</em>";
            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }
            Flash.create('danger', message, 'fixed-message');
        }
    }
})();
(function () {
    angular
        .module('zp.admin')
        .controller("adminRegisterAddMjerneJedniniceController", [
            '$location', '$routeParams', 'appService', 'adminDataService', 'Flash', adminController]);

    function adminController($location, $routeParams, appService, adminDataService, Flash) {
        appService.enableChangeNotification();
        var vm = this;
        vm.List = null;
        vm.klijentId = appService.getKlijentId();
        vm.id = null;
        vm.oznaka = null;
        vm.naziv = null;
        vm.save = save;

        function save() {
            adminDataService.addMjernaJedninica(vm.klijentId, { Id: vm.id, Naziv: vm.naziv, Oznaka: vm.oznaka }).then(saveCompleted, saveFailed);
        }

        function saveCompleted() {
            appService.disableChangeNotification();
            $location.path('/admin/registers/mjerne_jedinice');
            var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("SPREMANJE_USPJESNO", vm.naziv) + "</em>";
            Flash.create('info', message, 'fixed-message');
        }

        function saveFailed(error) {
            appService.disableChangeNotification();
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("ERROR_DODAJ_PODATAK") + "</em>";
            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }
            Flash.create('danger', message, 'fixed-message');
            vm.List = [];
        }
    }
})();
(function () {
    angular
        .module('zp.admin')
        .controller("adminRegisterAddStandardneAktivnostiController", [
            '$location', '$routeParams', 'appService', 'adminDataService', 'Flash', adminController]);

    function adminController($location, $routeParams, appService, adminDataService, Flash) {
        appService.enableChangeNotification();
        var vm = this;
        vm.List = null;
        vm.klijentId = appService.getKlijentId();
        vm.id = null;
        vm.mjerneJedinice = null;
        vm.mjernaJedinicaId = null;
        vm.vrstaId = null;
        vm.tipId = null;
        vm.ciljeviAktivnosti = [{ tipId: null, vrstaId: null }];
        vm.save = save;
        vm.getVrste = getVrste;
        vm.dodaj = dodaj;
        vm.ukloni = ukloni;
        vm.getDisabledAktivnost = getDisabledAktivnost;
        vm.getDisabledTip = getDisabledTip;
        vm.changeTip = changeTip;
        vm.getDisabledAdd = getDisabledAdd;
        vm.getDisabledDelete = getDisabledDelete;

        init();

        function init() {
            adminDataService.getMjerneJedninice(vm.klijentId).then(loadMJCompleted, loadFailed);
            adminDataService.getTipovi(vm.klijentId).then(loadTipoviCompleted, loadFailed);
            adminDataService.getVrste(vm.klijentId).then(loadVrsteCompleted, loadFailed);
        }

        function loadTipoviCompleted(data) {
            vm.tipovi = data;
        }

        function loadVrsteCompleted(data) {
            vm.vrste = data;
        }

        function loadMJCompleted(data) {
            vm.mjerneJedinice = data;
        }

        function save() {
            adminDataService.addStandardnaAktivnost(vm.klijentId, {
                Id: vm.id,
                Naziv: vm.naziv,
                MjernaJedinica: { Id: vm.mjernaJedinicaId },
                CiljeviAktivnosti: vm.ciljeviAktivnosti,
                GrupaAktivnosti: vm.grupaAktivnosti
            }).then(saveCompleted, saveFailed);
        }

        function saveCompleted() {
            appService.disableChangeNotification();
            $location.path('/admin/registers/standardne_aktivnosti');
            var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("SPREMANJE_USPJESNO", vm.naziv) + "</em>";
            Flash.create('info', message, 'fixed-message');
        }

        function loadFailed(error) {
            if (error.status == 401) {
                appService.disableChangeNotification();
                window.location.reload();
            }
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

        function dodaj() {
            vm.ciljeviAktivnosti.push({ tipId: null, vrstaId: null });
        }

        function getVrste(ciljAktivnosti) {
            var vrste = [];
            for (var i in vm.vrste) {
                if (vm.vrste[i].Tip.Id == ciljAktivnosti.tipId) {
                    vrste.push(vm.vrste[i]);
                }
            }
            return vrste;
        }

        function ukloni(object) {
            var index = vm.ciljeviAktivnosti.indexOf(object);
            vm.ciljeviAktivnosti.splice(index, 1);
        }

        function isAllDisabled(ciljAktivnosti) {
            var listVrste = getVrste(ciljAktivnosti);
            var result = false;
            for (var i = 0; i < listVrste.length; i++) {
                result = getDisabledAktivnost(ciljAktivnosti, listVrste[i]);
                if (result == false) return false;
            }
            return result;
        }

        function getDisabledAktivnost(item, option) {
            if (option == '') {
                for (index in vm.ciljeviAktivnosti) {
                    if (vm.ciljeviAktivnosti[index].tipId == item.tipId && vm.ciljeviAktivnosti[index] !== item) {
                        return true;
                    }
                }
            }

            for (index in vm.ciljeviAktivnosti) {
                var ciljKey = vm.ciljeviAktivnosti[index].tipId + "_" + vm.ciljeviAktivnosti[index].vrstaId;
                if (option.Id === undefined) option.Id = null;
                var itemKey = item.tipId + "_" + option.Id;
                if (ciljKey == itemKey && vm.ciljeviAktivnosti[index] !== item) {
                    return true;
                }
            }

            return false;
        }

        function getDisabledTip(item, option) {
            for (index in vm.ciljeviAktivnosti) {
                if (vm.ciljeviAktivnosti[index].tipId == option.Id
                    && vm.ciljeviAktivnosti[index].vrstaId == ''
                    && vm.ciljeviAktivnosti[index] !== item) {
                    return true;
                }
            }
            /*
            if (getDisabledAktivnost({ tipId: option.Id, vrstaId: null }, '')) {
                return true;
            }
            */
            var allDisabled = isAllDisabled({ tipId: option.Id, vrstaId: null });
            return allDisabled;
        }

        function changeTip(ciljAktivnosti) {
            ciljAktivnosti.vrstaId = findFirstNonDisabledVrsta(ciljAktivnosti);
        }

        function findFirstNonDisabledVrsta(ciljAktivnosti) {
            var result = getDisabledAktivnost(ciljAktivnosti, '');
            if (result == false) return '';

            var listVrste = getVrste(ciljAktivnosti);
            for (var i = 0; i < listVrste.length; i++) {
                result = getDisabledAktivnost(ciljAktivnosti, listVrste[i]);
                if (result == false) return listVrste[i].Id + "";
            }
        }

        function getDisabledAdd() {
            for (index in vm.ciljeviAktivnosti) {
                if (!(vm.ciljeviAktivnosti[index].tipId || vm.ciljeviAktivnosti[index].vrstaId)) {
                   return true;
                }
            }
        }

        function getDisabledDelete() {
            return vm.ciljeviAktivnosti.length == 1;
        }
    }
})();
(function () {
    angular
        .module('zp.admin')
        .controller("adminRegisterAddTipoviController", [
            '$location', '$routeParams', 'appService', 'adminDataService', 'Flash', adminController]);

    function adminController($location, $routeParams, appService, adminDataService, Flash) {
        appService.enableChangeNotification();
        var vm = this;
        vm.List = null;
        vm.klijentId = appService.getKlijentId();
        vm.id = null;
        vm.save = save;

        function save() {
            adminDataService.addTip(vm.klijentId, { Id: vm.id, Naziv: vm.naziv, }).then(saveCompleted, saveFailed);
        }

        function saveCompleted() {
            appService.disableChangeNotification();
            $location.path('/admin/registers/tipovi');
            var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("SPREMANJE_USPJESNO", vm.naziv) + "</em>";
            Flash.create('info', message, 'fixed-message');
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
    }
})();
(function () {
    angular
        .module('zp.admin')
        .controller("adminRegisterAddVrsteController", [
            '$location', '$routeParams', 'appService', 'adminDataService', 'Flash', 'NgTableParams', '$filter', adminController]);

    function adminController($location, $routeParams, appService, adminDataService, Flash, NgTableParams, $filter) {
        appService.enableChangeNotification();
        var vm = this;
        vm.List = null;
        vm.klijentId = appService.getKlijentId();
        vm.naziv = null;
        vm.tipId = null;
        vm.mjernaJedinicaId = null;
        vm.save = save;

        init();

        function init() {
            adminDataService.getMjerneJedninice(vm.klijentId).then(loadMJCompleted, loadFailed);
            adminDataService.getTipovi(vm.klijentId).then(loadTCompleted, loadFailed);
        }

        function loadMJCompleted(data) {
            vm.mjerneJedinice = data;
        }

        function loadTCompleted(data) {
            vm.tipovi = data;
        }

        function loadFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("INTERNA_POGRESKA_SERVERA") + "</em>";
            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }
            Flash.create('danger', message, 'fixed-message');
        }

        function save() {
            adminDataService.addVrsta(vm.klijentId, { Naziv: vm.naziv, TipId: vm.tipId, MjernaJedinicaId: vm.mjernaJedinicaId }).then(saveCompleted, saveFailed);
        }

        function saveCompleted() {
            appService.disableChangeNotification();
            $location.path('/admin/registers/vrste');
            var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("SPREMANJE_USPJESNO", vm.naziv) + "</em>";
            Flash.create('info', message, 'fixed-message');
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
    }
})();
(function () {
    angular
        .module('zp.admin')
        .controller("adminRegisterGrupaLokacijeController", [
            'appService', 'adminDataService', 'Flash', 'NgTableParams', 'ngDialog', '$filter', adminController]);

    function adminController(appService, adminDataService, Flash, NgTableParams, ngDialog, $filter) {
        var vm = this;
        vm.List = null;
        vm.klijentId = appService.getKlijentId();
        vm.remove = remove;
        
        vm.tableParams = new NgTableParams({
            sorting: { Naziv: "asc" },
            count: appService.tableRowCount,
        }, {
            dataset: [],
            counts: [], // Disable pagination
        });

        init();

        function init() {
            adminDataService.getGrupaLokacije(vm.klijentId).then(loadCompleted, loadFailed);
        }

        function loadCompleted(data) {
            vm.List = data;
            vm.tableParams.settings({
                dataset: vm.List,
            });
        }

        function loadFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("INTERNA_POGRESKA_SERVERA") + "</em>";
            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR")  + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }
            Flash.create('danger', message, 'fixed-message');
        }

        function remove(item) {
            ngDialog.openConfirm({
                template: appService.apiRootUrl + 'app/admin/confirmDeleteDialog.html',
                className: 'ngdialog-theme-default',
                data: angular.toJson(item)
            }).then(function (data) {
                adminDataService.removeGrupaLokacije(vm.klijentId, data).then(deleteCompleted, deleteFailed);
            });

            function deleteCompleted() {
                var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("PODATAK_OBRISAN") + "</em>";
                Flash.create('info', message, 'fixed-message');
                init();
            }

            function deleteFailed() {
                if (error.status == 401) window.location.reload();
                var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("BRISANJE_POGRESKA") + "</em>";
                Flash.create('danger', message, 'fixed-message');
            }
        }
    }
})();
(function () {
    angular
        .module('zp.admin')
        .controller("adminRegisterAddGrupaLokacijeController", [
            '$location', '$routeParams', 'appService', 'adminDataService', 'Flash', adminController]);

    function adminController($location, $routeParams, appService, adminDataService, Flash) {
        appService.enableChangeNotification();
        var vm = this;
        vm.klijentId = appService.getKlijentId();
        vm.id = null;
        vm.naziv = null;
        vm.save = save;
       
        function save() {
            adminDataService.addGrupaLokacija(vm.klijentId, { Id: vm.id, Naziv: vm.naziv,  }).then(saveCompleted, saveFailed);
        }

        function saveCompleted() {
            var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("SPREMANJE_USPJESNO", vm.naziv) + "</em>";
            Flash.create('info', message, 'fixed-message');
            appService.disableChangeNotification();
            $location.path('/admin/registers/grupa_lokacije');
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
    }
})();
(function () {
    angular
        .module('zp.admin')
        .controller("adminRegisterEditGrupaLokacijeController", [
            '$location', '$routeParams', 'appService', 'adminDataService', 'Flash', adminController]);

    function adminController($location, $routeParams, appService, adminDataService, Flash) {
        appService.enableChangeNotification();
        var vm = this;
        vm.klijentId = appService.getKlijentId();
        vm.id = $routeParams.id;
        vm.naziv = null;
        vm.save = save;

        init();

        function init() {
            adminDataService.getGrupaLokacija(vm.klijentId, vm.id).then(loadCompleted, loadFailed);
        }

        function loadCompleted(data) {
            vm.id = data.Id;
            vm.naziv = data.Naziv;
        }

        function loadFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("INTERNA_POGRESKA_SERVERA") + "</em>";
            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }
            Flash.create('danger', message, 'fixed-message');
        }
        
        function save() {
            adminDataService.updateGrupaLokacija(vm.klijentId, { Id: vm.id, Naziv: vm.naziv,  }).then(saveCompleted, saveFailed);
        }

        function saveCompleted() {
            appService.disableChangeNotification();
            $location.path('/admin/registers/grupa_lokacije');
            var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("SPREMANJE_USPJESNO", vm.naziv) + "</em>";
            Flash.create('info', message, 'fixed-message');
        }

        function saveFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("ERROR_DODAJ_PODATAK") + "</em>";
            Flash.create('danger', message, 'fixed-message');
            vm.List = [];
        }
    }
})();
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
(function () {
    angular
        .module('zp.admin')
        .controller("adminCjeniciController", [
            '$location', '$routeParams', 'appService', 'adminDataService', 'Flash', 'NgTableParams', 'apiRoot', adminController]);

    function adminController($location, $routeParams, appService, adminDataService, Flash, NgTableParams, apiRoot) {
        var vm = this;
        vm.klijentId = appService.getKlijentId();
        vm.cjenici = null;
        vm.apiRoot = apiRoot;
        
        init();

        vm.cols = [{
            field: "Id",
            title: "Id",
            show: true,
        }, {
            field: "VrijediOd",
            title: "Vrijedi od",
            show: true,
        }, {
            field: "VrijediDo",
            title: "Vrijedi do",
            show: true,
        }, {
            field: "Admin",
            title: " ",
            show: true,
        }];

        vm.tableParams = new NgTableParams({

        }, {
            dataset: [], // vm.getAktivnosti(),
            counts: [], // Disable pagination
        });

        function init() {
            adminDataService.getCjenici(vm.klijentId).then(loadCompleted, loadFailed);
        }

        function loadCompleted(data) {
            vm.cjenici = data;
            vm.tableParams.settings({
                dataset: vm.cjenici,
            });
        }

        function loadFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("INTERNA_POGRESKA_SERVERA") + "</em>";
            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }
            Flash.create('danger', message, 'fixed-message');
            vm.cjenici = [];
        }


    }
})();
(function () {
    angular
        .module('zp.admin')
        .controller("adminDodajCjenikController", [
            '$location', '$routeParams', 'appService', '$filter', 'adminDataService', 'Flash', 'NgTableParams', adminController]);

    function adminController($location, $routeParams, appService, $filter, adminDataService, Flash, NgTableParams) {
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
            field: "Cijena",
            title: "Cijena",
            sortable: "Cijena",
            show: true,
        },
        {
            field: "MjernaJedinica",
            title: "",
            show: true
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
            adminDataService.getNoviCjenik(vm.klijentId).then(loadCompleted, loadFailed);
        }

        function jedinicnaCijenaChange(item) {
            // if (item.Status == 0) item.Status = 2;
        }

        function save() {
            adminDataService.addCjenik(vm.klijentId, { Id: vm.Id, VrijediOd:vm.DatumOd, VrijediDo: vm.DatumDo, CjenikId:vm.CjenikId, Pdv: vm.Pdv, Stavke: vm.Stavke }).then(saveCompleted, saveFailed);
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

        function loadFailed(error) {
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
            appService.disableChangeNotification();
            $location.path('/admin/cjenici');
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
    }
})();
(function () {
    angular
        .module('zp.admin')
        .controller("adminKolicineController", [
            '$location', '$routeParams', '$controller', 'appService', 'adminDataService', 'Flash', 'NgTableParams', 'ngDialog', '$filter', adminController]);

    function adminController($location, $routeParams, $controller, appService, adminDataService, Flash, NgTableParams, ngDialog, $filter) {
        appService.enableChangeNotification();
        var vm = this;
        vm.klijentId = appService.getKlijentId();
        vm.List = null;
        vm.Lokacije = null;
        vm.Lokacija = null;
        vm.cols = null;
        vm.tableParams = null;
        vm.changeDs = changeDs;
        vm.dodajKolicinu = dodajKolicinu;
        vm.obrisiKolicinu = obrisiKolicinu;
        vm.kolicinaOnChange = kolicinaOnChange;
        vm.save = save;
        vm.sumKolicina = sumKolicina;
        vm.sumKolicinaMjernaJedinica = sumKolicinaMjernaJedinica;
        vm.LokacijaIndex = null;
        vm.grupeLokacija = null;
        vm.getLokacijaIndex = getLokacijaIndex;
        vm.prikaziSveLokacije = !$routeParams.id;
        vm.Naselja = [];
        vm.editMode = false;

        init();
        function init() {
            adminDataService.getKolicine(vm.klijentId).then(loadCompleted, loadFailed);
            adminDataService.getGrupaLokacije(vm.klijentId).then(loadGrupeCompleted, loadGrupeFailed);
            adminDataService.getNaselja().then(loadNaseljaCompleted, loadFailed);
        }
        function loadNaseljaCompleted(data) {
            vm.Naselja = data;
        }

        function loadGrupeCompleted(data) {
            vm.grupeLokacija = data;
        }

        function loadGrupeFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("INTERNA_POGRESKA_SERVERA") + "</em>";
            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }
            Flash.create('danger', message, 'fixed-message');
        }

        function first(obj) {
            for (var index in obj) {
                return obj[index];
            }
        }

        function loadCompleted(data) {
            vm.List = data.Kolicine;
            vm.Lokacije = data.Lokacije;

            for (var index in vm.Lokacije) {
                vm.Lokacije[index].Grupa.Id = vm.Lokacije[index].Grupa.Id + "";
                vm.Lokacije[index].Naselje.Id = vm.Lokacije[index].Naselje.Id + "";
                vm.Lokacije[index].NaseljeLokacija = vm.Lokacije[index].Naselje.Naziv + " - " + vm.Lokacije[index].Naziv;
            }

            for (var i in vm.List) {
                for (var j in vm.List[i].Kolicine) {
                    vm.List[i].Kolicine[j].Broj = $filter("number")(vm.List[i].Kolicine[j].Broj, 2);
                }
            }

            vm.Tipovi = data.Tipovi;
            if ($routeParams.id) {
                vm.Lokacija = $routeParams.id + "";
            }
            else {
                vm.Lokacija = first(vm.Lokacije).Id + "";
            }

            vm.changeDs();
        }

        function loadFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("ERROR_UCITAVANJE_PODATAKA") + "</em>";
            Flash.create('danger', message, 'fixed-message');
            vm.List = [];
        }

        vm.cols = [{
            field: "VrstaTipNaziv",
            title: "Tip",
            sortable: "VrstaTipNaziv",
            show: false,
            groupable: "VrstaTipNaziv"
        }, {
            field: "VrstaNaziv",
            title: "Vrsta",
            sortable: "VrstaNaziv",
            show: true,
            filter: { 'VrstaNaziv': 'text' }
        }, {
            field: "Broj",
            title: "Količina",
            sortable: "Broj",
            filter: { 'Broj': 'text' },
            colspan: 2,
            show: true,
        },{
            field: "MjernaJedinica",
            title: "",
            show: true,
        }, {
            field: "Admin",
            title: "",
            show: true,
        }];

        vm.tableParams = new NgTableParams({
            sorting: { 'VrstaNaziv': "asc" },
            group: {
                VrstaTipNaziv: "asc"
            },
            count: appService.tableRowCount
        }, {
            dataset: [], // vm.getAktivnosti(),
        });

        function changeDs() {
            vm.tableParams.settings({
                dataset: getTipoviNaLokaciji(),
                counts: [] // Disable pagination
            });
        }

        function getTipoviNaLokaciji() {
            for (index in vm.List) {
                if (vm.List[index].Id == vm.Lokacija) {
                    var retList = [];
                    for (var i in vm.List[index].Kolicine) {
                        if (vm.List[index].Kolicine[i].Status != 3) {
                            retList.push(vm.List[index].Kolicine[i]);
                        }
                    }
                    return retList;
                }
            }
        }

        function dodajKolicinu() {
            var arrayTipovi = Object.keys(vm.Tipovi).map(function (key) { return vm.Tipovi[key] });
            vm.Tipovi = $filter('orderBy')(arrayTipovi, 'Naziv');
            
            for (var index in vm.Tipovi) {
                var arrayVrste = [];
                var objKeys = Object.keys(vm.Tipovi[index].Vrste);
                for (var index2 in objKeys) {
                    arrayVrste.push(vm.Tipovi[index].Vrste[objKeys[index2]]);
                }

                vm.Tipovi[index].Vrste = $filter('orderBy')(arrayVrste, 'Naziv');
            }

            var ngDialogModel = {
                Lokacija: getLokacija(),
                Tipovi: vm.Tipovi,
                List: vm.List,
                vm: vm
            };

            ngDialog.openConfirm({
                template: appService.apiRootUrl + 'app/admin/dodajKolicinu.html',
                className: 'ngdialog-theme-default',
                controllerAs: 'ctrlChild',
                data: angular.toJson(ngDialogModel)
            }).then(function (value) {

                var tip = null;
                for (var index in vm.Tipovi) {
                    if (value.TipId == vm.Tipovi[index].Id) {
                        tip = vm.Tipovi[index];
                    }
                }

                var vrsta = null;
                for (var index in tip.Vrste) {
                    if (value.VrstaId == tip.Vrste[index].Id) {
                        vrsta = tip.Vrste[index];
                    }
                }


                var kolicina = {
                    VrstaNaziv: vrsta.Naziv,
                    VrstaTipNaziv: tip.Naziv,
                    Broj: value.Broj,
                    VrstaMjernaJedinicaOznaka: vrsta.MjernaJedinica.Oznaka,
                    LokacijaNaziv: getLokacija().Naziv,
                    LokacijaId: getLokacija().Id,
                    VrstaId: value.VrstaId,
                    Status: 1
                };

                vm.List[getLokacijaListIndex()].Kolicine.push(kolicina);
                vm.tableParams.total(vm.List[getLokacijaListIndex()].Kolicine.length);
                vm.changeDs();
                vm.tableParams.reload();
            }, function (reason) {
                // todo
            });
        }

        function toNumber(num) {
            return parseFloat((num + "").replace(".", "").replace(",", "."));
        }
        function saveKolicine() {
            for (var i in vm.List) {
                for (var j in vm.List[i].Kolicine) {
                    vm.List[i].Kolicine[j].Broj = toNumber(vm.List[i].Kolicine[j].Broj);
                }
            }

            adminDataService.saveKolicine(vm.klijentId, vm.List).then(saveCompleted, saveFailed);
        }

        function save() {
            adminDataService.updateLokacija(vm.klijentId, { Id: vm.Lokacije[getLokacijaIndex()].Id, Naziv: vm.Lokacije[getLokacijaIndex()].Naziv, GrupaLokacijaId: vm.Lokacije[getLokacijaIndex()].Grupa.Id, NaseljeId: vm.Lokacije[getLokacijaIndex()].Naselje.Id }).then(saveLokacijaCompleted, saveLokacijaFailed);
        }

        function saveLokacijaCompleted() {
            // $location.path('/admin/registers/lokacije');
            // var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("SPREMANJE_USPJESNO", vm.naziv) + "</em>";
            // Flash.create('info', message, 'fixed-message');
            saveKolicine();
        }

        function saveLokacijaFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("ERROR_DODAJ_PODATAK") + "</em>";
            Flash.create('danger', message, 'fixed-message');
            vm.List = [];
        }

        function saveCompleted() {
            var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("SPREMANJE_USPJESNO") + "</em>";
            Flash.create('info', message, 'fixed-message');
            appService.disableChangeNotification();
            window.location.reload();
            // $location.path('/admin/kolicine/' + $routeParams.id);
        }

        function saveFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("ERROR_DODAJ_PODATAK") + "</em>";

            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }
            Flash.create('danger', message, 'fixed-message');
        }

        function obrisiKolicinu(kolicina) {
            ngDialog.openConfirm({
                template: appService.apiRootUrl + 'app/admin/confirmDeleteDialog.html',
                className: 'ngdialog-theme-default',
                data: angular.toJson(kolicina)
            }).then(function (value) {
                for (index in vm.List[getLokacijaListIndex()].Kolicine) {
                    if (vm.List[getLokacijaListIndex()].Kolicine[index].Id == value.Id) {
                        vm.List[getLokacijaListIndex()].Kolicine[index].Status = 3; // obrisan
                    }
                }
                vm.changeDs();
            }, function (reason) {
                // todo
            });
        }

        function kolicinaOnChange(aktivnost) {
            if (aktivnost.Status == 0) aktivnost.Status = 2;
        }

        function getLokacija() {
            return vm.Lokacije[getLokacijaIndex()];
        }

        function getLokacijaIndex() {
            for (var index in vm.Lokacije) {
                if (vm.Lokacije[index].Id == vm.Lokacija) return index;
            }
        }

        function getLokacijaListIndex() {
            for (var index in vm.List) {
                if (vm.List[index].Id == vm.Lokacija) return index;
            }
            var naziv = vm.Lokacije[getLokacijaIndex()].Naziv;
            var id = vm.Lokacije[getLokacijaIndex()].Id;

            vm.List.push({ Id: id, Naziv: naziv, Kolicine: [] });
            return getLokacijaListIndex();
        }

        function sumKolicinaTotal(rowGroup) {
            suma = {};
            var changes = false;

            for (var index in rowGroup) {
                if (!suma[rowGroup[index].VrstaMjernaJedinicaOznaka]) suma[rowGroup[index].VrstaMjernaJedinicaOznaka] = 0;
                suma[rowGroup[index].VrstaMjernaJedinicaOznaka] += toNumber(rowGroup[index].Broj);
            }

            var list = [];
            for (var index in suma) {
                var newObj = { MjernaJedinica: index, Kolicina: suma[index] };
                list.push(newObj);
            }

            return list;
        }

        function sumKolicina(rowGroup) {
            var kolicine = sumKolicinaTotal(rowGroup);
            var list = [];
            for (var index in kolicine) {
                list.push(kolicine[index].Kolicina)
            }
            return list;
        }

        function sumKolicinaMjernaJedinica(rowGroup, index) {
            var kolicine = sumKolicinaTotal(rowGroup);
            return kolicine[index].MjernaJedinica;
        }
    }
})();
(function () {
    angular
        .module('zp.admin')
        .controller('adminDialogDodajKolicinuController', function dialogController() {
            vm = this;
            // vm.data = data;
            vm.isDisabledTip = isDisabledTip;
            vm.isDisabledVrsta = isDisabledVrsta;
            vm.getTip = getTip;
            vm.getVrsta = getVrsta;
            vm.getMjernaJedinica = getMjernaJedinica;

            function getVrsta(data, tipId, vrstaId) {
                var tip = getTip(tipId, data);
                var vrsta = null;
                if (tip) {
                    vrsta = filterVrsta(tip.Vrste, vrstaId);
                }
                return vrsta;
            }

            function getMjernaJedinica(data, tipId, vrstaId) {
                var vrsta = getVrsta(data, tipId, vrstaId);
                var mjernajedinica = {};
                if (vrsta) {
                    mjernajedinica = vrsta.MjernaJedinica;
                }
                return mjernajedinica.Oznaka;
            }

            function filterVrsta(data, vrstaId) {
                var vrsta;
                for (var index in data) {
                    if (data[index].Id == vrstaId) {
                        vrsta = data[index];
                    }
                }
                return vrsta;
            }

            function getTip(tipId, tipovi) {
                var tip;
                for (var index in tipovi) {
                    if (tipovi[index].Id == tipId) {
                        tip = tipovi[index];
                    }
                }
                return tip;
            }

            function isDisabledTip(data, tip) {
                for (var vrstaIndex in tip.Vrste) {
                    if (isDisabledVrsta(data, tip.Vrste[vrstaIndex])) {
                        continue;
                    }
                    else {
                        return false;
                    }
                }
                return true;
            }

            function isDisabledVrsta(data, vrsta) {
                for (var lokacijaIndex in data.List) {
                    if (data.List[lokacijaIndex].Id == data.Lokacija.Id) {
                        for (var kolicineIndex in data.List[lokacijaIndex].Kolicine) {
                            if (data.List[lokacijaIndex].Kolicine[kolicineIndex].VrstaNaziv == vrsta.Naziv && 
                                vrsta.Tip.Naziv == data.List[lokacijaIndex].Kolicine[kolicineIndex].VrstaTipNaziv) {
                                return true;
                            }
                        }
                    }
                }
                return false;
            }
           
        });
})();
(function () {
    angular
        .module('zp.admin')
        .controller("adminProblemiController", [
            'appService', 'adminDataService', 'Flash', 'NgTableParams', 'ngDialog', '$filter', adminController]);

    function adminController(appService, adminDataService, Flash, NgTableParams, ngDialog, $filter) {
        var vm = this;
        vm.List = null;
        vm.apiRootUrl = appService.apiRootUrl;
        vm.klijentId = appService.getKlijentId();

        vm.tableParams = new NgTableParams({
            sorting: { Id: "desc" },
            count: appService.tableRowCount,
        }, {
            dataset: [],
            counts: [], // Disable pagination
        });

        init();

        function init() {
            adminDataService.getProblemi().then(loadCompleted, loadFailed);
        }

        function loadCompleted(data) {
            vm.List = data;
            vm.tableParams.settings({
                dataset: vm.List,
            });
        }

        function loadFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("INTERNA_POGRESKA_SERVERA") + "</em>";
            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }
            Flash.create('danger', message, 'fixed-message');
        }
    }
})();
(function () {
    angular
        .module('zp.admin')
        .controller("adminProblemController", [
            'appService', 'adminDataService', 'Flash', 'NgTableParams', 'ngDialog', '$routeParams', '$filter', adminController]);

    function adminController(appService, adminDataService, Flash, NgTableParams, ngDialog, $routeParams, $filter) {
        var vm = this;
        vm.Data = null;
        vm.klijentId = appService.getKlijentId();
        vm.id = $routeParams.id;

        init();

        function init() {
            adminDataService.getProblem(vm.id).then(loadCompleted, loadFailed);
        }

        function loadCompleted(data) {
            vm.Data = data;
        }

        function loadFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("INTERNA_POGRESKA_SERVERA") + "</em>";
            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }
            Flash.create('danger', message, 'fixed-message');
        }
    }
})();
(function () {
    angular
        .module('zp.admin')
        .controller("adminPostavkeController", [
            'appService', 'adminDataService', 'Flash', 'NgTableParams', 'ngDialog', '$filter', adminController]);

    function adminController(appService, adminDataService, Flash, NgTableParams, ngDialog, $filter) {
        appService.enableChangeNotification();
        var vm = this;
        vm.List = null;
        vm.klijentId = appService.getKlijentId();
        vm.remove = remove;

        vm.tableParams = new NgTableParams({
            sorting: { Id: "asc" },
            count: appService.tableRowCount,
        }, {
            dataset: [],
            counts: [], // Disable pagination
        });

        init();

        function init() {
            adminDataService.getPostavke(vm.klijentId).then(loadCompleted, loadFailed);
        }

        function loadCompleted(data) {
            vm.List = data;
            vm.tableParams.settings({
                dataset: vm.List,
            });
        }

        function loadFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("INTERNA_POGRESKA_SERVERA") + "</em>";
            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }
            Flash.create('danger', message, 'fixed-message');
        }

        function remove(item) {
            ngDialog.openConfirm({
                template: appService.apiRootUrl + 'app/admin/confirmDeleteDialog.html',
                className: 'ngdialog-theme-default',
                data: angular.toJson(item)
            }).then(function (data) {
                adminDataService.removePostavka(data).then(deleteCompleted, deleteFailed);
            });

            function deleteCompleted() {
                var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("PODATAK_OBRISAN") + "</em>";
                Flash.create('info', message, 'fixed-message');
                init();
            }

            function deleteFailed() {
                if (error.status == 401) window.location.reload();
                var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("BRISANJE_POGRESKA") + "</em>";
                Flash.create('danger', message, 'fixed-message');
            }
        }
    }
})();
(function () {
    angular
        .module('zp.admin')
        .controller("adminPostavkeAddController", [
            '$location', '$routeParams', 'appService', 'adminDataService', 'Flash', adminController]);

    function adminController($location, $routeParams, appService, adminDataService, Flash) {
        appService.enableChangeNotification();
        var vm = this;
        vm.List = null;
        vm.klijentId = appService.getKlijentId();
        vm.Id = null;
        vm.Vrijednost = null;
        vm.Naziv = null;
        vm.save = save;

        function save() {
            adminDataService.addPostavka({ Id: vm.Id, Naziv: vm.Naziv, Vrijednost: vm.Vrijednost }).then(saveCompleted, saveFailed);
        }

        function saveCompleted() {
            var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("SPREMANJE_USPJESNO") + "</em>";
            Flash.create('info', message, 'fixed-message');
            appService.disableChangeNotification();
            $location.path('/admin/postavke');
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
    }
})();
(function () {
    angular
        .module('zp.admin')
        .controller("adminPostavkeEditController", [
            '$location', '$routeParams', 'appService', 'adminDataService', 'Flash', adminController]);

    function adminController($location, $routeParams, appService, adminDataService, Flash) {
        appService.enableChangeNotification();
        var vm = this;
        vm.List = null;
        vm.klijentId = appService.getKlijentId();
        vm.id = $routeParams.id;
        vm.naziv = null;
        vm.oznaka = null;
        vm.tipovi = null;
        vm.vrste = null;
        vm.save = save;

        init();

        function init() {
            adminDataService.getPostavka(vm.id).then(loadCompleted, loadFailed);
        }

        function loadCompleted(data) {
            vm.Id = data.Id;
            vm.Naziv = data.Naziv;
            vm.Vrijednost = data.Vrijednost;
        }

        function loadFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("INTERNA_POGRESKA_SERVERA") + "</em>";
            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }
            Flash.create('danger', message, 'fixed-message');
        }

        function save() {
            adminDataService.updatePostavka({ Id: vm.Id, Naziv: vm.Naziv, Vrijednost: vm.Vrijednost }).then(saveCompleted, saveFailed);
        }

        function saveCompleted() {
            var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("SPREMANJE_USPJESNO", vm.Naziv) + "</em>";
            Flash.create('info', message, 'fixed-message');
            appService.disableChangeNotification();
            $location.path('/admin/postavke');
        }

        function saveFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("ERROR_DODAJ_PODATAK") + "</em>";
            Flash.create('danger', message, 'fixed-message');
            vm.List = [];
        }
    }
})();
(function () {
    angular
        .module('zp.admin')
        .controller('adminKreirajKorisnikaController', ['appService', 'adminDataService', 'Flash', adminKreirajKorisnikaController]);

    function adminKreirajKorisnikaController(appService, adminDataService, Flash) {
        appService.enableChangeNotification();
        var vm = this;
        vm.kreirajKorisnika = kreirajKorisnika;
        vm.eMail = "";
        vm.klijentId = null;
        vm.klijenti = [];

        init();

        function init() {
            adminDataService.getKlijenti().then(getKlijentiCompleted, getKlijentiFailed);
        };

        function kreirajKorisnika() {
            adminDataService.kreirajKorisnika(vm.eMail, vm.klijentId).then(kreirajKorisnikaCompleted, kreirajKorisnikaFailed);
        }

        function kreirajKorisnikaCompleted(response) {
            var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("SPREMANJE_USPJESNO") + "</em>";
            Flash.create('info', message, 'fixed-message');
        }

        function kreirajKorisnikaFailed(error) {
            if (error.status == 401) window.location.reload();

            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("INTERNA_POGRESKA_SERVERA") + "</em>";

            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }

            Flash.create('danger', message, 'fixed-message');
        }

        function getKlijentiCompleted(response) {
            vm.klijenti = response;
        }

        function getKlijentiFailed(error) {
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("INTERNA_POGRESKA_SERVERA") + "</em>";

            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }

            Flash.create('danger', message, 'fixed-message');
        }
    }
})();
(function () {
    angular
        .module('zp.admin')
        .controller("adminResourceController", [
            'appService', 'adminDataService', 'Flash', 'NgTableParams', 'ngDialog', '$filter', adminController]);

    function adminController(appService, adminDataService, Flash, NgTableParams, ngDialog, $filter) {
        var vm = this;
        vm.List = null;
        vm.klijentId = appService.getKlijentId();
        vm.remove = remove;

        vm.tableParams = new NgTableParams({
            sorting: { Id: "asc" },
            count: appService.tableRowCount,
        }, {
            dataset: [],
            counts: [], // Disable pagination
        });

        init();

        function init() {
            adminDataService.getResources(vm.klijentId).then(loadCompleted, loadFailed);
        }

        function loadCompleted(data) {
            vm.List = data;
            vm.tableParams.settings({
                dataset: vm.List,
            });
        }

        function loadFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("INTERNA_POGRESKA_SERVERA") + "</em>";
            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR") + "</strong> Admin <em>" + error.data.ExceptionMessage + "</em>";
            }
            Flash.create('danger', message, 'fixed-message');
        }

        function remove(item) {
            ngDialog.openConfirm({
                template: appService.apiRootUrl + 'app/admin/confirmDeleteDialog.html',
                className: 'ngdialog-theme-default',
                data: angular.toJson(item)
            }).then(function (data) {
                adminDataService.removeResource(data).then(deleteCompleted, deleteFailed);
            });

            function deleteCompleted() {
                var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("PODATAK_OBRISAN") + "</em>";
                Flash.create('info', message, 'fixed-message');
                init();
            }

            function deleteFailed() {
                if (error.status == 401) window.location.reload();
                var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("POGRESKA_BRISANJE") + "</em>";
                Flash.create('danger', message, 'fixed-message');
            }
        }
    }
})();
(function () {
    angular
        .module('zp.admin')
        .controller("adminResourceAddController", [
            '$location', '$routeParams', 'appService', 'adminDataService', 'Flash', adminController]);

    function adminController($location, $routeParams, appService, adminDataService, Flash) {
        appService.enableChangeNotification();
        var vm = this;
        vm.List = null;
        vm.klijentId = appService.getKlijentId();
        vm.Id = null;
        vm.Vrijednost = null;
        vm.Naziv = null;
        vm.save = save;

        function save() {
            adminDataService.addResource({ Id: vm.Id, Naziv: vm.Naziv, Vrijednost: vm.Vrijednost }).then(saveCompleted, saveFailed);
        }

        function saveCompleted() {
            appService.disableChangeNotification();
            var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("SPREMANJE_USPJESNO", vm.Naziv) + "</em>";
            Flash.create("info", message, 'fixed-message');

            $location.path('/admin/resource');
        }

        function saveFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("INTERNA_POGRESKA_SERVERA") + "</em>";
            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR")  + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }
            Flash.create('danger', message, 'fixed-message');
            vm.List = [];
        }
    }
})();
(function () {
    angular
        .module('zp.admin')
        .controller("adminResourceEditController", [
            '$location', '$routeParams', 'appService', 'adminDataService', 'Flash', adminController]);

    function adminController($location, $routeParams, appService, adminDataService, Flash) {
        appService.enableChangeNotification();
        var vm = this;
        vm.List = null;
        vm.klijentId = appService.getKlijentId();
        vm.id = $routeParams.id;
        vm.naziv = null;
        vm.oznaka = null;
        vm.tipovi = null;
        vm.vrste = null;
        vm.save = save;

        init();

        function init() {
            adminDataService.getResource(vm.id).then(loadCompleted, loadFailed);
        }

        function loadCompleted(data) {
            vm.Id = data.Id;
            vm.Naziv = data.Naziv;
            vm.Vrijednost = data.Vrijednost;
        }

        function loadFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("INTERNA_POGRESKA_SERVERA") + "</em>";
            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }
            Flash.create('danger', message, 'fixed-message');
        }

        function save() {
            adminDataService.updateResource({ Id: vm.Id, Naziv: vm.Naziv, Vrijednost: vm.Vrijednost }).then(saveCompleted, saveFailed);
        }

        function saveCompleted() {
            appService.disableChangeNotification();
            var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("SPREMANJE_USPJESNO", vm.Naziv) + "</em>";
            Flash.create('info', message, 'fixed-message');

            $location.path('/admin/resource');
        }

        function saveFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("ERROR_DODAJ_PODATAK") + "</em>";
            Flash.create('danger', message, 'fixed-message');
            vm.List = [];
        }
    }
})();
(function () {
    angular
        .module('zp.admin')
        .controller("adminKlijentiController", [
            'appService', 'adminDataService', 'Flash', 'NgTableParams', 'ngDialog', '$filter', adminController]);

    function adminController(appService, adminDataService, Flash, NgTableParams, ngDialog, $filter) {
        var vm = this;
        vm.List = null;
        vm.klijentId = appService.getKlijentId();
        vm.remove = remove;
        vm.select = select;

        vm.tableParams = new NgTableParams({
            sorting: { Naziv: "asc" },
            count: appService.tableRowCount,
        }, {
            dataset: [],
            counts: [], // Disable pagination
        });

        init();

        function init() {
            adminDataService.getKlijenti(vm.klijentId).then(loadCompleted, loadFailed);
        }

        function loadCompleted(data) {
            vm.List = data;
            vm.tableParams.settings({
                dataset: vm.List,
            });
        }

        function loadFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("INTERNA_POGRESKA_SERVERA") + "</em>";
            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }
            Flash.create('danger', message, 'fixed-message');
        }

        function remove(item) {
            ngDialog.openConfirm({
                template: appService.apiRootUrl + 'app/admin/confirmDeleteDialog.html',
                className: 'ngdialog-theme-default',
                data: angular.toJson(item)
            }).then(function (data) {
                adminDataService.removeKlijent(data).then(deleteCompleted, deleteFailed);
            });

            function deleteCompleted() {
                var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("PODATAK_OBRISAN") + "</em>";
                Flash.create('info', message, 'fixed-message');
                init();
            }

            function deleteFailed() {
                if (error.status == 401) window.location.reload();
                var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("BRISANJE_POGRESKA") + "</em>";
                Flash.create('danger', message, 'fixed-message');
            }
        }

        function select(item) {
            adminDataService.selectKlijent(item).then(selectCompleted, selectFailed);
        }

        function selectCompleted() {
            var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("KLIJENT_PROMIJENJEN") + "</em>";
            Flash.create('info', message, 'fixed-message');
        }

        function selectFailed() {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("PROMJENA_KLIJENTA_POGRESKA") + "</em>";
            Flash.create('danger', message, 'fixed-message');
        }
    }
})();
(function () {
    angular
        .module('zp.admin')
        .controller("adminAddKlijentController", [
            '$location', '$routeParams', 'appService', 'adminDataService', 'Flash', adminController]);

    function adminController($location, $routeParams, appService, adminDataService, Flash) {
        appService.enableChangeNotification();
        var vm = this;
        vm.save = save;

        vm.klijent = {
            naziv: '',
            info: '',
            grupa: null
        };

        vm.grupe = [];

        adminDataService.getGrupeKlijenata().then(getGrupeKlijenataCompleted, getGrupeKlijenataFailed);

        function save() {
            var grupaId = vm.klijent.grupa ? vm.klijent.grupa.Id : null;

            adminDataService.addKlijent(vm.klijentId, { naziv: vm.klijent.naziv, info: vm.klijent.info, grupaId: grupaId }).then(saveCompleted, saveFailed);
        }

        function saveCompleted() {
            var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("SPREMANJE_USPJESNO", vm.naziv) + "</em>";
            Flash.create('info', message, 'fixed-message');
            appService.disableChangeNotification();
            $location.path('/admin/klijenti');
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

        function getGrupeKlijenataCompleted(data) {
            vm.grupe = data;
        }

        function getGrupeKlijenataFailed() {

        }
    }
})();
(function () {
    angular
        .module('zp.admin')
        .controller("adminEditKlijentController", [
            '$location', '$routeParams', 'appService', 'adminDataService', 'Flash', adminController]);

    function adminController($location, $routeParams, appService, adminDataService, Flash) {
        appService.enableChangeNotification();
        var vm = this;
        vm.klijentId = appService.getKlijentId();
        vm.id = $routeParams.id;
        vm.naziv = null;
        vm.info = null;
        vm.save = save;
        vm.grupe = [];

        init();

        function init() {
            adminDataService.getKlijent(vm.id).then(loadCompleted, loadFailed);
            adminDataService.getGrupeKlijenata().then(getGrupeKlijenataCompleted, getGrupeKlijenataFailed);
        }

        function loadCompleted(data) {
            vm.id = data.Id;
            vm.naziv = data.Naziv;
            vm.info = data.Info;
            vm.grupa = { Id: data.GrupaId };
        }

        function loadFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("INTERNA_POGRESKA_SERVERA") + "</em>";
            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }
            Flash.create('danger', message, 'fixed-message');
        }
        
        function save() {
            var grupaId = vm.grupa ? vm.grupa.Id : null;
            adminDataService.updateKlijent({ Id: vm.id, Naziv: vm.naziv, Info: vm.info, GrupaId: grupaId }).then(saveCompleted, saveFailed);
        }

        function saveCompleted() {
            appService.disableChangeNotification();
            $location.path('/admin/klijenti');
            var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("SPREMANJE_USPJESNO", vm.naziv) + "</em>";
            Flash.create('info', message, 'fixed-message');
        }

        function saveFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("ERROR_DODAJ_PODATAK") + "</em>";
            Flash.create('danger', message, 'fixed-message');
            vm.List = [];
        }

        function getGrupeKlijenataCompleted(data) {
            vm.grupe = data;
        }

        function getGrupeKlijenataFailed() {

        }
    }
})();
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
(function () {
    angular
        .module('zp.admin')
        .controller('adminKorisnikController', ['appService', 'adminDataService', 'Flash', '$routeParams', adminKorisnikController]);

    function adminKorisnikController(appService,adminDataService,Flash,$routeParams) {
        var vm = this;
        vm.naziv = "";
        vm.klijent = "";
        vm.samoIzvjestaji = false;
        vm.save = save;
        adminDataService.getKorisnik($routeParams.id).then(getKorisnikCompleted, getKorisnikFailed);

        function getKorisnikCompleted(data) {
            vm.naziv = data.Naziv;
            vm.klijent = data.KlijentNaziv;
            vm.samoIzvjestaji = data.SamoIzvjestaji;
        }

        function getKorisnikFailed() {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("INTERNA_POGRESKA_SERVERA") + "</em>";
            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }
            Flash.create('danger', message, 'fixed-message');
        }

        function save() {
            adminDataService.updateKorisnik($routeParams.id, vm.samoIzvjestaji).then(saveCompleted, saveFailed);
        }

        function saveCompleted(data) {
            var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("SPREMANJE_USPJESNO") + "</em>";
            Flash.create('info', message, 'fixed-message');
        }

        function saveFailed(error) {
            if (error.status == 401) window.location.reload();

            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("ERROR_DODAJ_PODATAK") + "</em>";

            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }

            Flash.create('danger', message, 'fixed-message');            
        }
    }
})();
(function () {
    angular
        .module('zp.admin')
        .controller("adminNaseljeController", [
            'appService', 'adminDataService', 'Flash', 'NgTableParams', 'ngDialog', '$filter', adminController]);

    function adminController(appService, adminDataService, Flash, NgTableParams, ngDialog, $filter) {
        var vm = this;
        vm.List = null;
        vm.remove = remove;

        vm.tableParams = new NgTableParams({
            sorting: { Naziv: "asc" },
            count: appService.tableRowCount,
        }, {
            dataset: [],
            counts: [], // Disable pagination
        });

        init();

        function init() {
            adminDataService.getNaselja().then(loadCompleted, loadFailed);
        }

        function loadCompleted(data) {
            vm.List = data;
            vm.tableParams.settings({
                dataset: vm.List,
            });
        }

        function loadFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("INTERNA_POGRESKA_SERVERA") + "</em>";
            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR") + "</strong> Admin <em>" + error.data.ExceptionMessage + "</em>";
            }
            Flash.create('danger', message, 'fixed-message');
        }

        function remove(item) {
            ngDialog.openConfirm({
                template: appService.apiRootUrl + 'app/admin/confirmDeleteDialog.html',
                className: 'ngdialog-theme-default',
                data: angular.toJson(item)
            }).then(function (data) {
                adminDataService.removeNaselje(data.Id).then(deleteCompleted, deleteFailed);
            });

            function deleteCompleted() {
                var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("PODATAK_OBRISAN") + "</em>";
                Flash.create('info', message, 'fixed-message');
                init();
            }

            function deleteFailed() {
                if (error.status == 401) window.location.reload();
                var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("POGRESKA_BRISANJE") + "</em>";
                Flash.create('danger', message, 'fixed-message');
            }
        }
    }
})();
(function () {
    angular
        .module('zp.admin')
        .controller("adminNaseljeAddController", [
            '$location', '$routeParams', 'appService', 'adminDataService', 'Flash', adminController]);

    function adminController($location, $routeParams, appService, adminDataService, Flash) {
        appService.enableChangeNotification();
        var vm = this;
        vm.List = null;
        vm.Id = null;
        vm.Naziv = null;
        vm.save = save;

        function save() {
            adminDataService.addNaselje({ Id: vm.Id, Naziv: vm.Naziv }).then(saveCompleted, saveFailed);
        }

        function saveCompleted() {
            appService.disableChangeNotification();
            var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("SPREMANJE_USPJESNO", vm.Naziv) + "</em>";
            Flash.create("info", message, 'fixed-message');

            $location.path('/admin/naselja');
        }

        function saveFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("INTERNA_POGRESKA_SERVERA") + "</em>";
            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR")  + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }
            Flash.create('danger', message, 'fixed-message');
            vm.List = [];
        }
    }
})();
(function () {
    angular
        .module('zp.admin')
        .controller("adminNaseljeEditController", [
            '$location', '$routeParams', 'appService', 'adminDataService', 'Flash', adminController]);

    function adminController($location, $routeParams, appService, adminDataService, Flash) {
        appService.enableChangeNotification();
        var vm = this;
        vm.List = null;
        vm.id = $routeParams.id;
        vm.naziv = null;
        vm.oznaka = null;
        vm.tipovi = null;
        vm.vrste = null;
        vm.save = save;

        init();

        function init() {
            adminDataService.getNaselje(vm.id).then(loadCompleted, loadFailed);
        }

        function loadCompleted(data) {
            vm.Id = data.Id;
            vm.Naziv = data.Naziv;
            vm.Vrijednost = data.Vrijednost;
        }

        function loadFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("INTERNA_POGRESKA_SERVERA") + "</em>";
            if (error.data && error.data.ExceptionMessage) {
                message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + error.data.ExceptionMessage + "</em>";
            }
            Flash.create('danger', message, 'fixed-message');
        }

        function save() {
            adminDataService.updateNaselje(vm.Id, vm.Naziv).then(saveCompleted, saveFailed);
        }

        function saveCompleted() {
            appService.disableChangeNotification();
            var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("SPREMANJE_USPJESNO", vm.Naziv) + "</em>";
            Flash.create('info', message, 'fixed-message');

            $location.path('/admin/naselja');
        }

        function saveFailed(error) {
            if (error.status == 401) window.location.reload();
            var message = "<strong>" + appService.getResource("ERROR") + "</strong>&nbsp;<em>" + appService.getResource("ERROR_DODAJ_PODATAK") + "</em>";
            Flash.create('danger', message, 'fixed-message');
            vm.List = [];
        }
    }
})();
(function () {
    angular.module('zp.admin').directive('klijent', ['apiRoot', function (apiRoot) {
        return {
            restrict: 'E',
            scope: {
                klijentData: '=',
                grupe: '='
            },
            templateUrl: apiRoot + 'app/admin/klijent.html'
        };
    }]);
})();