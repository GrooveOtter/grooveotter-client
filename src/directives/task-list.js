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
function TaskListController() {
    var vm = this;

    vm.completed = completed;
    vm.uncompleted = uncompleted;
    vm.remove = remove;

    function completed() {
        return vm.taskList.filter(function(task) {
            return task.completed;
        });
    }

    function uncompleted() {
        return vm.taskList.filter(function(task) {
            return !task.completed;
        });
    }

    function remove(task) {
        var index = vm.taskList.indexOf(task);

        if (index === -1) {
            return;
        }

        vm.taskList.splice(index, 1);
    }
}
