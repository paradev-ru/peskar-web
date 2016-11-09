angular.module('myApp.services', [])

    .service('API', function ($http) {
        var apiHost = 'http://api.peskar.paradev.ru'
        this.getStatus = function () {
            return $http.get(
                apiHost + '/health/'
            );
        };
        this.getJobs = function () {
            return $http.get(
                apiHost + '/job/'
            );
        };
        this.getWorkers = function () {
            return $http.get(
                apiHost + '/worker/'
            );
        };
        this.getJob = function (jobId) {
            return $http.get(
                apiHost + '/job/'+jobId+'/'
            );
        };
    });
