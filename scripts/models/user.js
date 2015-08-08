var Backbone = require('exoskeleton');
var Model = Backbone.Model;

var User = module.exports = Model.extend({
    urlRoot: process.env.GOTR_HOST + '/api/users',

    logout: function() {
        var xhr = Backbone.ajax({
            type: 'POST',
            url: process.env.GOTR_HOST + '/auth/logout',
            success: function() {
                window.location = '/';
            }
        });
    }
});

User.ActiveUser = User.extend({
    url: function() {
        return this.urlRoot + '/me';
    }
});
