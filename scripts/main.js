var $ = window.jQuery = require('jquery');
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

    $(window).on('mousemove', function() {
        flux.actions.userAction();
    });

    $(window).on('focus', function() {
        flux.actions.userAction();
    });

    $(window).on('unload', function() {
        flux.actions.userLeave();
    });

    $(window).on('blur', function() {
        flux.actions.userLeave();
    });

    setInterval(function() {
        if (!document.hidden) {
            flux.actions.cycleNewsfeed();
        }
    }, 15 * 1000);

    setInterval(function() {
        var session = flux.store('SessionStore').getSession();

        $('title').text(session.clockText() + ' — GrooveOtter');

        if (session.hasEnded()) {
            session.ring();
        }
    }, 100);

    var source = window.gotrSource = new EventSource(process.env.GOTR_HOST + '/sse');

    source.withCredentials = true;

    $(source).on('message', function(jEvent) {
        var event = jEvent.originalEvent; // for some reason jQuery doesn't like event sources
        var data = event.data;
        var message = JSON.parse(data);
        var type = message.type;
        var payload = message.payload;

        flux.dispatchBinder.dispatch(type, payload);
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
