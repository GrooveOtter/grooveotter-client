var Model = require('exoskeleton').Model;

var Task = module.exports = Model.extend({
    idAttribute: '_id',

    defaults: {
        title: '',
        duration: 20 * 60 * 1000,
        completed: false
    },

    parse: function(resp) {
        return {
            _id: resp._id,
            title: resp.title,
            duration: resp.duration,
            completed: !!resp.completed,
            createdAt: new Date(resp.createdAt),
            updatedAt: new Date(resp.updatedAt)
        };
    }
});
