(function () {
    angular.module('zp').factory('appService', ['apiRoot','$http','$rootScope',
        function (apiRoot, $http, $rootScope) {
            var url = apiRoot + 'api/admin/';
            var lastPageStatus = null;

            return {
                getKlijentId: getKlijentId,
                apiRootUrl: apiRoot,
                getKorisnik: getKorisnik,
                getKlijentiByKorisnik: getKlijentiByKorisnik,
                urlBase: apiRoot + 'api/admin/',
                getResource: getResource,
                tableRowCount: 10,
                disableChangeNotification: disableChangeNotification,
                enableChangeNotification: enableChangeNotification,
                changeNotification: changeNotification,
                OpenInNewTab: OpenInNewTab,
                isPageDirty: isPageDirty,
                selectKlijent: selectKlijent
            };

            // ovo je postalo obsolete i vraćam jedan samo zato da ne moramo preraditi cijelu angular aplikaciju. Klijent Id se izračunava unutar backend (server-side) 
            // na osnovu podatka o trenutnom korisniku koji je spojen. U angularu je nebitno koji broj šaljemo.
            function getKlijentId() {
                return 1;
            }

            function disableChangeNotification() {
                $rootScope.changeNotification = false;
            }

            function enableChangeNotification() {
                $rootScope.changeNotification = true;
            }

            function changeNotification() {
                return $rootScope.changeNotification;
            }

            function getKorisnik() {
                return $http.get(this.urlBase + 'GetKorisnik');
            }

            function getKlijentiByKorisnik(korisnikId) {
                return $http.get(this.urlBase + 'getKlijenti', { params: { korisnikId: korisnikId } }).then(getCompleted);

                function getCompleted(response) {
                    return response.data;
                }
            }

            function selectKlijent(klijentId) {
                return $http.post(this.urlBase + 'selectKlijent', {}, { params: { klijentId: klijentId } });
            }

            function getResurceSync() {
                if (typeof ActiveXObject == 'undefined') {
                    resource = new XMLHttpRequest();
                }
                else {
                    // IE
                    resource = new ActiveXObject("Microsoft.XMLHTTP");
                }

                resource.open('GET', url + 'getRersources', false);
                resource.setRequestHeader("accept", "application / json");
                resource.send(null);

                var response = angular.fromJson(resource.responseText);
                var obj = {};
                for (var index in response) {
                    obj[response[index].Naziv] = response[index].Vrijednost;
                }
                return obj;
            }

            function isPageDirty() {
                if (changeNotification()) {
                    var now = new Date();
                    if ($rootScope.lastCall) {
                        var tdiff = now.getTime() - $rootScope.lastCall.getTime();
                        $rootScope.lastCall = new Date();
                        if (tdiff < 250) {
                            $rootScope.lastCall = new Date();
                            return lastPageStatus;
                        }
                    }
                    $rootScope.lastCall = new Date();

                    var list = jQuery(".ng-dirty");
                    if (list.length) {
                        for (var index = 0; index < list.length; index++) {
                            if (jQuery(list[index]).hasClass("ng-ignore") === false) {
                                lastPageStatus = true;
                                return true;
                            }
                        }
                    }
                }
                lastPageStatus = false;
                return false;
            }

            function getResource(name, params) {
                if (!getResource.resourceList) {
                    getResource.resourceList = getResurceSync();
                }
               
                if (getResource.resourceList[name]) {
                    return getResource.resourceList[name];
                }
                return name;
            }

            function OpenInNewTab(url) {
                var win = window.open(url, '_blank');
                if (win) {
                    win.focus();
                }
            }
        }]);
})();