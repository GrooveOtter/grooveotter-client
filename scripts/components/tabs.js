var React = require('react');
var classNs = require('classnames');

var Tabs = module.exports = exports = React.createClass({
    render: function() {
        return <div className="gotr-tabs">
            {this.props.children}
        </div>;
    }
});

var Title = exports.Title = React.createClass({
    render: function() {
        var className = classNs('gotr-tab-title', {
            'gotr-tab-title-active': this.props.active
        });

        return <div className={className}>
            {this.props.children}
        </div>;
    }
});
