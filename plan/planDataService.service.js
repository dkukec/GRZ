(function () {
    angular
        .module('zp.plan')
        .factory('planDataService', ['$http','apiRoot', function ($http,apiRoot) {

            var service = {
                getNoviPlan: getNoviPlan,
                // getPlanovi: getPlanovi,
                getPlan: getPlan,
                save: save,
                lock: lock,
                getKalendar: getKalendar,
                getKalendarDashboard: getKalendarDashboard,
                getForYear: getForYear,
                urlBase: apiRoot + 'api/plan/'
            };

            function getNoviPlan(godina, cjenikId) {
                return $http.get(this.urlBase + 'GetNoviPlan', {
                    params: {
                        godina: godina,
                        cjenikId: cjenikId
                    }
                })
                    .then(getNoviPlanCompleted);

                function getNoviPlanCompleted(response) {
                    return response.data;
                }
            }

            function save(godina, revizija, lokacije, cjenikId) {
                var data = {
                    Godina: godina,
                    Revizija: revizija,
                    CjenikId: cjenikId,
                    Lokacije: lokacije
                };

                return $http.post(this.urlBase + 'SavePlan', data).then(saveCompleted);

                function saveCompleted(response) {
                    return response.data;
                }
            }

            function lock(klijentId, godina, revizija) {
                var data = {
                    klijentId: klijentId,
                    godina: godina,
                    revizija: revizija
                };

                return $http.post(this.urlBase + 'ZakljucajPlan', {}, { params: data }).then(lockCompleted);

                function lockCompleted(response) {
                    return response.data;
                }
            }

            function getPlanovi(klijentId) {
                return $http.get(this.urlBase + 'GetPlanovi', {
                    params: {
                        klijentId: klijentId
                    }
                })
                    .then(getPlanoviCompleted);

                function getPlanoviCompleted(response) {
                    return response.data;
                }
            }

            function getKalendar(klijentId, godina) {
                return $http.get(this.urlBase + '../Kalendar/GetKalendar', {
                    params: {
                        godina: godina,
                        klijentId: klijentId
                    }
                })
                    .then(getKalendarCompleted);

                function getKalendarCompleted(response) {
                    return response.data;
                }
            }

            function getKalendarDashboard(klijentId, godina) {
                return $http.get(this.urlBase + '../Kalendar/GetKalendarDashboard', {
                    params: {
                        godina: godina,
                        klijentId: klijentId
                    }
                })
                    .then(getKalendarCompleted);

                function getKalendarCompleted(response) {
                    return response.data;
                }
            }

            function getPlan(id) {
                return $http.get(this.urlBase + 'GetPlan', {
                    params: {
                        id: id
                    }
                })
                    .then(getPlanCompleted);

                function getPlanCompleted(response) {
                    return response.data;
                }
            }
            
            function getForYear(klijentId, year) {
                return $http.get(this.urlBase + '../Kalendar/getForYear', {
                    params: {
                        klijentId: klijentId,
                        year: year
                    }
                }).then(Completed);

                function Completed(response) {
                    return response.data;
                }
            }
            
            return service;
        }]);
})();