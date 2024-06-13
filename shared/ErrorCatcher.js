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