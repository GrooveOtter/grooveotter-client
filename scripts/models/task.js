var Model = require('exoskeleton').Model;
var User = require('./user');

var Task = module.exports = Model.extend({
    defaults: {
        title: '',
        duration: 20 * 60 * 1000,
        completed: false
    },

    parse: function(resp) {
        return {
            id: resp.id,
            title: resp.title,
            duration: resp.duration,
            completed: Boolean(resp.completed),
            user: new User(resp.user),
            created_at: new Date(resp.created_at),
            updated_at: new Date(resp.updated_at)
        };
    },

    getDurationInMinutes: function() {
        return Math.floor(this.get('duration') / (1000 * 60));
    }
});
