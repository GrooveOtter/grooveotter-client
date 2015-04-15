angular.module('gotr')
    .controller('DashboardController', DashboardController);

DashboardController.$inject = ['Session'];
function DashboardController(Session) {
    /**
     * @namespace
     * @alias DashboardController
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
     */
    function start() {
        vm.session = new Session(vm.taskName, vm.choice * 60 * 1000);
        vm.session.start();
    }

    /**
     * Indicates whether the user has initiated the session
     * @memberof DashboardController
     */
    function isStarted() {
        return vm.session != null;
    }

    function complete() {
        vm.session.complete();
        vm.session = null;
    }
}
