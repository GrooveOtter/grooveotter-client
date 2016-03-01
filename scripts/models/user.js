var Backbone = require('exoskeleton');
var Model = Backbone.Model;

// TODO
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

var CurrentUser = User.CurrentUser = User.extend({
    url: process.env.GOTR_HOST + '/api/users/me'
});
