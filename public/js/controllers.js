angular.module('myApp.controllers', [])

    .controller('JobsController', function ($scope, $interval, $location, TitleFactory, API) {
        TitleFactory.set('Задачи');
        $scope.jobs = [];
        $scope.filterState = "all";

        var promise;

        $scope.start = function() {
            GetJobs()
            $scope.stop();
            promise = $interval(GetJobs, 5000);
        };

        $scope.stop = function() {
            $interval.cancel(promise);
        };

        $scope.start();

        $scope.$on('$destroy', function() {
            $scope.stop();
        });

        function GetJobs() {
            API.getJobs()
                .success(function (result) {
                    $scope.jobs = result;
                });
        }

        $scope.gotoadd = function() {
            $location.path('/add/job');
        };

        $scope.FilterState = function(job) {
            if ($scope.filterState == "all") {
                return true;
            } else if ($scope.filterState == job.state) {
                return true;
            }
            return false;
        };
    })

    .controller('WorkersController', function ($scope, $interval, TitleFactory, API) {
        TitleFactory.set('Агенты');
        $scope.workers = [];

        var promise;

        $scope.start = function() {
            GetWorkers()
            $scope.stop();
            promise = $interval(GetWorkers, 5000);
        };

        $scope.stop = function() {
            $interval.cancel(promise);
        };

        $scope.start();

        $scope.$on('$destroy', function() {
            $scope.stop();
        });

        function GetWorkers() {
            API.getWorkers()
                .success(function (result) {
                    $scope.workers = result;
                });
        }
    })

    .controller('JobDetailsController', function ($scope, $routeParams, $location, notification, TitleFactory, API) {
        TitleFactory.set('Детали');

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
                    notification('success', 'Обновлено');
                })
                .error(function(data) {
                    notification('error', data.message);
                });
        };

        $scope.disable = function () {
            API.setState($scope.jobId, 'canceled')
                .success(function(job) {
                    $scope.job = job;
                    notification('success', 'Обновлено');
                })
                .error(function(data) {
                    notification('error', data.message);
                });
        };

        $scope.enable = function () {
            API.setState($scope.jobId, 'pending')
                .success(function(job) {
                    $scope.job = job;
                    notification('success', 'Обновлено');
                })
                .error(function(data) {
                    notification('error', data.message);
                });
        };

        $scope.delete = function() {
            if (!confirm("Вы уверены?")) {
              return
            }
            API.deleteJob($scope.jobId)
                .success(function() {
                    $location.path('/job/');
                    notification('success', 'Удалено');
                })
                .error(function(data) {
                    notification('error', data.message);
                });
        };

        $scope.cancel = function() {
            $location.path('/job/'+$scope.jobId);
        };

        $scope.deleteLog = function() {
            API.deleteLog($scope.jobId)
                .success(function() {
                    $scope.job.log = "";
                    notification('success', 'Удалено');
                })
                .error(function(data) {
                    notification('error', data.message);
                });
        };

        $scope.deleteStateHistory = function() {
            API.deleteStateHistory($scope.jobId)
                .success(function() {
                    $scope.job.state_history = [];
                    notification('success', 'Удалено');
                })
                .error(function(data) {
                    notification('error', data.message);
                });
        };
    })

    .controller('JobAddController', function ($scope, $routeParams, $location, notification, TitleFactory, API) {
        TitleFactory.set('Новая задача');
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
                    notification('success', 'Сохранено');
                })
                .error(function(data) {
                    notification('error', data.message);
                });
        };

        $scope.cancel = function() {
            $location.path('/job');
        };
    })

    .controller('WorkTimeController', function ($scope, API) {
        API.getWorkTime()
                .success(function(data) {
                    $scope.work_time = data;
                });
    })

    .controller('WeburgMovieInfo', function ($scope, API, notification) {
        $scope.info = [];
        $scope.getInfo = function() {
            API.getWeburgMovieInfo($scope.url)
                .success(function(data) {
                    $scope.info = data;
                })
                .error(function() {
                    $scope.info = [];
                    notification('error', 'Не удалось получить информацию');
                });
        };
    })

    .controller('ConfigController', function ($scope) {

    });
