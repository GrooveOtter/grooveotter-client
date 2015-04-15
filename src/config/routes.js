angular.module('gotr')
    .config(Router);

Router.$inject = ['$routeProvider', '$locationProvider'];
function Router($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'main.html',
            controller: 'MainController as vm'
        });

    $locationProvider.html5Mode(true);
}
