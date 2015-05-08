var SessionStore = require('./session-store');
var TaskListStore = require('./task-list-store');

var stores = module.exports = {
    SessionStore: new SessionStore(),
    TaskListStore: new TaskListStore()
};
