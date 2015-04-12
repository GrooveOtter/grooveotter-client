angular.module('gotr')
    .run(Run);

Run.$inject = ['$route', '$rootScope', 'tracker'];
function Run($route, $rootScope, tracker) {
    $rootScope.title = 'GrooveOtter';
    tracker.start();

    angular.element(window).on('unload', function() {
        var time = +localStorage.getItem('time') || 0;

        tracker.stop();
        localStorage.setItem('time', time + tracker.elapsedTime);
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
