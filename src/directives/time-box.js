angular.module('gotr')
    .directive('gotrTimeBox', TimeBox);

TimeBox.$inject = [];
function TimeBox() {
    var directive = {
        restrit: 'EA',
        replace: true,
        templateUrl: 'time-box.html',
        scope: {
            onChoice: '&'
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

    vm.choose = function(choice) {
        vm.onChoice({choice: choice});
    };
}
