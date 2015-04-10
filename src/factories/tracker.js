angular.module('gotr')
    .factory('tracker', Tracker);

Tracker.$inject = ['Timer'];
function Tracker(Timer) {
    return new Timer();
}
