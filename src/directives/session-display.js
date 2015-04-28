angular.module('gotr')
    .directive('gotrSessionDisplay', SessionDisplayDirective);

SessionDisplayDirective.$inject = [];
function SessionDisplayDirective() {
    var directive = {
        restrict: 'EA',
        replace: true,
        templateUrl: 'session-display.html',
        scope: {
            taskList: '='
        },
        controller: SessionDisplayController,
        controllerAs: 'vm',
        bindToController: true
    };

    return directive;
}

SessionDisplayController.$inject = ['Task', 'userSession', '$document'];
function SessionDisplayController(Task, userSession, $document) {
    /**
     * @namespace
     * @alias SessionDisplayController
     */
    var vm = this;

    /** A reference to the userSession */
    vm.session = userSession;

    /** Indicates if the user is selecting a time */
    vm.selecting = false;

    vm.start = start;
    vm.archive = archive;
    vm.startSelecting = startSelecting;
    vm.stopSelecting = stopSelecting;

    function start() {
        archive();
        userSession.start();
    }

    function archive() {
        if (userSession.task.isNew) {
            userSession.task.isNew = false;
            vm.taskList.push(userSession.task);
        }
    }

    function startSelecting() {
        vm.selecting = true;
        $document.on('click', stopSelecting);
    }

    function stopSelecting(e) {
        vm.selecting = false;
        $document.off('click', stopSelecting);
    }
}
