angular.module('gotr')
    .factory('clock', Clock);

Clock.$inject = ['$interval'];
function Clock($interval) {
    var clock = {
        elapsedTime: 0,
        lastTick: 0,
        start: start,
        tick: tick,
        stop: stop,
        reset: reset,
        isRunning: isRunning
    };

    var timeoutId = null;

    return clock;

    function start() {
        clock.lastTick = Date.now();

        timeoutId = $interval(tick, 10);
    }

    function tick() {
        var now = Date.now();
        var then = clock.lastTick;

        clock.elapsedTime += now - then;
        clock.lastTick = now;
    }

    function stop() {
        $interval.cancel(timeoutId);
        timeoutId = null;
    }

    function reset() {
        stop();
        clock.elapsedTime = 0;
    }

    function isRunning() {
        return timeoutId != null;
    }
}
