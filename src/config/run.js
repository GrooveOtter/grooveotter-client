angular.module('gotr')
    .run(Run);

Run.$inject = ['$route', '$rootScope'];
function Run($route, $rootScope) {
    $rootScope.title = 'GrooveOtter';

    $rootScope.$on('$routeChangeSuccess', function() {
        $rootScope.title = $route.current.title;
    });
}
