var React = require('react');

var PrimaryButton = exports.PrimaryButton = React.createClass({
    render: function() {
        return <button className="gotr-button gotr-button-primary">
            {this.props.children}
        </button>;
    }
});

var SecondaryButton = exports.SecondaryButton = React.createClass({
    render: function() {
        return <button className="gotr-button gotr-button-secondary">
            {this.props.children}
        </button>;
    }
});
