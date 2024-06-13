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