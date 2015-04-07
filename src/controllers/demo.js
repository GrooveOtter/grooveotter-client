angular.module('gotr')
    .controller('DemoController', DemoController);

DemoController.$inject = ['$scope', 'clock'];
function DemoController($scope, clock) {
    var vm = this;

    vm.duration = -1000;
    vm.clock = clock;
    vm.start = start;

    $scope.$watch('vm.clock.elapsedTime', function(time) {
        if (time >= vm.duration) {
            clock.stop();
        }
    });

    function start() {
        vm.duration = 1000 * vm.inputSeconds;
        clock.reset();
        clock.start();
    }
}
