var Backbone = require('exoskeleton');

var Notification = module.exports = exports = Backbone.Model.extend({
    initialize: function() {
    }
});

var NotificatoinCollection = exports.Collection = Backbone.Collection.extend({
    model: Notification
});
