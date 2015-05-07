var React = require('react');
var Base = require('./base');

var TaskArea = module.exports = React.createClass({
    render: function() {
        return <div className="gotr-taskarea">
            <input type="text" placeholder="What are you working on?" className="gotr-taskarea-box" />
            <Base.SecondaryButton>Start task</Base.SecondaryButton>
            <Base.PrimaryButton>Add to list for later</Base.PrimaryButton>
        </div>;
    }
});
