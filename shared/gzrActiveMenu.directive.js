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