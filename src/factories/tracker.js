angular.module('gotr')
    .factory('tracker', Tracker);

Tracker.$inject = ['LocalStore', 'Timer', 'debounce'];
function Tracker(LocalStore, Timer, debounce) {
    var store = new LocalStore('total-time', 0);
    var timer = new Timer(2000, store.get());
    var timeoutPeriod = 3 * 60 * 1000; // 3 minutes

    var _tick = timer.tick;

    timer.tick = tick;

    var trigger = debounce(idle, timeoutPeriod);

    /**
     * @namespace
     * @global
     */
    var tracker = {
        start: start,
        stop: stop,
        action: action,
        persist: persist,
        get: get
    };

    return tracker;

    /**
     * Starts the internal timer.
     * @memberof tracker
     */
    function start() {
        timer.start();
    }

    /**
     * Stops the internal timer.
     * @memberof tracker
     */
    function stop() {
        timer.stop();
    }

    /**
     * Registers that an action occured.
     * Used for AFK-detection.
     * @memberof tracker
     */
    function action() {
        if (timer.isRunning()) {
            trigger();
        } else {
            start();
        }
    }

    function idle() {
        if (timer.isRunning()) {
            timer.elapsedTime -= timeoutPeriod;
            stop();
        }
    }

    /**
     * Persists the current timer data to
     * the internal local store and stops
     * the timer.
     * @memberof tracker
     */
    function persist() {
        store.store(timer.elapsedTime);
    }

    /**
     * Returns the current tracker time
     * from the store.
     * @return {Number}
     * @memberof tracker
     */
    function get() {
        return store.get();
    }

    function tick() {
        persist();
        _tick.call(timer);
    }
}
