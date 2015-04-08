angular.module('gotr')
    .config(Router);

Router.$inject = ['$routeProvider', '$locationProvider'];
function Router($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'demo.html',
            controller: 'DemoController as vm',
            title: 'Demo'
        });

    $locationProvider.html5Mode(true);
}
