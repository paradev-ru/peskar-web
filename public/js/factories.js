angular.module('myApp.factories', [])

    .factory('TitleFactory', function() {
        var title = 'Задачи';
        return {
            get: function() {
                return title + ' | Пескарь';
            },

            set: function(newTitle) {
                title = newTitle;
            },
        };
    });
