angular.module('gotr')
    .run(Run);

Run.$inject = ['$route', '$rootScope', 'tracker'];
function Run($route, $rootScope, tracker) {
    $rootScope.title = 'GrooveOtter';
    tracker.start();

    angular.element(window).on('unload', function() {
        var time = +localStorage.getItem('item') || 0;

        tracker.stop();
        localStorage.setItem('time', time + tracker.elapsedTime);
    });

    $rootScope.$on('$routeChangeSuccess', function() {
        $rootScope.title = $route.current.title;
    });
}
