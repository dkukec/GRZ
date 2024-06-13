(function () {
    angular
        .module('zp.realizacija')
        .directive('realizacijaPlanaFilter', ['apiRoot', '$routeParams', realizacijaPlanaFilter]);

    function realizacijaPlanaFilter(apiRoot, $routeParams) {
        return {
            restrict: 'E',
            scope: {
                onFilterChange: "&",
                lokacije: "=",
                datum: "="
            },
            controllerAs: 'ctrl',
            controller: realizacijaPlanaFilterController,
            bindToController: true,
            templateUrl: apiRoot + 'app/realizacija/realizacijaPlanaFilter.html'
        };
    }
    realizacijaPlanaFilterController.$inject = ['$scope', '$routeParams'];

    function realizacijaPlanaFilterController($scope, $routeParams) {
        var vm = this;
        var sveLokacijeConst = 'Sve lokacije';
        postaviLokacijeList(vm.lokacije);

        loadNaselja(vm.lokacije);

        vm.onNaseljeChange = function (selectedNaselje) {
            var lokacijeNaselja = [];

            for (var i in vm.lokacije) {
                var lokacija = vm.lokacije[i];

                if (lokacija.Naselje.Id == selectedNaselje.Id || selectedNaselje.Id === 0) {
                    lokacijeNaselja.push(lokacija);
                }
            }

            postaviLokacijeList(lokacijeNaselja);
            vm.onFilterChange({ lokacije: lokacijeNaselja, naselje: selectedNaselje });
        };

        vm.onLokacijaChange = function (selectedLokacija) {
            if (selectedLokacija.Id === 0) // magična lokacija 0 (sve lokacije)
                vm.onFilterChange({ lokacije: vm.lokacijeList.slice(1), naselje: vm.selectedNaselje }); // daj sve lokacije osim prve "Sve lokacije" (prazne)
            else
                vm.onFilterChange({ lokacije: [selectedLokacija], naselje: vm.selectedNaselje });
        };

        $scope.$watch('ctrl.lokacije', function (newValue, oldValue) {
            // ako su lokacije već učitane i postavljene, ne radi ništa
            if (oldValue === undefined) {
                vm.lokacije = newValue;
                postaviLokacijeList(vm.lokacije);
                loadNaselja(newValue);
            }
        });

        function loadNaselja(lokacije) {
            vm.naselja = [{
                Id: 0,
                Naziv: 'Sva naselja',
                brojRealizacija: 0,
                nazivBrojRealizacija: 'Sva naselja'
            }];

            function getNaselje(array, lokacija) {
                for (var index in array) {
                    if (array[index].Id == lokacija.Naselje.Id) {
                        return array[index];
                    }
                }

            }

            var brojRealizacijaUkupno = 0;

            for (var index in lokacije) {
                var lokacija = lokacije[index];
                // var naselje = vm.naselja.find(compareNaselja, lokacija);
                var naselje = getNaselje(vm.naselja, lokacija);

                if (!naselje) {
                    naselje = lokacija.Naselje;
                    naselje.brojRealizacija = 0;

                    vm.naselja.push(naselje);
                }

                // zbroji realizacije
                naselje.brojRealizacija += lokacija.brojRealizacija;

                // zbroji realizacije ukupno
                brojRealizacijaUkupno += lokacija.brojRealizacija;
            }

            if (parseInt($routeParams.naselje)) {
                for (var index2 in vm.naselja) {
                    if (vm.naselja[index2].Id == parseInt($routeParams.naselje)) {
                        vm.selectedNaselje = vm.naselja[index2];
                        break;
                    }
                }
            }

            // označi trenutno naselje "Sve" i postavi broj realizacija ukupno za njega
            vm.naselja[0].brojRealizacija = brojRealizacijaUkupno;
            if (!vm.selectedNaselje) {
                vm.selectedNaselje = vm.naselja[0];
            }
            

            // kreiraj naziv za naselja
            for (var i in vm.naselja) {
                vm.naselja[i].nazivBrojRealizacija = vm.naselja[i].Naziv + ' (' + vm.naselja[i].brojRealizacija + ')';
            }




            if (parseInt($routeParams.lokacija)) {
                for (var index3 in vm.lokacijeList) {
                    if (vm.lokacijeList[index3].Id == $routeParams.lokacija) {
                        vm.selectedLokacija = vm.lokacijeList[index3];
                        vm.onLokacijaChange(vm.selectedLokacija);
                        break;
                    }
                }
            }
        }

        function compareNaselja(currentValue, index, array) {
            return currentValue.Id == this.Naselje.Id;
        }

        function postaviLokacijeList(noveLokacije) {
            vm.lokacijeList = [
                {
                    Id: 0,
                    Naziv: sveLokacijeConst,
                    nazivBrojRealizacija: sveLokacijeConst
                }];

            if (noveLokacije !== undefined) {
                Array.prototype.push.apply(vm.lokacijeList, noveLokacije);
            }

            vm.selectedLokacija = vm.lokacijeList[0];
        }
    }
})();