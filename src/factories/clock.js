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
        isRunning: false
    };

    var timeoutId = null;

    return clock;

    function start() {
        clock.isRunning = true;
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
        clock.isRunning = false;
    }

    function reset() {
        stop();
        clock.elapsedTime = 0;
    }
}
