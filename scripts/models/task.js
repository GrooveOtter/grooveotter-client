var Model = require('exoskeleton').Model;
var User = require('./user');

var Task = module.exports = Model.extend({
    defaults: {
        title: '',
        duration: 25 * 60 * 1000,
        completed: false,
        shared: true
    },

    parse: function(resp) {
        return {
            id: resp.id,
            title: resp.title,
            duration: resp.duration,
            completed: Boolean(resp.completed),
            user: new User(resp.user),
            likes: Number(resp.likes),
            liked: Boolean(resp.liked),
            created_at: new Date(resp.created_at),
            updated_at: new Date(resp.updated_at)
        };
    },

    like: function() {
        this.save({liked: true}, {
            url: process.env.GOTR_HOST + '/api/newsfeed/' + this.get('id')
        });
    },

    getDurationInMinutes: function() {
        return Math.floor(this.get('duration') / (1000 * 60));
    }
});
