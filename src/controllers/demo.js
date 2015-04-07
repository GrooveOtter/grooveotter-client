angular.module('gotr')
    .controller('DemoController', DemoController);

DemoController.$inject = ['$scope', 'clock'];
function DemoController($scope, clock) {
    var vm = this;

    vm.clock = clock;
    vm.duration = 0;
    vm.choice = 10;
    vm.started = false;
    vm.selecting = false;
    vm.go = go;
    vm.isFinished = isFinished;
    vm.reset = reset;
    vm.timeLeft = timeLeft;

    $scope.$watch('vm.clock.elapsedTime', function(time) {
        if (isFinished()) {
            clock.stop();
        }
    });

    function go() {
        if (vm.choice > 0) {
            vm.duration = 1000 * vm.choice;
            clock.reset();
            clock.start();
            vm.started = true;
        }
    }

    function isFinished() {
        return clock.elapsedTime >= vm.duration;
    }

    function reset() {
        clock.reset();
        vm.started = false;
    }

    function timeLeft() {
        return vm.duration - vm.clock.elapsedTime + 1000;
    }
}
