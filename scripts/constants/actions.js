var constants = require('./');

var actions = module.exports = {
    startSessionFromTask: function(task) {
        this.dispatch(constants.ADD_TASK, {task: task});
        this.dispatch(constants.LOCK_CYCLE);
        this.dispatch(constants.START_SESSION_FROM_TASK, {task: task});
    },

    resetTimer: function() {
        this.dispatch(constants.UNLOCK_CYCLE);
    },

    newSession: function() {
        this.dispatch(constants.NEW_SESSION);
    },

    completeTask: function(task) {
        this.dispatch(constants.COMPLETE_TASK, {task: task});
        this.dispatch(constants.UNLOCK_CYCLE);
    },

    completeTaskNotify: function(task) {
        this.dispatch(constants.COMPLETE_TASK_NOTIFY, {task: task})
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

    toggleTaskShared: function(task) {
        this.dispatch(constants.TOGGLE_TASK_SHARED, {task: task});
    },

    deleteTask: function(task) {
        this.dispatch(constants.DELETE_TASK, {task: task});
        this.dispatch(constants.UNLOCK_CYCLE);
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
    },

    openTimer: function() {
        this.dispatch(constants.OPEN_TIMER);
    },

    skipOnboarding: function() {
        this.dispatch(constants.SKIP_ONBOARDING);
    },

    nextOnboarding: function() {
        this.dispatch(constants.NEXT_ONBOARDING);
    },

    prevOnboarding: function() {
        this.dispatch(constants.PREV_ONBOARDING);
    }
};
