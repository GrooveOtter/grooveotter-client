angular.module('gotr')
    .factory('tracker', Tracker);

Tracker.$inject = ['LocalStore', 'Timer', 'debounce'];
function Tracker(LocalStore, Timer, debounce) {
    var timer = new Timer(2000);
    var store = new LocalStore('total-time', 0);
    var timeoutPeriod = 3 * 60 * 1000; // 3 minutes

    var _tick = timer.tick;

    timer.tick = tick;

    /**
     * @namespace
     * @global
     */
    var tracker = {
        start: start,
        stop: stop,
        action: debounce(action, timeoutPeriod),
        persist: persist
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
        stop();
        timer.elapsedTime -= timeoutPeriod;
    }

    /**
     * Persists the current timer data to
     * the internal local store and stops
     * the timer.
     * @memberof tracker
     */
    function persist() {
        var time = store.get();

        stop();
        store.store(time + timer.elapsedTime);
    }

    function tick() {
        persist();
        _tick.call(timer);
    }
}
