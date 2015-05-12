var Collection = require('exoskeleton').Collection;
var Task = require('./task');

var TaskList = module.exports = Collection.extend({
    model: Task,
    url: 'http://grooveotter-api.herokuapp.com/api/users/5547778b182e270300d48ee3/tasks',

    completedTasks: function() {
        return this.where({completed: true});
    },

    uncompletedTasks: function() {
        return this.where({completed: false});
    }
});
