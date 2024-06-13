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