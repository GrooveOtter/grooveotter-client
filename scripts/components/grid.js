var React = require('react');

var Row = exports.Row = React.createClass({
    render: function() {
        return <div className="gotr-row">
            {this.props.children}
        </div>;
    }
});

var Hero = exports.Hero = React.createClass({
    render: function() {
        return <div className="gotr-hero">
            {this.props.children}
        </div>
    }
});

var Wing = exports.Wing = React.createClass({
    render: function() {
        return <div className="gotr-wing">
            {this.props.children}
        </div>
    }
});

var Left = exports.Left = React.createClass({
    render: function() {
        return <div className="gotr-row-left-panel">
            {this.props.children}
        </div>;
    }
});

var Right = exports.Right = React.createClass({
    render: function() {
        return <div className="gotr-row-right-panel">
            {this.props.children}
        </div>;
    }
});
