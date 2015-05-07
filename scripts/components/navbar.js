var React = require('react');
var classNs = require('classnames');

var Navbar = module.exports = exports = React.createClass({
    render: function() {
        return <div className="gotr-nav-top">
            <div className="gotr-navbar">
                {this.props.children}
            </div>
        </div>
    }
});

var Left = exports.Left = React.createClass({
    render: function() {
        return <div className="gotr-navbar-left">
            {this.props.children}
        </div>;
    }
});

var Right = exports.Right = React.createClass({
    render: function() {
        return <div className="gotr-navbar-right">
            {this.props.children}
        </div>;
    }
});

var Item = exports.Item = React.createClass({
    render: function() {
        var set = classNs('gotr-navbar-item', {
            'gotr-navbar-item-active': this.props.active
        });

        return <span className={set}>
            {this.props.children}
        </span>;
    }
});
