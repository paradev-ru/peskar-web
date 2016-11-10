angular.module('myApp.factories', [])

    .factory('TitleFactory', function() {
        var title = 'Dashboard';
        return {
            get: function() {
                return title + ' | Peskar';
            },

            set: function(newTitle) {
                title = newTitle;
            },
        };
    });
