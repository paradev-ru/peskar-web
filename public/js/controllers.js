angular.module('myApp.controllers', [])

    .controller('JobsController', function ($scope, $interval, $location, TitleFactory, API) {
        TitleFactory.set('Jobs');
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

        $scope.add = function() {
            $location.path('/add/job');
        };
    })

    .controller('WorkersController', function ($scope, $interval, TitleFactory, API) {
        TitleFactory.set('Workers');
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

    .controller('JobController', function ($scope, $routeParams, $location, notification, TitleFactory, API) {
        TitleFactory.set('Job');
        $scope.job = {};

        if (angular.isDefined($routeParams.jobId)) {
            $scope.jobId = $routeParams.jobId;

            API.getJob($scope.jobId)
                .success(function(job) {
                    $scope.job = job;
                });

            $scope.delete = function() {
                API.deleteJob($scope.jobId)
                    .success(function() {
                        $location.path('/job/');
                        notification('success', 'Deleted.');
                    })
                    .error(function(data) {
                        notification('error', data.message);
                    });
            };
        }

        $scope.save = function() {
            API.addJob($scope.job)
                .success(function(data) {
                    $location.path('/job/'+data.id);
                    notification('success', 'Saved.');
                })
                .error(function(data) {
                    notification('error', data.message);
                });
        };
    });
