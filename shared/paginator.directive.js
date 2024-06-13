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