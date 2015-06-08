require('./ajax');
var React = require('react');
var Fluxxor = require('fluxxor');
var Main = require('./components/main');
var User = require('./models/user');
var stores = require('./stores');
var actions = require('./constants/actions');
var cookies = require('js-cookie');

window.gotrMain = function() {
    var flux = window.gotrFlux = new Fluxxor.Flux(stores.getStores(), actions);

    window.addEventListener('mousemove', function() {
        flux.actions.userAction();
    });

    window.addEventListener('focus', function() {
        flux.actions.userAction();
    });

    window.addEventListener('unload', function() {
        flux.actions.userLeave();
    });

    window.addEventListener('blur', function() {
        flux.actions.userLeave();
    });

    React.render(<Main flux={flux}/>, document.getElementById('main'));
};

new User().fetch({
    success: function(user) {
        window.gotrUser = user;
        cookies.set('loggedin', true);

        gotrMain();
    },

    error: function(user, xhr) {
        cookies.remove('loggedin');

        window.location = '/';
    }
});
