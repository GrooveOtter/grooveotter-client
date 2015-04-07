angular.module('gotr')
    .directive('gotrTimeBox', TimeBox);

TimeBox.$inject = [];
function TimeBox() {
    var directive = {
        restrit: 'EA',
        replace: true,
        templateUrl: 'time-box.html',
        scope: {
            choose: '&onChoice'
        },
        controllerAs: 'vm',
        bindToController: true
    };

    return directive;
}
