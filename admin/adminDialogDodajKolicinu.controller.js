(function () {
    angular
        .module('zp.admin')
        .controller('adminDialogDodajKolicinuController', function dialogController() {
            vm = this;
            // vm.data = data;
            vm.isDisabledTip = isDisabledTip;
            vm.isDisabledVrsta = isDisabledVrsta;
            vm.getTip = getTip;
            vm.getVrsta = getVrsta;
            vm.getMjernaJedinica = getMjernaJedinica;

            function getVrsta(data, tipId, vrstaId) {
                var tip = getTip(tipId, data);
                var vrsta = null;
                if (tip) {
                    vrsta = filterVrsta(tip.Vrste, vrstaId);
                }
                return vrsta;
            }

            function getMjernaJedinica(data, tipId, vrstaId) {
                var vrsta = getVrsta(data, tipId, vrstaId);
                var mjernajedinica = {};
                if (vrsta) {
                    mjernajedinica = vrsta.MjernaJedinica;
                }
                return mjernajedinica.Oznaka;
            }

            function filterVrsta(data, vrstaId) {
                var vrsta;
                for (var index in data) {
                    if (data[index].Id == vrstaId) {
                        vrsta = data[index];
                    }
                }
                return vrsta;
            }

            function getTip(tipId, tipovi) {
                var tip;
                for (var index in tipovi) {
                    if (tipovi[index].Id == tipId) {
                        tip = tipovi[index];
                    }
                }
                return tip;
            }

            function isDisabledTip(data, tip) {
                for (var vrstaIndex in tip.Vrste) {
                    if (isDisabledVrsta(data, tip.Vrste[vrstaIndex])) {
                        continue;
                    }
                    else {
                        return false;
                    }
                }
                return true;
            }

            function isDisabledVrsta(data, vrsta) {
                for (var lokacijaIndex in data.List) {
                    if (data.List[lokacijaIndex].Id == data.Lokacija.Id) {
                        for (var kolicineIndex in data.List[lokacijaIndex].Kolicine) {
                            if (data.List[lokacijaIndex].Kolicine[kolicineIndex].VrstaNaziv == vrsta.Naziv && 
                                vrsta.Tip.Naziv == data.List[lokacijaIndex].Kolicine[kolicineIndex].VrstaTipNaziv) {
                                return true;
                            }
                        }
                    }
                }
                return false;
            }
           
        });
})();