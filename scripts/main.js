var React = window.React = require('react');
var Main = require('./components/main');

window.gotrMain = function() {
    React.render(<Main/>, document.getElementById('main'));
};
