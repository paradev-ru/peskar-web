angular.module('myApp.factories', [])

    .factory('TitleFactory', function() {
        var title = 'Jobs';
        return {
            get: function() {
                return title + ' | Peskar';
            },

            set: function(newTitle) {
                title = newTitle;
            },
        };
    });
