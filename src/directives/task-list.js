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

TaskListController.$inject = ['userSession'];
function TaskListController(userSession) {
    var vm = this;

    vm.session = userSession;

    vm.start = start;
    vm.remove = remove;
    vm.isComplete = isComplete;
    vm.isCurrent = isCurrent;

    function start(task) {
        if (!vm.isCurrent(task)) {
            vm.session.reset();
            vm.session.task = task;
            vm.session.start();
        }
    }

    function remove(task) {
        var index = vm.taskList.indexOf(task);

        if (index === -1) {
            return;
        }

        vm.taskList.splice(index, 1);

        if (isCurrent(task)) {
            userSession.reset();
        }
    }

    function isComplete(task) {
        return task.completed;
    }

    function isCurrent(task) {
        return userSession.task.id === task.id;
    }
}
