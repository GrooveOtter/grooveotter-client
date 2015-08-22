var Backbone = require('exoskeleton');
var Task = require('./task');
var User = require('./user');

var Notification = module.exports = exports = Backbone.Model.extend({
    urlRoot: process.env.GOTR_HOST + '/api/notifications',

    defaults: {
        type: 'notification',
    },

    parse: function(attrs) {
        if (attrs.task != null) {
            attrs.task = new Task(attrs.task, {parse: true});
        }

        if (attrs.user != null) {
            attrs.user = new User(attrs.user, {parse: true});
        }

        return attrs;
    }

});

var NotificatoinCollection = exports.Collection = Backbone.Collection.extend({
    model: Notification
});
