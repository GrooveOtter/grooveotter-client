angular.module('gotr')
    .factory('Timer', TimerClass);

TimerClass.$inject = ['$interval'];
function TimerClass($interval) {
    /**
     * The class for tracking with precise time.
     * @class
     * @param {Number} speed
     */
    function Timer(speed) {
        /** The rate at which the timer updates in miliseconds */
        this.speed = speed;

        /** The total tracked time in miliseconds */
        this.elapsedTime = 0;

        /** The timestamp of the last tick call */
        this.lastTick = 0;

        /** The timeout identifier returned by `$interval` */
        this.timeoutId = null;

        /** Indicator for whether the timer is active or not */
        this.isRunning = false;
    }

    Timer.prototype = /** @lends Timer.prototype */ {
        /**
         * Starts the tick loop at given tick rate.
         * @method
         */
        start: start,

        /**
         * Calculates and adjusts elapsed time since last tick.
         * Intended for use internally.
         * @method
         */
        tick: tick,

        /**
         * Stops the tick loop.
         * @method
         */
        stop: stop,

        /**
         * Stops the tick loop and sets the elapsed time to 0.
         * @method
         */
        reset: reset
    };

    return Timer;

    function start() {
        this.isRunning = true;
        this.lastTick = Date.now();

        this.timeoutId = $interval(tick.bind(this), this.speed);
    }

    function tick() {
        var now = Date.now();
        var then = this.lastTick;

        this.elapsedTime += now - then;
        this.lastTick = now;
    }

    function stop() {
        $interval.cancel(this.timeoutId);
        this.timeoutId = null;
        this.isRunning = false;
    }

    function reset() {
        this.stop();
        this.elapsedTime = 0;
    }
}
