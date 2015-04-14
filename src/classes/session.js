angular.module('gotr')
    .factory('Session', SessionClass);

SessionClass.$inject = ['Timer', 'sessionStore'];
function SessionClass(Timer, sessionStore) {
    /**
     * A timer for task sessions.
     * @class
     * @extends Timer
     * @global
     * @param {String} name
     * @param {Number} limit
     */
    function Session(name, limit) {
        /** The name of the task */
        this.name = name;

        /** The time limit in miliseconds of the task */
        this.limit = limit;

        Timer.call(this, 10);
    }

    Session.prototype = Object.create(Timer.prototype);

    Session.prototype.isFinished = isFinished;
    Session.prototype.timeRemaining = timeRemaining;
    Session.prototype.tick = tick;
    Session.prototype.complete = complete;

    return Session;

    /**
     * Indicates whether the session has passed
     * the given time limit.
     * @memberof Session.prototype
     */
    function isFinished() {
        return this.elapsedTime >= this.limit;
    }

    /**
     * Returns the time remaining until the
     * time limit in miliseconds.
     * @memberof Session.prototype
     */
    function timeRemaining() {
        return this.limit - this.elapsedTime;
    }

    /**
     * @memberof Session.prototype
     * @override
     */
    function tick() {
        Timer.prototype.tick.call(this);

        if (this.isFinished()) {
            this.complete();
        }
    }

    function complete() {
        this.stop();
        sessionStore.add(this.elapsedTime);
        // TODO: alert the user
        // TODO: mark session model as completed
    }
}
