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
        elapsedTime: elapsedTime,
        timeRemaining: timeRemaining,
        isFinished: isFinished
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

        reset();
    }

    function reset() {
        userSession.started = null;
        userSession.task = new Task('', 15 * 60 * 1000, true);
    }

    function elapsedTime() {
        if (userSession.started == null) {
            return 0;
        } else {
            return Date.now() - userSession.started;
        }
    }

    function timeRemaining() {
        return Math.max(0, userSession.task.limit - elapsedTime());
    }

    function isFinished() {
        return timeRemaining() <= 0;
    }
}
