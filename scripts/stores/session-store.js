var React = require('react');
var Fluxxor = require('fluxxor');
var Session = require('../models/session');
var Task = require('../models/task');
var constants = require('../constants');

var SessionStore = module.exports = Fluxxor.createStore({
    initialize: function() {
        this.resetSession();

        this.bindActions(
            constants.START_SESSION_FROM_TASK, this.onStartSessionFromTask,
            constants.NEW_SESSION, this.onNewSession,
            constants.COMPLETE_TASK, this.onCompleteTask,
            constants.DELETE_TASK, this.onDeleteTask
        );
    },

    resetSession: function() {
        var task = new Task();

        this.session = new Session({flux: this.flux, task: task});
    },

    onStartSessionFromTask: function(payload) {
        var task = payload.task;

        this.session.set({task: task});
        this.session.start();
        this.emit('change');
    },

    onNewSession: function() {
        this.resetSession();
        this.emit('change');
    },

    onCompleteTask: function(payload) {
        var task = payload.task;
        var session = this.session;
        var activeTask = session.get('task');

        if (task.id === activeTask.id) {
            this.complete();
            this.resetSession();
            this.emit('change');
        }
    },

    complete: function() {
        var flux = this.flux;
        var session = this.session;
        var task = session.get('task');

        flux.actions.logSessionTime(session.elapsedTime());
    },

    onDeleteTask: function(payload) {
        var task = payload.task;
        var session = this.session;
        var activeTask = session.get('task');

        if (task.id === activeTask.id) {
            this.resetSession();
        }

        this.emit('change');
    },

    getSession: function() {
        return this.session;
    }
});
