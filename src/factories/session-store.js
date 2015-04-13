angular.module('gotr')
    .factory('sessionStore', SessionStore);

SessionStore.$inject = ['LocalStore'];
function SessionStore(LocalStore) {
    /**
     * A singleton store for session data
     * (total time the user has spent in sessions).
     *
     * @name sessionStore
     * @see {@link LocalStore}
     * @global
     */
    return new LocalStore('session-time', 0);
}
