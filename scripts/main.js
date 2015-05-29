require('./ajax');
var React = require('react');
var Fluxxor = require('fluxxor');
var Main = require('./components/main');
var stores = require('./stores');
var actions = require('./constants/actions');

var flux = window.flux = new Fluxxor.Flux(stores, actions);

window.gotrMain = function() {
    React.render(<Main flux={flux}/>, document.getElementById('main'));
};

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
