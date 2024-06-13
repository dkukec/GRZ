(function () {
    angular
        .module('zp.realizacija')
        .factory('realizacijaDataService', ['$http', 'apiRoot', function ($http, apiRoot) {
            var service = {
                getPlan: getRealizacija,
                save: save,
                getRealizacijaOdabir: getRealizacijaOdabir,
                getRealizirano: getRealizirano,
                uploadFile: uploadFile,
                urlBase: apiRoot + 'api/realizacija/'
            };

            function getRealizacija(id, datum, lokacijaId) {
                return $http.get(this.urlBase + 'GetRealizacija', {
                    params: {
                        id: id,
                        datum: datum,
                        lokacijaId: lokacijaId
                    }
                })
                    .then(getRealizacijaCompleted);

                function getRealizacijaCompleted(response) {
                    return response.data;
                }
            }

            function getRealizirano(id, datumOd, datumDo) {
                return $http.get(this.urlBase + 'GetRealizacija', {
                    params: {
                        id: id,
                        datumOd: datumOd,
                        datumDo: datumDo
                    }
                })
                    .then(getRealizacijaCompleted);

                function getRealizacijaCompleted(response) {
                    return response.data;
                }
            }

            function getRealizacijaOdabir(id) {
                return $http.get(this.urlBase + 'GetRealizacijaOdabir', {
                    params: {
                        id: id
                    }
                }).then(getRealizacijaOdabirCompleted);

                function getRealizacijaOdabirCompleted(response) {
                    return response.data;
                }
            }

            function save(data) {
                return $http.post(this.urlBase + 'Save', data).then(saveCompleted);

                function saveCompleted(response) {
                    return response.data;
                }
            }

            function uploadFile(file, realizacijaId, planId) {
                var fd = new FormData();
                file.realizacijaId = realizacijaId;
                fd.append('file', file);
                fd.append('realizacijaId', realizacijaId);
                fd.append('planId', planId);
                return $http.post(this.urlBase + 'UploadFile', fd, {
                    transformRequest: angular.identity,
                    headers: { 'Content-Type': undefined }
                }).success(UploadComplete);
                function UploadComplete(response) {
                    return response.data;
                }
            }

            return service;
        }]);
})();