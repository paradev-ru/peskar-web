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

        $scope.gotoadd = function() {
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

    .controller('JobDetailsController', function ($scope, $routeParams, $location, notification, TitleFactory, API) {
        TitleFactory.set('Job details');

        $scope.jobId = $routeParams.jobId;

        API.getJob($scope.jobId)
            .success(function(job) {
                $scope.job = job;
            });

        $scope.gotoedit = function() {
            $location.path('/job/'+$scope.jobId+'/edit');
        };

        $scope.edit = function() {
            API.editJob($scope.job)
                .success(function() {
                    $location.path('/job/'+$scope.jobId);
                    notification('success', 'Updated');
                })
                .error(function(data) {
                    notification('error', data.message);
                });
        };

        $scope.disable = function () {
            API.setState($scope.jobId, 'canceled')
                .success(function(job) {
                    $scope.job = job;
                    notification('success', 'Updated');
                })
                .error(function(data) {
                    notification('error', data.message);
                });
        };

        $scope.enable = function () {
            API.setState($scope.jobId, 'pending')
                .success(function(job) {
                    $scope.job = job;
                    notification('success', 'Updated');
                })
                .error(function(data) {
                    notification('error', data.message);
                });
        };

        $scope.delete = function() {
            if (!confirm("Are you sure?")) {
              return
            }
            API.deleteJob($scope.jobId)
                .success(function() {
                    $location.path('/job/');
                    notification('success', 'Deleted');
                })
                .error(function(data) {
                    notification('error', data.message);
                });
        };

        $scope.cancel = function() {
            $location.path('/job/'+$scope.jobId);
        };
    })

    .controller('JobAddController', function ($scope, $routeParams, $location, notification, TitleFactory, API) {
        TitleFactory.set('Creating job');
        $scope.status_ok = false;
        $scope.job = {};

        $scope.check = function() {
            if ($scope.job.download_url === undefined) {
                $scope.status_ok = false
                return
            }
            API.getStatus($scope.job.download_url)
                .success(function() {
                    $scope.status_ok = true;
                })
                .error(function() {
                    $scope.status_ok = false
                });
        };

        $scope.save = function() {
            API.addJob($scope.job)
                .success(function(data) {
                    $location.path('/job/'+data.id);
                    notification('success', 'Saved');
                })
                .error(function(data) {
                    notification('error', data.message);
                });
        };

        $scope.cancel = function() {
            $location.path('/job');
        };
    });
