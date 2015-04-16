angular.module('gotr')
    .directive('gotrSession', SessionDirective);

SessionDirective.$inject = [];
function SessionDirective() {
    var directive = {
        restrict: 'EA',
        replace: true,
        templateUrl: 'session.html',
        scope: {},
        controller: SessionController,
        controllerAs: 'vm',
        bindToController: true
    };

    return directive;
}

SessionController.$inject = ['Session'];
function SessionController(Session) {
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

    /**
     * Creates the session and starts it
     * @memberof SessionController
     */
    function start() {
        vm.session = new Session(vm.taskName, vm.choice * 60 * 1000);
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
        vm.session = null;
    }
}
