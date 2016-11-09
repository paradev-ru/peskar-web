angular.module('myApp.controllers', [])

    .controller('JobsController', function ($scope, $interval, API) {
        $scope.online = true;
        $scope.jobs = {};

        Boot();

        $interval(function() {
            Boot();
        }, 5000);

        function Boot() {
            GetStatus();
            GetJobs();
        }

        function GetStatus() {
            API.getStatus()
                .success(function (result) {
                    $scope.online = true;
                })
                .error(function (result) {
                    $scope.online = false;
                });
        }

        function GetJobs() {
            API.getJobs()
                .success(function (result) {
                    $scope.jobs = result;
                });
        }
    })

    .controller('WorkersController', function ($scope, $interval, API) {
        $scope.online = true;
        $scope.workers = {};

        Boot();

        $interval(function() {
            Boot();
        }, 5000);

        function Boot() {
            GetStatus();
            GetWorkers();
        }

        function GetStatus() {
            API.getStatus()
                .success(function (result) {
                    $scope.online = true;
                })
                .error(function (result) {
                    $scope.online = false;
                });
        }

        function GetWorkers() {
            API.getWorkers()
                .success(function (result) {
                    $scope.workers = result;
                });
        }
    });
