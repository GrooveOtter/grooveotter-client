/**
 * A shared singleton timer used for
 * tracking time the user spent on the
 * page.
 *
 * @ngdoc factory
 * @name tracker
 */
angular.module('gotr')
    .factory('tracker', Tracker);

Tracker.$inject = ['Timer'];
function Tracker(Timer) {
    return new Timer(500);
}
