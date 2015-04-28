angular.module('gotr')
    .factory('userSession', UserSession);

UserSession.$inject = ['Task', 'sessionStore', '$interval'];
function UserSession(Task, sessionStore, $interval) {
    $interval(function() {}, 10);

    /**
     * A shared singleton for keeping track of
     * information for the user's active session.
     *
     * @name userSession
     * @global
     */
    var userSession = {
        task: new Task('', 15 * 60 * 1000, true),
        started: null,
        start: start,
        complete: complete,
        reset: reset,
        clear: clear,
        elapsedTime: elapsedTime,
        timeRemaining: timeRemaining
    };

    return userSession;

    function start() {
        if (userSession.started == null) {
            userSession.started = Date.now();
        }
    }

    function complete() {
        userSession.task.complete();

        if (userSession.started) {
            sessionStore.add(Date.now() - userSession.started);
        }

        clear();
    }

    function reset() {
        userSession.started = null;
    }

    function clear() {
        reset();
        userSession.task = new Task('', 15 * 60 * 1000, true);
    }

    function elapsedTime() {
        return Date.now() - userSession.started;
    }

    function timeRemaining() {
        return userSession.task.limit - elapsedTime();
    }
}
