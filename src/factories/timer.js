/**
 * @ngdoc factory
 * @name Timer
 */
angular.module('gotr')
    .factory('Timer', TimerClass);

TimerClass.$inject = ['$interval'];
function TimerClass($interval) {
    /** @this Timer */
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

    Timer.prototype = {
        start: start,
        tick: tick,
        stop: stop,
        reset: reset
    };

    return Timer;

    /**
     * Starts the tick loop at given tick rate.
     * @memberof Timer.prototype
     */
    function start() {
        this.isRunning = true;
        this.lastTick = Date.now();

        this.timeoutId = $interval(tick.bind(this), this.speed);
    }

    /**
     * Calculates and adjusts elapsed time since last tick.
     * Intended for use internally.
     * @memberof Timer.prototype
     */
    function tick() {
        var now = Date.now();
        var then = this.lastTick;

        this.elapsedTime += now - then;
        this.lastTick = now;
    }

    /**
     * Stops the tick loop.
     * @memberof Timer.prototype
     */
    function stop() {
        $interval.cancel(this.timeoutId);
        this.timeoutId = null;
        this.isRunning = false;
    }

    /**
     * Stops the tick loop and sets the elapsed time to 0.
     * @memberof Timer.prototype
     */
    function reset() {
        this.stop();
        this.elapsedTime = 0;
    }
}
