angular.module('myApp', [
    'myApp.controllers',
    'myApp.services',
    'myApp.filters',
    'ngRoute',
    'ui.bootstrap',
])

    .config(function($routeProvider) {
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

            .when('/workers', {
                templateUrl: 'partials/views/workers.html',
                controller: 'WorkersController',
            })

            .when('/job/:jobId', {
                templateUrl: 'partials/views/job-show.html',
                controller: 'JobController',
            })

            .otherwise('/');
    })

    .run(function($rootScope) {
        $rootScope.partialsPath = 'partials';
    })
