/**
 * A singleton store for tracker data
 * (total time the user has spent on the site).
 *
 * @ngdoc factory
 * @name tracker
 */
angular.module('gotr')
    .factory('tracker', Tracker);

Tracker.$inject = ['LocalStore', 'Timer', 'debounce'];
function Tracker(LocalStore, Timer, debounce) {
    var timer = new Timer(500);
    var store = new LocalStore('total-time', 0);
    var timeoutPeriod = 3 * 60 * 1000; // 3 minutes

    /**
     * @lends tracker
     */
    var tracker = {
        /**
         * Starts the internal timer.
         * @method
         */
        start: start,

        /**
         * Stops the internal timer.
         * @method
         */
        stop: stop,

        /**
         * Registers that an action occured.
         * Used for AFK-detection.
         * @method
         */
        action: debounce(action, timeoutPeriod),

        /**
         * Persists the current timer data to
         * the internal local store and stops
         * the timer.
         * @method
         */
        persist: persist
    };

    return tracker;

    function start() {
        timer.start();
    }

    function stop() {
        timer.stop();
    }

    function action() {
        stop();
        timer.elapsedTime -= timeoutPeriod;
    }

    function persist() {
        var time = store.get();

        stop();
        store.store(time + timer.elapsedTime);
    }
}
