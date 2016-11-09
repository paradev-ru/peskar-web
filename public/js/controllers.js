angular.module('myApp.controllers', [])

    .controller('JobsController', function ($scope, $interval, API) {
        $scope.jobs = {};

        GetJobs();

        $interval(function() {
            GetJobs();
        }, 5000);

        function GetJobs() {
            API.getJobs()
                .success(function (result) {
                    $scope.jobs = result;
                });
        }
    })

    .controller('WorkersController', function ($scope, $interval, API) {
        $scope.workers = {};

        GetWorkers();

        $interval(function() {
            GetWorkers();
        }, 5000);

        function GetWorkers() {
            API.getWorkers()
                .success(function (result) {
                    $scope.workers = result;
                });
        }
    })

    .controller('JobController', function ($scope, $routeParams, API) {
        $scope.job = {};
        $scope.jobId = $routeParams.jobId;

        API.getJob($scope.jobId)
            .success(function(job) {
                $scope.job = job;
            });
    });
