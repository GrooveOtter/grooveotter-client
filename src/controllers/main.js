/**
 * @ngdoc controller
 * @name MainController
 */
angular.module('gotr')
    .controller('MainController', MainController);

MainController.$inject = ['$scope', 'clock', 'sessionStore'];
function MainController($scope, clock, sessionStore) {
    /**
     * @namespace
     * @alias MainController
     */
    var vm = this;

    /** An alias to the clock factory */
    vm.clock = clock;

    /** The total time for the current session in miliseconds */
    vm.duration = 0;

    /** The choice for duration in minutes */
    vm.choice = 10;

    /** Indicates whether the user has initiated the session */
    vm.started = false;

    /** Indicates whether the user is choosing a duration */
    vm.selecting = false;

    vm.go = go;
    vm.isFinished = isFinished;
    vm.reset = reset;
    vm.timeLeft = timeLeft;

    $scope.$watch('vm.clock.elapsedTime', function(time) {
        if (isFinished()) {
            clock.stop();

            var total = +sessionStore.get();
            sessionStore.store(total + clock.elapsedTime);
        }
    });

    /** Initiates the session */
    function go() {
        if (vm.choice > 0) {
            vm.duration = 60 * 1000 * vm.choice;
            clock.reset();
            clock.start();
            vm.started = true;
        }
    }

    /**
     * Indicates if the session has completed
     * @returns {Boolean}
     */
    function isFinished() {
        return clock.elapsedTime >= vm.duration;
    }

    /**
     * Resets the session
     */
    function reset() {
        clock.reset();
        vm.started = false;
    }

    /**
     * Returns the time remaining for the session in miliseconds
     * @returns {Number}
     */
    function timeLeft() {
        return vm.duration - vm.clock.elapsedTime + 999;
    }
}
