var Model = require('exoskeleton').Model;
var dateformat = require('dateformat');

var Session = module.exports = Model.extend({
    initialize: function() {
        var task = this.get('task');
        audio = new Audio();
        this.ringed = false;

        this.listenTo(task, 'change', function() {
            this.trigger('change');
        });
        audio.src = '/alarm.wav';
        audio.type="audio/mpeg";
        audio.id = 'test';
    },

    defaults: {
        started: null
    },

    isStarted: function() {
        return this.has('started');
    },

    start: function() {
        this.set({started: new Date()});
    },

    elapsedTime: function() {
        var task = this.get('task');
        var duration = task.get('duration');
        var started = this.get('started');

        return Math.min(duration, +started && Date.now() - started);
    },

    timeRemaining: function() {
        var task = this.get('task');
        var duration = task.get('duration');

        if (this.isStarted()) {
            return duration - this.elapsedTime();
        } else {
            return duration;
        }
    },

    clockText: function() {
        return dateformat(new Date(this.timeRemaining()), 'MM:ss');
    },

    hasEnded: function() {
        return this.timeRemaining() === 0;
    },

    endTimer: function () {
        console.log()
        audio.pause();
        audio.currentTime = 0;
    },

    ring: function() {
        if (this.ringed) {
            return;
        }

        this.ringed = true;

        audio.play();
    }
});
