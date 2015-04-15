angular.module('gotr')
    .config(Router);

Router.$inject = ['$routeProvider', '$locationProvider'];
function Router($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'dashboard.html',
            controller: 'DashboardController as vm'
        });

    $locationProvider.html5Mode(true);
}
