var Collection = require('exoskeleton').Collection;
var Task = require('./task');

var TaskList = module.exports = Collection.extend({
    model: Task,

    completedTasks: function() {
        return this.where({completed: true});
    },

    uncompletedTasks: function() {
        return this.where({completed: false});
    }
});
