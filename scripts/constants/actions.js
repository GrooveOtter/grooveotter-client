var constants = require('./');

var actions = module.exports = {
    startSessionFromTask: function(task) {
        this.dispatch(constants.ADD_TASK, {task: task});
        this.dispatch(constants.START_SESSION_FROM_TASK, {task: task});
    },

    newSession: function() {
        this.dispatch(constants.NEW_SESSION);
    },

    completeTask: function(task) {
        this.dispatch(constants.COMPLETE_TASK, {task: task});
    },

    addTask: function(task) {
        this.dispatch(constants.ADD_TASK, {task: task});
    },

    updateTaskTitle: function(task, title) {
        this.dispatch(constants.UPDATE_TASK_TITLE, {task: task, title: title});
    },

    updateTaskDuration: function(task, duration) {
        this.dispatch(constants.UPDATE_TASK_DURATION, {task: task, duration: duration});
    },

    deleteTask: function(task) {
        this.dispatch(constants.DELETE_TASK, {task: task});
    },

    userAction: function() {
        this.dispatch(constants.USER_ACTION);
    },

    userLeave: function() {
        this.dispatch(constants.USER_LEAVE);
    },

    cycleNewsfeed: function() {
        this.dispatch(constants.CYCLE_NEWSFEED);
    },

    likeSharedItem: function(item) {
        this.dispatch(constants.LIKE_SHARED_ITEM, {item: item});
    },

    notifyLikedItem: function(itemId) {
        this.dispatch(constants.NOTIFY_LIKED_ITEM, {itemId: itemId});
    }
};
