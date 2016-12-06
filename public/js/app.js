angular.module('myApp', [
    'myApp.controllers',
    'myApp.services',
    'myApp.filters',
    'myApp.providers',
    'myApp.factories',
    'myApp.constants',
    'toastr',
    'ngRoute',
    'ui.bootstrap',
    'ngSanitize',
])

    .config(function($routeProvider, toastrConfig) {
        angular.extend(toastrConfig, {
            positionClass: 'toast-bottom-right',
            preventOpenDuplicates: true,
            timeOut: 10000,
        });

        $routeProvider
            .when('/', {
                redirectTo: function() {
                    return '/jobs';
                },
            })

            .when('/jobs', {
                templateUrl: 'partials/views/jobs.html',
                controller: 'JobsController',
            })

            .when('/add/job', {
                templateUrl: 'partials/views/job-add.html',
                controller: 'JobAddController',
            })

            .when('/job/:jobId', {
                templateUrl: 'partials/views/job-show.html',
                controller: 'JobDetailsController',
            })

            .when('/job/:jobId/edit', {
                templateUrl: 'partials/views/job-edit.html',
                controller: 'JobDetailsController',
            })

            .when('/workers', {
                templateUrl: 'partials/views/workers.html',
                controller: 'WorkersController',
            })

            .when('/config', {
                templateUrl: 'partials/views/config.html',
                controller: 'ConfigController',
            })

            .when('/work_time', {
                templateUrl: 'partials/views/work_time.html',
                controller: 'WorkTimeController',
            })

            .when('/weburg_movie_info', {
                templateUrl: 'partials/views/weburg_movie_info.html',
                controller: 'WeburgMovieInfo',
            })

            .otherwise('/');
    })

    .run(function($rootScope, TitleFactory, API) {
        $rootScope.partialsPath = 'partials';
        $rootScope.TitleFactory = TitleFactory;
        API.getVersion();
    })
