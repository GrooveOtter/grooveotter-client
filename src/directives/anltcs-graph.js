angular.module('gotr')
    .directive('gotrAnltcsGraph', AnltcsGraph);

AnltcsGraph.$inject = [];
function AnltcsGraph() {
    var directive = {
        restrit: 'EA',
        replace: true,
        templateUrl: 'anltcs-graph.html',
        scope: {},
        controller: AnltcsGraphController,
        controllerAs: 'vm',
        bindToController: true
    };

    return directive;
}

AnltcsGraphController.$inject = ['tracker', 'sessionStore'];
function AnltcsGraphController(tracker, sessionStore) {
    var vm = this;

    var minute = 60 * 1000;
    var hour = 60 * minute;

    vm.width = 140;

    vm.word = word;
    vm.calcX = calcX;
    vm.minutesTotal = minutesTotal;
    vm.minutesWorking = minutesWorking;

    function minutesTotal() {
        return Math.floor(tracker.get() / minute);
    }

    function minutesWorking() {
        return Math.floor(sessionStore.get() / minute);
    }

    function word() {
        var time = tracker.get();

        if (time >= hour) {
            return {
                count: Math.floor(time / hour),
                word: time <= 2 * hour ? 'hour' : 'hours'
            };
        } else {
            return {
                count: Math.floor(time / minute),
                word: time >= minute && time < 2 * minute ? 'minute'
                    : 'minutes'
            };
        }
    }

    // TODO: clean this up
    function calcX() {
        return Math.floor(sessionStore.get() / tracker.get() * 142);
    }
}
