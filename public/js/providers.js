angular.module('myApp.providers', [])

    .provider('notification', function() {
        this.$get = function(toastr) {
            return function(type, message) {
                var title = '';

                if (type !== 'error' && type !== 'warning' && type !== 'success') {
                    type = 'info';
                }

                if (type === 'success') {
                    title = 'Good news!';
                } else if (type === 'error') {
                    title = 'Oops! Something went wrong.';
                }

                toastr[type](message, title);
            };
        };
    });
