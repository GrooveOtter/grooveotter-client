angular.module('gotr')
    .config(Router);

Router.$inject = ['$routeProvier', '$locationProvider'];
function Router($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'demo.html',
            controller: 'DemoController as vm'
        });

    $locationProvider.html5Mode(true);
}
