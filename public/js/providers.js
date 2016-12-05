angular.module('myApp.providers', [])

    .provider('notification', function() {
        this.$get = function(toastr) {
            return function(type, message) {
                var title = '';

                if (type !== 'error' && type !== 'warning' && type !== 'success') {
                    type = 'info';
                }

                if (type === 'success') {
                    title = 'Хорошие новости';
                } else if (type === 'error') {
                    title = 'Что-то пошло не так';
                }

                toastr[type](message, title);
            };
        };
    });
