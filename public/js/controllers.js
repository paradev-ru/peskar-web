angular.module("app")
    .controller("MainCtrl", function ($scope, $interval, API) {
        $scope.online = true;
        $scope.jobs = {};
        $scope.workers = {};

        Boot();

        $interval(function() {
            Boot();
        }, 5000);

        function Boot() {
            GetStatus();
            GetWorkers();
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

        function GetWorkers() {
            API.getWorkers()
                .success(function (result) {
                    $scope.workers = result;
                });
        }

        function GetJobs() {
            API.getJobs()
                .success(function (result) {
                    $scope.jobs = result;
                });
        }
    });
