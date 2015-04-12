angular.module('gotr')
    .run(Run);

Run.$inject = ['$route', '$rootScope', 'tracker', 'trackerStore'];
function Run($route, $rootScope, tracker, trackerStore) {
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

    $rootScope.$on('$routeChangeSuccess', function() {
        $rootScope.title = $route.current.title;
    });
}
