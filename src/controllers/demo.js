angular.module('gotr')
    .controller('DemoController', DemoController);

DemoController.$inject = ['$scope', 'clock'];
function DemoController($scope, clock) {
    var vm = this;

    vm.inputSeconds = 0;
    vm.duration = -1000;
    vm.clock = clock;
    vm.start = start;
    vm.started = false;
    vm.timeLeft = timeLeft;

    $scope.$watch('vm.clock.elapsedTime', function(time) {
        if (time >= vm.duration) {
            clock.stop();
        }
    });

    function start() {
        vm.duration = 1000 * vm.inputSeconds;
        clock.reset();
        clock.start();
        vm.started = true;
    }

    function timeLeft() {
        return vm.duration - vm.clock.elapsedTime + 1000;
    }
}
