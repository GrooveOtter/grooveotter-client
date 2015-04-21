angular.module('gotr')
    .factory('Session', SessionClass);

SessionClass.$inject = ['Timer', 'sessionStore', 'tracker'];
function SessionClass(Timer, sessionStore, tracker) {
    /**
     * A timer for task sessions.
     * @class
     * @extends Timer
     * @global
     * @param {Task} task
     */
    function Session(task) {
        /** The associated task for this session */
        this.task = task;

        Timer.call(this, 10);
    }

    Session.prototype = Object.create(Timer.prototype);

    Session.prototype.isFinished = isFinished;
    Session.prototype.timeRemaining = timeRemaining;
    Session.prototype.tick = tick;
    Session.prototype.start = start;
    Session.prototype.complete = complete;

    return Session;

    /**
     * Indicates whether the session has passed
     * the time limit from the given tisk.
     * @memberof Session.prototype
     */
    function isFinished() {
        return this.elapsedTime >= this.task.limit;
    }

    /**
     * Returns the time remaining until the
     * time limit in miliseconds.
     * @memberof Session.prototype
     */
    function timeRemaining() {
        return this.task.limit - this.elapsedTime;
    }

    /**
     * @memberof Session.prototype
     * @override
     */
    function tick() {
        Timer.prototype.tick.call(this);
    }

    /**
     * @memberof Session.prototype
     * @override
     */
    function start() {
        Timer.prototype.start.call(this);

        tracker.inSession = true;
    }

    function complete() {
        this.stop();
        this.task.complete();
        sessionStore.add(this.elapsedTime);
        // TODO: alert the user
        // TODO: mark session model as completed
    }
}
