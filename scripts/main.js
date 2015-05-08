var React = require('react');
var Fluxxor = require('fluxxor');
var Main = require('./components/main');
var stores = require('./stores');
var actions = require('./constants/actions');

var flux = new Fluxxor.Flux(stores, actions);

window.gotrMain = function() {
    React.render(<Main flux={flux}/>, document.getElementById('main'));
};
