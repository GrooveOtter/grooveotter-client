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
        this.set({started:  new Date()});
    },

    elapsedTime: function() {
        return Date.now() - this.get('started');
    },

    timeRemaining: function() {
        var task = this.get('task');
        var duration = task.get('duration');

        if (this.isStarted()) {
            return duration - this.elapsedTime();
        } else {
            return duration;
        }
    }
});
