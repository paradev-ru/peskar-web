angular.module('myApp.services', [])

    .service('API', function ($http, $rootScope, notification) {
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
        this.editJob = function (job) {
            return $http.put(
                apiHost + '/job/'+job.id+'/',
                job
            );
        };
        this.deleteJob = function (jobId) {
            return $http.delete(
                apiHost + '/job/'+jobId+'/'
            );
        };
        this.getVersion = function () {
            $http.get(apiHost + '/version/')
                .success(function(data) {
                    $rootScope.version = data;
                })
                .error(function() {
                    notification('error', 'Cant get version info');
                });
        };
        this.setState = function (jobId, state) {
            job = {
                state: state,
            }
            return $http.put(
                apiHost + '/job/'+jobId+'/',
                job
            );
        };
    });
