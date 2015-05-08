var SessionStore = require('./session-store');
var TaskListStore = require('./task-list-store');
var AnltcsStore = require('./anltcs-store');

var stores = module.exports = {
    SessionStore: new SessionStore(),
    TaskListStore: new TaskListStore(),
    AnltcsStore: new AnltcsStore()
};
