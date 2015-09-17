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
            constants.TOGGLE_TASK_SHARED, this.onToggleTaskShared,
            constants.DELETE_TASK, this.onDeleteTask
        );
    },

    onCompleteTask: function(payload) {
        var task = payload.task;

        if (task.isNew()) {
            task.set({completed: true});
        } else {
            task.save({completed: true}, {
                success: function() {
                    this.flux.actions.completeTaskNotify(task)
                }.bind(this)
            });
        }
    },

    onAddTask: function(payload) {
        var task = payload.task;

        if (task.get('title').trim() !== '') {
            task.collection = this.taskList;
            this.taskList.create(task);
        }
    },

    onUpdateTaskTitle: function(payload) {
        var task = payload.task;
        var title = payload.title;

        if (task.isNew()) {
            task.set({title: title});
        } else {
            task.save({title: title});
        }
    },

    onUpdateTaskDuration: function(payload) {
        var task = payload.task;
        var duration = payload.duration;

        if (task.isNew()) {
            task.set({duration: duration});
        } else {
            task.save({duration: duration});
        }
    },

    onToggleTaskShared: function(payload) {
        var task = payload.task;
        var shared = task.get('shared');

        if (task.isNew()) {
            task.set({shared: !shared});
        } else {
            task.save({shared: !shared});
        }
    },

    onDeleteTask: function(payload) {
        var task = payload.task;

        task.destroy();
    },

    getTaskList: function() {
        return this.taskList;
    }
});
