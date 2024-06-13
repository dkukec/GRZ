(function () {
    angular.module('zp.shared', ["ErrorCatcher", "flash", 'ngDialog','zp']);
})();

(function () {
angular.module('zp.shared').directive('modal', function () {
    return {
        template: '<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content" ng-transclude><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="myModalLabel">Modal title</h4></div></div></div></div>',
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: { visible: '=', onSown: '&', onHide: '&' },
        link: function postLink(scope, element, attrs) {

            $(element).modal({
                show: false,
                // keyboard: attrs.keyboard,
                // backdrop: attrs.backdrop,
                closeOnEscape: false
            });

            scope.$watch(function () { return scope.visible; }, function (value) {

                if (value === true) {
                    $(element).modal('show');
                } else {
                    $(element).modal('hide');
                }
            });

            $(element).on('shown.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = true;
                });
            });

            $(element).on('shown.bs.modal', function () {
                scope.$apply(function () {
                    scope.onSown({});
                });
            });

            $(element).on('hidden.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = false;
                });
            });

            $(element).on('hidden.bs.modal', function () {
                scope.$apply(function () {
                    scope.onHide({});
                });
            });
        }
    };
}
);

angular.module('zp.shared').directive('modalHeader', function () {
    return {
        template: '<div class="modal-header"><h4 class="modal-title">{{title}}</h4></div>',
        replace: true,
        restrict: 'E',
        scope: { title: '@' }
    };
});

angular.module('zp.shared').directive('modalBody', function () {
    return {
        template: '<div class="modal-body" ng-transclude></div>',
        replace: true,
        restrict: 'E',
        transclude: true
    };
});

angular.module('zp.shared').directive('modalFooter', function () {
    return {
        template: '<div class="modal-footer" ng-transclude></div>',
        replace: true,
        restrict: 'E',
        transclude: true
    };
});
})();

(function () {
    angular
        .module('zp.shared')
        .directive('gzrAccordion', ['apiRoot', accordion]);

    function accordion(apiRoot) {
        return {
            restrict: 'E',
            scope: {
                heading: '='
            },
            transclude: true,
            templateUrl: apiRoot + 'app/shared/accordion.html',
            link: function (scope, element, attr) {
                element.find('.accordion-toggle-button').first().click(function (event) {
                    element.find('.accordion-toggle-button').toggleClass('active');
                    element.find('.accordion-content').first().toggleClass('hidden');
                    var glyph = element.find('.glyphicon');
                    glyph.toggleClass('glyphicon-chevron-up');
                    glyph.toggleClass('glyphicon-chevron-down');
                });
            }
        };
    }
})();
(function () {
    angular
        .module('zp.shared')
        .directive('gzrTooltip', ['apiRoot', gzrTooltip]);

    function gzrTooltip(apiRoot) {
        return {
            restrict: 'E',
            scope: {
                title: '=',
                placement: '=',
                selector: '='
            },
            link: function (scope, element, attr) {
                jQuery(document).ready(function () {
                    var numElements = 0;
                    var waitingElement = true;

                    var checkExist = setInterval(function () {
                        if ($(scope.selector).length) {
                            jQuery(scope.selector).attr("title", scope.title);
                            jQuery(scope.selector).tooltip({ placement: scope.placement });
                            // clearInterval(checkExist);
                        }
                    }, 750);           
                });
                
            }
        };
    }
})();
(function () {
    angular
        .module('zp.shared')
        .directive('gzrActiveMenu', ['apiRoot', gzrTooltip]);

    function gzrTooltip(apiRoot) {
        return {
            restrict: 'E',
            scope: {
                menu: '='
            },
            link: function (scope, element, attr) {
                jQuery(document).ready(function () {
                    var numElements = 0;
                    var waitingElement = true;

                    var checkExist = setInterval(function () {
                        var selectorMenu = "#nav-" + attr.menu;

                        if ($(selectorMenu).length) {
                            $(".navbar-nav .active").removeClass("active");
                            $(selectorMenu).addClass("active");
                            clearInterval(checkExist);
                        }
                    }, 750);           
                });
                
            }
        };
    }
})();
(function () {
    angular
        .module('zp.shared')
        .directive('gzrReportProblem', ['appService', 'apiRoot', 'ngDialog', 'Flash', gzrReportProblem]);

    function gzrReportProblem(appService, apiRoot, ngDialog, Flash) {
        return {
            restrict: 'A',
            templateUrl: apiRoot + 'app/shared/gzrReportProblem.html',
            replace: false,
            controller: gzrReportProblemController,
            controllerAs: 'vm',
            link: function (scope, element, attr) {
                element.click(function (event) {
                    scope.vm.openDialog();
                    // console.log(scope);
                    // alert("Click report problem");
                });
            },
            bindToController: true
        };
    }
    gzrReportProblemController.$inject = ['appService', 'ngDialog', 'Flash'];

    function gzrReportProblemController(appService,ngDialog, Flash) {
            var vm = this;
            vm.openDialog = openDialog;
            
            function openDialog() {
                ngDialog.openConfirm({
                    template: 'reportProblemDialog',
                    className: 'ngdialog-theme-default',
                    // data: angular.toJson({ data: { Aktivnosti: vm.data.Aktivnosti } })
                }).then(function (value) {
                    value.Location = window.location;
                    var xhttp = new XMLHttpRequest();
                    xhttp.addEventListener("load", sendComplete);
                    xhttp.open("POST", "/api/error/userSubmitProblem", true);
                    xhttp.setRequestHeader("Content-type", "application/json");
                    xhttp.send(JSON.stringify(value));

                }, function (reason) {
                    // todo
                });

                function sendComplete() {
                    var message = "<strong>" + appService.getResource("INFO") + "</strong>&nbsp;<em>" + appService.getResource("PROBLEM_ZAPRIMLJEN", vm.naziv) + "</em>";
                    Flash.create('info', message, 'fixed-message');
                }
            }
        }
    
})();
(function () {
    angular
        .module('zp.shared')
        .directive('paginator', paginator);

    function paginator() {
        return {
            restrict: 'E',
            templateUrl: '/app/shared/paginator.html',
            scope: {
                recordsNo: '=',
                recordsPerPage: '=',
                onPageChange: '&onPageChange'
            },
            controller: paginatorController,
            controllerAs: 'vm',
            bindToController: true
        };
    }

    function paginatorController() {
        var vm = this;
        vm.currentPage = 0;
        vm.lastPage = Math.ceil((vm.recordsNo - 1) / vm.recordsPerPage);
        vm.pageNumbers = [];
        vm.switchToPage = switchToPage;
        vm.previous = previous;
        vm.next = next;

        for (var i = 0; i <= vm.lastPage; i++) {
            vm.pageNumbers.push(i);
        }

        function switchToPage(page) {
            vm.currentPage = page;
            vm.onPageChange({ page: page });
        }

        function previous() {
            if (vm.currentPage > 0)
                vm.currentPage--;

            vm.onPageChange({ page: vm.currentPage });
        }

        function next() {
            if (vm.currentPage < vm.lastPage)
                vm.currentPage++;

            vm.onPageChange({ page: vm.currentPage });
        }
    }
})();
(function () {
    angular.module('ErrorCatcher', [])
        .factory('$exceptionHandler', function () {
            return function errorCatcherHandler(exception, cause, a) {
                var apiRoot = $("#linkApiRoot").attr("href");

                var obj = {
                    location: window.location,
                    stack: exception.stack,
                    "msg": exception.message,
                    "url": exception.fileName,
                    "line": exception.lineNumber,
                    "col": exception.columnNumber
                };
            
                var xhttp = new XMLHttpRequest();
                xhttp.open("POST", apiRoot + "api/error/autoSubmitAngularError", true);
                xhttp.setRequestHeader("Content-type", "application/json");
                xhttp.send(JSON.stringify(obj));

            };
        });
})();
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