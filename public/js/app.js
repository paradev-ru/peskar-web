angular.module('myApp', [
    'myApp.controllers',
    'myApp.services',
    'myApp.filters',
    'myApp.providers',
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
                controller: 'JobController',
            })

            .when('/job/:jobId', {
                templateUrl: 'partials/views/job-show.html',
                controller: 'JobController',
            })

            .when('/workers', {
                templateUrl: 'partials/views/workers.html',
                controller: 'WorkersController',
            })

            .otherwise('/');
    })

    .run(function($rootScope) {
        $rootScope.partialsPath = 'partials';
    })
