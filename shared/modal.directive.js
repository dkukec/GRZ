(function () {
    angular
        .module('zp.shared')
        .directive('modal', modal);

    function modal() {
        return {
            restrict: 'E',
            scope: {
                visible: '=',
                message: '=',
                modalType: '=',
                onClose: '&'
            },
            templateUrl: '/app/shared/modal.html',
            controller: ModalController,
            controllerAs: 'vm',
            bindToController: true
        };
    }

    ModalController.inject = ['$scope'];

    function ModalController($scope) {
        var vm = this;
        vm.close = close;
        vm.isError = (vm.modalType == 'error');

        function close() {
            vm.visible = false;
            vm.onClose({ message: vm.message });
        }
    }
})();