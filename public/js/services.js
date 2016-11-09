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
        this.addJob = function (job) {
            return $http.post(
                apiHost + '/job/',
                job
            );
        };
        this.deleteJob = function (jobId) {
            return $http.delete(
                apiHost + '/job/'+jobId+'/'
            );
        };
    });
