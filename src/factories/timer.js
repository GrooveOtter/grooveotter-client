angular.module('gotr')
    .factory('Timer', TimerClass);

TimerClass.$inject = ['$interval'];
function TimerClass($interval) {
    function Timer() {
        this.elapsedTime = 0;
        this.lastTick = 0;
        this.timeoutId = null;
        this.isRunning = false;
    }

    Timer.prototype = {
        start: start,
        tick: tick,
        stop: stop,
        reset: reset
    };

    return Timer;

    function start() {
        this.isRunning = true;
        this.lastTick = Date.now();

        this.timeoutId = $interval(tick.bind(this), 10);
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
