angular.module("app")
    .filter("isEmpty", function () {
        var bar;
        return function (obj) {
            for (bar in obj) {
                if (obj.hasOwnProperty(bar)) {
                    return false;
                }
            }
            return true;
        };
    })
    .filter('diff', function() {
        return function(input) {
            input = new Date(input)
            var difference = new Date().getTime() - input;
            var seconds = Math.floor(difference/1000);
            var minutes = Math.floor(seconds/60);
            var hours = Math.floor(minutes/60);
            var days =  Math.floor(hours/24);
            var result = null;

            if (days) {
                result = days === 1 ? '1 day' : days + ' days';
            } else if (hours) {
                result = hours === 1 ? '1 hour' : hours + ' hours';
            } else if (minutes) {
                result = minutes === 1 ? '1 minute' : minutes + ' minutes';
            } else {
                result = seconds === 1 ? '1 second' : seconds + ' seconds';
            }

            return result;
        };
    });
