angular.module('gotr')
    .factory('clock', Clock);

Clock.$inject = ['Timer'];
function Clock(Timer) {
    return new Timer();
}
