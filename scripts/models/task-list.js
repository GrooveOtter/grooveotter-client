var Collection = require('exoskeleton').Collection;
var Task = require('./task');

var TaskList = module.exports = Collection.extend({
    model: Task,
    url: process.env.GOTR_HOST + '/api/tasks',

    completedTasks: function() {
        return this.where({completed: true});
    },

    uncompletedTasks: function() {
        return this.where({completed: false});
    }
});
