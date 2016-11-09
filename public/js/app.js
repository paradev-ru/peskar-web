angular.module('myApp', [
    'myApp.controllers',
    'myApp.services',
    'myApp.filters',
    'myApp.providers',
    'myApp.factories',
    'toastr',
    'ngRoute',
    'ui.bootstrap',
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

            .otherwise('/');
    })

    .run(function($rootScope, TitleFactory) {
        $rootScope.partialsPath = 'partials';
        $rootScope.TitleFactory = TitleFactory;
    })
