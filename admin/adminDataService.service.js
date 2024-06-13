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