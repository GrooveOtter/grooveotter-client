/**
 * A shared singleton timer used for
 * tracking sessions.
 *
 * @ngdoc factory
 * @name clock
 */
angular.module('gotr')
    .factory('clock', Clock);

Clock.$inject = ['Timer'];
function Clock(Timer) {
    return new Timer(10);
}
