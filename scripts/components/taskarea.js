var React = require('react');
var Fluxxor = require('fluxxor');
var Base = require('./base');

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var TaskArea = module.exports = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('SessionStore', 'TaskListStore')],

    getStateFromFlux: function() {
        var flux = this.getFlux();

        return {
            session: flux.store('SessionStore').getSession()
        };
    },

    completeTask: function() {
        var flux = this.getFlux();
        var task = this.state.session.get('task');

        flux.actions.completeTask(task);
    },

    startTask: function() {
        var flux = this.getFlux();
        var task = this.state.session.get('task');

        flux.actions.startSessionFromTask(task);
    },

    addForLater: function() {
        var flux = this.getFlux();
        var task = this.state.session.get('task');

        flux.actions.addTask(task);
        flux.actions.newSession();
    },

    updateTitle: function(event) {
        var flux = this.getFlux();
        var task = this.state.session.get('task');
        var title = event.target.value;

        flux.actions.updateTaskTitle(task, title);
    },

    resetTimer: function(event) {
        var flux = this.getFlux();

        flux.actions.newSession();
    },

    render: function() {
        var session = this.state.session;
        var task = session.get('task');
        var title = task.get('title');

        if (session.isStarted()) {
            var buttons = <div>
                <Base.SecondaryButton onClick={this.completeTask}>
                    Complete task
                </Base.SecondaryButton>

                <Base.PrimaryButton onClick={this.resetTimer}>
                    Reset timer
                </Base.PrimaryButton>
            </div>;
        } else {
            var buttons = <div>
                <Base.SecondaryButton onClick={this.startTask}>
                    Start task
                </Base.SecondaryButton>

                <Base.PrimaryButton onClick={this.addForLater}>
                    Add to list for later
                </Base.PrimaryButton>
            </div>;
        }

        return <div className="gotr-taskarea">
            <input
                type="text"
                placeholder="What are you working on?"
                className="gotr-taskarea-box"
                value={title}
                onChange={this.updateTitle}
            />

            {buttons}
        </div>;
    }
});
