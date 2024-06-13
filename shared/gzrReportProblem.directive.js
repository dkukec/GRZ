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