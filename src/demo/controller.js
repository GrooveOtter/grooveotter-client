angular.module('gotr')
    .controller('DemoController', DemoController);

DemoController.$inject = ['clock'];
function DemoController(clock) {
    var vm = this;

    vm.clock = clock;
}
