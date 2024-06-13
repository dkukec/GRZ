/// <reference path="realizacija/props.filter.js" />
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            dist: {
                files: [
                    {
                        src: [
                          'app.module.js',
                          'app.config.js',
                          'app.services.js'],
                        dest: 'build/app.js'
                    },
                    {
                        src: [
                          'plan/plan.module.js',
                          'plan/plan.config.js',
                          'plan/UnosPlana.controller.js',
                          'plan/ListPlana.controller.js',
                          'plan/specifikacijaTip.directive.js',
                          'plan/planDataService.service.js'],
                        dest: 'build/plan.js'
                    },
                    {
                        src: [
                          'realizacija/realizacija.module.js',
                          'realizacija/realizacija.config.js',
                          'realizacija/props.filter.js',
                          'realizacija/realizacija.odabir.controller.js',
                          'realizacija/realizacija.controller.js',
                          'realizacija/realizacijaDataService.service.js',
                          'realizacija/realizacijaPlanaFilter.directive.js'
                        ],
                        dest: 'build/realizacija.js'
                    },
                    {
                        src: [
                          'reports/reports.module.js',
                          'reports/reports.controller.js',
                          'reports/rekapitulacija.controller.js',
                          'reports/reports.config.js',
                          'reports/reports.service.js',
                          'reports/troskovnikIRacun.controller.js',
                          'reports/pdfReport.controller.js',
                          'reports/usporedbaPlana.controller.js',
                          'reports/usporedba.controller.js',
                          'reports/reports-root.controller.js'
                        ],
                        dest: 'build/reports.js'
                    },
                    {
                        src: [
                            'admin/admin.module.js',
                            'admin/admin.config.js',
                            'admin/adminDataService.service.js',
                            'admin/adminRegisterLokacijeController.controller.js',
                            'admin/adminRegisterMjerneJedniniceController.controller.js',
                            'admin/adminRegisterStandardneAktivnostiController.controller.js',
                            'admin/adminRegisterTipoviController.controller.js',
                            'admin/adminRegisterVrsteController.controller.js',
                            'admin/adminRegisterEditLokacijeController.controller.js',
                            'admin/adminRegisterEditMjerneJedniniceController.controller.js',
                            'admin/adminRegisterEditStandardneAktivnostiController.controller.js',
                            'admin/adminRegisterEditTipoviController.controller.js',
                            'admin/adminRegisterEditVrsteController.controller.js',
                            'admin/adminRegisterAddLokacijeController.controller.js',
                            'admin/adminRegisterAddMjerneJedniniceController.controller.js',
                            'admin/adminRegisterAddStandardneAktivnostiController.controller.js',
                            'admin/adminRegisterAddTipoviController.controller.js',
                            'admin/adminRegisterAddVrsteController.controller.js',
                            'admin/adminRegisterGrupaLokacijeController.controller.js',
                            'admin/adminRegisterAddGrupaLokacijeController.controller.js',
                            'admin/adminRegisterEditGrupaLokacijeController.controller.js',
                            'admin/adminCjenikController.controller.js',
                            'admin/adminCjeniciController.controller.js',
                            'admin/adminDodajCjenikController.controller.js',
                            'admin/adminKolicineController.controller.js',
                            'admin/adminDialogDodajKolicinu.controller.js',
                            'admin/adminProblemiController.controller.js',
                            'admin/adminProblemController.controller.js',
                            'admin/adminPostavkeController.controller.js',
                            'admin/adminPostavkeAddController.controller.js',
                            'admin/adminPostavkeEditController.controller.js',
                            'admin/adminKreirajKorisnikaController.js',
                            'admin/adminResourceController.controller.js',
                            'admin/adminResourceAddController.controller.js',
                            'admin/adminResourceEditController.controller.js',
                            'admin/adminKlijentiController.controller.js',
                            'admin/adminAddKlijentController.controller.js',
                            'admin/adminEditKlijentController.controller.js',
                            'admin/adminKorisniciController.controller.js',
                            'admin/adminKorisnikController.controller.js',
                            'admin/adminNaseljeController.controller.js',
                            'admin/adminNaseljeAddController.controller.js',
                            'admin/adminNaseljeEditController.controller.js',
                            'admin/klijentDirective.js'
                        ],
                        dest: 'build/admin.js'
                    },
                    {
                        src: [
                            'dashboard/dashboard.module.js',
                            'dashboard/dashboard.controller.js',
                            'dashboard/dashboard.config.js',
                        ],
                        dest: 'build/dashboard.js'
                    },
                    {
                        src: [
                          'shared/shared.module.js',
                          'shared/ngModal.js',
                          'shared/accordion.directive.js',
                          'shared/gzrTooltip.directive.js',
                          'shared/gzrActiveMenu.directive.js',
                          'shared/gzrReportProblem.directive.js',
                          'shared/paginator.directive.js',
                          'shared/ErrorCatcher.js',
                          'shared/MenuController.js'
                        ],
                        dest: 'build/shared.js'
                    },
                ]
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'app*.js', 'plan/*.js', 'realizacija/*.js', 'shared/*.js', 'reports/*.js']
        },
        uglify: {
            my_target: {
                files: {
                    'min/zp.min.js': ['build/app.js', 'build/shared.js', 'build/plan.js', 'build/reports.js', 'build/realizacija.js', 'build/admin.js', 'build/dashboard.js']
                }
            }
        },
        less: {
            development: {
                options: {
                    paths: ["../bootstrap-3.3.5/less"]
                },
                files: {
                    "../content/base.css": "../content/base.less"
                }
            }
        }
    });

    // Load the plugin that provides the "concat" task.
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Load the plugin that provides the "jshint" task.
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Load the plugin that provides the "less" task.
    grunt.loadNpmTasks('grunt-contrib-less');

    // Default task(s).
    grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'less']);
};