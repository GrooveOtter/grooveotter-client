/**
 * A singleton store for tracker data
 * (total time the user has spent on the site).
 *
 * @ngdoc factory
 * @name trackerStore
 * @extends LocalStore
 */
angular.module('gotr')
    .factory('trackerStore', TrackerStore);

TrackerStore.$inject = ['LocalStore'];
function TrackerStore(LocalStore) {
    return new LocalStore('total-time', 0);
}
