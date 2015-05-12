var React = require('react');
var Fluxxor = require('fluxxor');
var TaskList = require('../models/task-list');
var constants = require('../constants');

var SessionStore = module.exports = Fluxxor.createStore({
    initialize: function() {
        this.taskList = new TaskList();

        this.taskList.on('add remove change', function() {
            this.emit('change');
        }.bind(this));

        this.taskList.fetch();

        this.bindActions(
            constants.COMPLETE_TASK, this.onCompleteTask,
            constants.ADD_TASK, this.onAddTask,
            constants.UPDATE_TASK_TITLE, this.onUpdateTaskTitle,
            constants.UPDATE_TASK_DURATION, this.onUpdateTaskDuration,
            constants.DELETE_TASK, this.onDeleteTask
        );
    },

    onCompleteTask: function(payload) {
        var task = payload.task;

        task.save({completed: true});
    },

    onAddTask: function(payload) {
        var task = payload.task;

        if (task.get('title').trim() !== '' && false) {
            this.taskList.create(task);
        }
    },

    onUpdateTaskTitle: function(payload) {
        var task = payload.task;
        var title = payload.title;

        task.set({title: title});
    },

    onUpdateTaskDuration: function(payload) {
        var task = payload.task;
        var duration = payload.duration;

        task.set({duration: duration});
    },

    onDeleteTask: function(payload) {
        var task = payload.task;

        task.destroy();
    },

    getTaskList: function() {
        return this.taskList;
    }
});
