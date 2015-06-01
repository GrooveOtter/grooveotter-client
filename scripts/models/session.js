var Model = require('exoskeleton').Model;

var Session = module.exports = Model.extend({
    initialize: function() {
        var task = this.get('task');

        this.listenTo(task, 'change', function() {
            this.trigger('change');
        });
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
        var duration = task.get('timeDuration');
        var started = this.get('started');
        console.log(duration, started, Date.now() - started);

        return Math.min(duration, +started && Date.now() - started);
    },

    timeRemaining: function() {
        var task = this.get('task');
        var duration = task.get('timeDuration');

        if (this.isStarted()) {
            return duration - this.elapsedTime();
        } else {
            return duration;
        }
    }
});
