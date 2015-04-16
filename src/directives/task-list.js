angular.module('gotr')
    .directive('gotrTaskList', TaskListDirective);

TaskListDirective.$inject = [];
function TaskListDirective() {
    var directive = {
        restrict: 'EA',
        replace: true,
        templateUrl: 'task-list.html',
        scope: {
            taskList: '='
        },
        controller: TaskListController,
        controllerAs: 'vm',
        bindToController: true
    };

    return directive;
}

TaskListController.$inject = [];
function TaskListController() {}
