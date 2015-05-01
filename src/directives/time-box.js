angular.module('gotr')
    .directive('gotrTimeBox', TimeBox);

TimeBox.$inject = [];
function TimeBox() {
    var directive = {
        restrict: 'EA',
        replace: true,
        templateUrl: 'time-box.html',
        scope: {
            choice: '=',
            done: '&onDone'
        },
        controllerAs: 'vm',
        controller: TimeBoxController,
        bindToController: true
    };

    return directive;
}

TimeBoxController.$inject = [];
function TimeBoxController() {
    var vm = this;

    vm.input = vm.choice / (60 * 1000);
}
