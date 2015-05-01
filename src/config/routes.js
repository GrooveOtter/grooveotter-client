angular.module('gotr')
    .config(Router);

Router.$inject = ['$routeProvider', '$locationProvider'];
function Router($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'dashboard.html',
            controller: 'DashboardController as vm',
            resolve: {
                taskList: TaskList
            }
        });

    $locationProvider.html5Mode(true);
}

TaskList.$inject = ['taskListStore', 'Task'];
function TaskList(taskListStore, Task) {
    return taskListStore.get().then(function(ts) {
        return ts.map(function(task) {
            return new Task(task.title, task.limit);
        });
    });
}
