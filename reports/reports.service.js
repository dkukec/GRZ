(function () {
    angular
        .module('zp.reports')
        .factory('reportsDataService', ['$http', 'apiRoot', function ($http, apiRoot) {
            var service = {
                getReports: getReports,
                urlBase: apiRoot + 'api/report/',
                validateReports: validateReports,
                list: {},
                getTroskovnikReports: getTroskovnikReports,
                getUsporedbaPlanaReports: getUsporedbaPlanaReports,
                getUsporedbaReports: getUsporedbaReports,
                getPdfReport: getPdfReport,
                getUsporedbaPdfReport: getUsporedbaPdfReport,
                getTroskovnikPDFReports: getTroskovnikPDFReports,
                getKlijentIRevizija: getKlijentIRevizija,
                getRekapitulacijaReports: getRekapitulacijaReports,
                getRekapitulacijaPDF: getRekapitulacijaPDF,
                send: send
            };

            function getReports(klijentId, planId) {
                return $http.get(this.urlBase + 'getReports', {
                    params: {
                        klijentId: klijentId,
                        planId: planId
                    }
                })
                    .then(getReportCompleted);

                function getReportCompleted(response) {
                    return response.data;
                }
            }

            function validateReports(IzvjestajId, DatumOd, DatumDo) {
                return $http.get(this.urlBase + 'getValidateReports', {
                    params: {
                        IzvjestajId: IzvjestajId,
                        DatumOd: DatumOd,
                        DatumDo: DatumDo
                    }
                })
                    .then(getReportCompleted);

                function getReportCompleted(response) {
                    return response.data;
                }
            }

            function send(MoguceVrijednostiReport, MoguciVremenskiPeriod, Lokacije, PeriodOd, PeriodDo, planId, klijentId) {
                service.list = {
                    IzvjestajId: MoguceVrijednostiReport,
                    LokacijaId: Lokacije,
                    PeriodId: MoguciVremenskiPeriod,
                    VrijemeOd: PeriodOd.getFullYear() + "-" + (PeriodOd.getMonth() + 1) + "-" + PeriodOd.getDate(),
                    VrijemeDo: PeriodDo.getFullYear() + "-" + (PeriodDo.getMonth() + 1) + "-" + PeriodDo.getDate(),
                    PlanId: planId,
                    KlijentId: klijentId
                };
            }

            function getTroskovnikReports() {
              //  console.log(service);
                return $http.get(this.urlBase + 'getTroskovnikReport', {
                    params: {
                        IzvjestajId: service.list.IzvjestajId,
                        LokacijaId: service.list.LokacijaId,
                        PeriodId: service.list.PeriodId,
                        VrijemeOd: service.list.VrijemeOd,
                        VrijemeDo: service.list.VrijemeDo,
                        PlanId: service.list.PlanId,
                        KlijentId: service.list.KlijentId
                        
                    }
                })
                    .then(getTroskovnikReportsCompleted);

                function getTroskovnikReportsCompleted(response) {
                    return response.data;
                }
            }

            function getTroskovnikPDFReports() {
                //  console.log(service);
                window.location.href = this.urlBase + '../../report/getTroskovnikReport?'+ "IzvjestajId=" + service.list.IzvjestajId + "&" + "LokacijaId=" + service.list.LokacijaId + "&" + "PeriodId=" + service.list.PeriodId + "&" + "VrijemeOd=" + service.list.VrijemeOd + "&" + "VrijemeDo=" + service.list.VrijemeDo + "&" + "PlanId=" + service.list.PlanId + "&" + "KlijentId=" + service.list.KlijentId;

                //return $http.get(this.urlBase + '../../report/getTroskovnikReport', {
                //    params: {
                //        IzvjestajId: service.list.IzvjestajId,
                //        LokacijaId: service.list.LokacijaId,
                //        PeriodId: service.list.PeriodId,
                //        VrijemeOd: service.list.VrijemeOd,
                //        VrijemeDo: service.list.VrijemeDo,
                //        PlanId: service.list.PlanId,
                //        KlijentId: service.list.KlijentId

                //    }
                //})
                //    .then(getTroskovnikPDFReportsCompleted);

                //function getTroskovnikPDFReportsCompleted(response) {
                //    return response.data;
                //}
            }

            function getPdfReport() {
                return $http.get(this.urlBase + 'getPdfReports', {
                    params: service.list
                })
                    .then(getPdfReportCompleted);

                function getPdfReportCompleted(response) {
                    // otvaranje pdf-a
                    window.location.href = response.data.ReportUrlPath;
                    return null;
                }
            }


            function getUsporedbaPdfReport(lokacijaId, godina) {
                //  console.log(service);
                window.location.href = this.urlBase + '../../report/GetUsporedba?lokacijaId=' + lokacijaId + "&" + "godina=" + godina;

            }

            function getRekapitulacijaPDF(lokacijaId, vrijemeOd, vrijemeDo) {
                window.location.href = this.urlBase + '../../report/GetRekapitulacija?' +
                    "lokacijaId=" + lokacijaId + "&" +
                    "vrijemeOd=" + vrijemeOd + "&" +
                    "vrijemeDo=" + vrijemeDo;
                return null;
            }



            function getUsporedbaPlanaReports() {
                return $http.get(this.urlBase + 'getUsporedbaPlanaReport', {
                    params: {
                        lokacijaId: service.list.LokacijaId,
                        klijentId: service.list.KlijentId,
                        vrijemeOd: service.list.VrijemeOd,
                        vrijemeDo: service.list.VrijemeDo
                    }
                })
                    .then(getUsporedbaPlanaReportsCompleted);

                function getUsporedbaPlanaReportsCompleted(response) {
                    return response.data;
                }
            }

            function getUsporedbaReports(lokacijaId, godina) {
                return $http.get(this.urlBase + 'getUsporedbaPlanaReport', {
                    params: {
                        lokacijaId: lokacijaId,
                        godina: godina
                    }
                })
                    .then(getUsporedbaPlanaReportsCompleted);

                function getUsporedbaPlanaReportsCompleted(response) {
                    return response.data;
                }
            }

            

            function getKlijentIRevizija() {
                return $http.get(this.urlBase + 'getKlijentIRevizija', {
                    params: {
                        lokacijaId: service.list.LokacijaId,
                        klijentId: service.list.KlijentId,
                        vrijemeOd: service.list.VrijemeOd,
                        vrijemeDo: service.list.VrijemeDo
                    }
                })
                    .then(getKlijentIRevizijaCompleted);

                function getKlijentIRevizijaCompleted(response) {
                    return response.data;
                }
            }
            function getRekapitulacijaReports(lokacijaId, vrijemeOd, vrijemeDo) {
                return $http.get(this.urlBase + 'getRekapitulacijaReport', {
                    params: {
                        LokacijaId: lokacijaId,
                        VrijemeOd: vrijemeOd,
                        VrijemeDo: vrijemeDo
                    }
                })
                   .then(getTroskovnikReportsCompleted);

                function getTroskovnikReportsCompleted(response) {
                    return response.data;
                }
            }
            return service;

        }]);
}
)();