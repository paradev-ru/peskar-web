angular.module('myApp.services', [])

    .service('API', function ($http, $rootScope, notification, conf) {
        this.getStatus = function () {
            return $http.get(
                conf.api + '/health/'
            );
        };
        this.getJobs = function () {
            return $http.get(
                conf.api + '/job/'
            );
        };
        this.getWorkers = function () {
            return $http.get(
                conf.api + '/worker/'
            );
        };
        this.getJob = function (jobId) {
            return $http.get(
                conf.api + '/job/'+jobId+'/'
            );
        };
        this.addJob = function (job) {
            return $http.post(
                conf.api + '/job/',
                job
            );
        };
        this.editJob = function (job) {
            job.log = "";
            return $http.put(
                conf.api + '/job/'+job.id+'/',
                job
            );
        };
        this.deleteJob = function (jobId) {
            return $http.delete(
                conf.api + '/job/'+jobId+'/'
            );
        };
        this.getVersion = function () {
            $http.get(conf.api + '/version/')
                .success(function(data) {
                    $rootScope.version = data;
                })
                .error(function() {
                    notification('error', 'Cant get version info');
                });
        };
        this.getStatus = function (url) {
            return $http.get(
                conf.api + '/http_status/?url='+url
            );
        };
        this.setState = function (jobId, state) {
            job = {
                state: state,
            }
            return $http.put(
                conf.api + '/job/'+jobId+'/',
                job
            );
        };
        this.deleteLog = function (jobId) {
            return $http.delete(
                conf.api + '/job/'+jobId+'/log/'
            );
        };
        this.deleteStateHistory = function (jobId) {
            return $http.delete(
                conf.api + '/job/'+jobId+'/state_history/'
            );
        };
        this.getLog = function (jobId) {
            return $http.get(
                conf.api + '/job/'+jobId+'/log/'
            );
        };
        this.getStateHistory = function (jobId) {
            return $http.get(
                conf.api + '/job/'+jobId+'/state_history/'
            );
        };
        this.getWorkTime = function () {
            return $http.get(
                conf.api + '/work_time/'
            );
        };
        this.getWeburgMovieInfo = function (url) {
            return $http.get(
                conf.api + '/weburg_movie_info/?url=' + url
            );
        };
    });
