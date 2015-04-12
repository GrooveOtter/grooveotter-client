angular.module('gotr')
    .run(Run);

Run.$inject = ['$route', '$rootScope', 'tracker', 'trackerStore', 'debounce'];
function Run($route, $rootScope, tracker, trackerStore, debounce) {
    $rootScope.title = 'GrooveOtter';
    tracker.start();

    angular.element(window).on('unload', function() {
        var time = +trackerStore.get();

        tracker.stop();
        trackerStore.store(time + tracker.elapsedTime);
    });

    angular.element(window).on('focus', function() {
        tracker.start();
    });

    angular.element(window).on('blur', function() {
        tracker.stop();
    });

    angular.element(window).on('mousemove mousedown', debounce(function() {
        tracker.stop();
        tracker.elapsedTime -= 3 * 60 * 1000;
    }, 3 * 60 * 1000));

    $rootScope.$on('$routeChangeSuccess', function() {
        $rootScope.title = $route.current.title;
    });
}
