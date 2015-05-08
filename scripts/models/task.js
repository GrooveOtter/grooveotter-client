var Model = require('exoskeleton').Model;

var Task = module.exports = Model.extend({
    initialize: function() {
        this.set({id: Math.random().toString(16).slice(2)});
    },

    defaults: {
        title: '',
        duration: 20 * 60 * 1000,
        completed: false
    }
});
