angular.module('gotr')
    .directive('gotrSession', SessionDirective);

SessionDirective.$inject = [];
function SessionDirective() {
    var directive = {
        restrict: 'EA',
        replace: true,
        templateUrl: 'session.html',
        scope: {
            taskList: '='
        },
        controller: SessionController,
        controllerAs: 'vm',
        bindToController: true
    };

    return directive;
}

SessionController.$inject = ['Session', 'Task', '$element'];
function SessionController(Session, Task, $element) {
    /**
     * @namespace
     * @alias SessionController
     */
    var vm = this;

    /** The current session */
    vm.session = null;

    /** The choice of time limit in minutes */
    vm.choice = 15;

    /** Indicates if the user is selecting a time */
    vm.selecting = false;

    vm.start = start;
    vm.isStarted = isStarted;
    vm.complete = complete;
    vm.createTask = createTask;
    vm.reset = reset;

    /**
     * Creates the session and starts it
     * @memberof SessionController
     */
    function start($event) {
        var task = createTask($event);
        vm.session = new Session(task);
        vm.session.start();
    }

    /**
     * Indicates whether the user has initiated the session
     * @memberof SessionController
     */
    function isStarted() {
        return vm.session != null;
    }

    /**
     * Completes the session
     * @memberof SessionController
     */
    function complete() {
        vm.session.complete();
        reset();
    }

    /**
     * Create a task from the current input values
     * @memberof SessionController
     */
    function createTask() {
        var task = new Task(vm.taskName, vm.choice * 60 * 1000);
        $element.find('input')[0].blur();

        addTask(task);
        return task;
    }

    function addTask(task) {
        vm.taskList.push(task);
    }

    function reset() {
        vm.taskName = '';
        vm.choice = 15;
        vm.session = null;
    }
}
