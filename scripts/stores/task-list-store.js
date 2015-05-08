var React = require('react');
var Fluxxor = require('fluxxor');
var TaskList = require('../models/task-list');
var constants = require('../constants');

var SessionStore = module.exports = Fluxxor.createStore({
    initialize: function() {
        this.taskList = new TaskList([
            {title: 'Start researching ideas for new project'},
            {title: 'Produce full set of wireframes'},
            {title: 'Post shot to dribbble'}
        ]);

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

        task.set({completed: true});
        this.emit('change');
    },

    onAddTask: function(payload) {
        var task = payload.task;

        if (task.get('title').trim() !== '') {
            this.taskList.add(task);
        }

        this.emit('change');
    },

    onUpdateTaskTitle: function(payload) {
        var task = payload.task;
        var title = payload.title;

        task.set({title: title});
        this.emit('change');
    },

    onUpdateTaskDuration: function(payload) {
        var task = payload.task;
        var duration = payload.duration;

        task.set({duration: duration});
        this.emit('change');
    },

    onDeleteTask: function(payload) {
        var task = payload.task;

        this.taskList.remove(task);
        this.emit('change');
    },

    getTaskList: function() {
        return this.taskList;
    }
});
