var Backbone = require('exoskeleton');

var Notification = module.exports = exports = Backbone.Model.extend({
    defaults: {
        title: '',
        duration: 20 * 60 * 1000,
        completed: false
    },
    initialize: function() {
    }
});

var NotificatoinCollection = exports.Collection = Backbone.Collection.extend({
    model: Notification
});
