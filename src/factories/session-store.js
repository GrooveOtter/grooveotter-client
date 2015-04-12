/**
 * A singleton store for session data
 * (total time the user has spent in sessions).
 *
 * @ngdoc factory
 * @name sessionStore
 * @extends LocalStore
 */
angular.module('gotr')
    .factory('sessionStore', SessionStore);

SessionStore.$inject = ['LocalStore'];
function SessionStore(LocalStore) {
    return new LocalStore('session-time', 0);
}

