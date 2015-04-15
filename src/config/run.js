angular.module('gotr')
    .run(Run);

Run.$inject = ['$route', '$rootScope', 'tracker'];
function Run($route, $rootScope, tracker) {
    $rootScope.title = 'GrooveOtter';
    tracker.start();

    angular.element(window)
        .on('unload', tracker.persist)
        .on('blur', tracker.stop)
        .on('mousemove mousedown focus', tracker.action);

    $rootScope.$on('$routeChangeSuccess', function() {
        $rootScope.title = $route.current.title || $rootScope.title;
    });
}
