var React = require('react');

var PrimaryButton = exports.PrimaryButton = React.createClass({
    render: function() {
        return <button className="gotr-button gotr-button-primary" {...this.props}>
            {this.props.children}
        </button>;
    }
});

var SecondaryButton = exports.SecondaryButton = React.createClass({
    render: function() {
        return <button className="gotr-button gotr-button-secondary" {...this.props}>
            {this.props.children}
        </button>;
    }
});

var NavButton = exports.NavButton = React.createClass({
    render: function() {
        return <button className="gotr-button gotr-button-nav" {...this.props}>
            {this.props.children}
        </button>;
    }
});
