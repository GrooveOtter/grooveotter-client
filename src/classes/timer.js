angular.module('gotr')
    .factory('Timer', TimerClass);

TimerClass.$inject = ['$interval'];
function TimerClass($interval) {
    /**
     * The class for tracking with precise time.
     * @class
     * @global
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
    }

    Timer.prototype = {};
    Timer.prototype.start = start;
    Timer.prototype.tick = tick;
    Timer.prototype.stop = stop;
    Timer.prototype.reset = reset;

    return Timer;

    /**
     * Starts the tick loop at given tick rate.
     * @memberof Timer.prototype
     */
    function start() {
        this.lastTick = Date.now();

        this.timeoutId = $interval(this.tick.bind(this), this.speed);
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
     * @alias Timer.prototype.stop
     */
    function stop() {
        $interval.cancel(this.timeoutId);
        this.timeoutId = null;
    }

    /**
     * Stops the tick loop and sets the elapsed time to 0.
     * @memberof Timer.prototype
     */
    function reset() {
        this.stop();
        this.elapsedTime = 0;
    }

    /**
     * Indicates whether the timer is active
     * @memberof Timer.prototype
     */
    function isRunning() {
        return this.timeoutId != null;
    }
}
