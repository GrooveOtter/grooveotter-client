var React = require('react');
var Fluxxor = require('fluxxor');
var constants = require('../constants');

var AnltcsStore = module.exports = Fluxxor.createStore({
    initialize: function() {
        this.bindActions(
            constants.COMPLETE_TASK, this.onCompleteTask
        );
    },

    onCompleteTask: function(payload) {
        var task = payload.task;
        var flux = this.flux;
        var session = flux.store('SessionStore').getSession();
        var sessionTask = session.get('task');

        if (task.id === sessionTask.id) {
            var time = session.elapsedTime();
            this.logSessionTime(time);
        }
    },

    logSessionTime: function(time) {
        var total = this.getSessionTime();

        localStorage.setItem('session-time', time + total);
        this.emit('change');
    },

    logSiteTime: function(time) {
        var total = this.getSiteTime();

        localStorage.setItem('site-time', time + total);
        this.emit('change');
    },

    getSessionTime: function() {
         var time = localStorage.getItem('session-time');

         if (time == null) {
             return 0;
         } else {
             return +time;
         }
    },

    getSiteTime: function() {
         var time = localStorage.getItem('site-time');

         if (time == null) {
             return 0;
         } else {
             return +time;
         }
    }
});
