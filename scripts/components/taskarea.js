var React = require('react');
var Fluxxor = require('fluxxor');
var Base = require('./base');
var classNs = require('classnames');

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var TaskArea = module.exports = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('SessionStore', 'TaskListStore')],
    render: function() {
        var editing = this.state.editing;
        var tempTitle = this.state.tempTitle;
        var session = this.state.session;
        var task = session.get('task');
        var title = task.get('title');
        var shared = task.get('shared');

        var checkboxClass = classNs('gotr-checkbox', {
            'gotr-checkbox-checked': shared
        });

        var shareBox = <span
            className="gotr-taskarea-sharebox"
            onClick={this.toggleShared}>
            <span className={checkboxClass}/>
            Share this task
        </span>;

        if (session.isStarted()) {
            var buttons = <div>
                <Base.SecondaryButton onClick={this.completeTask}>
                    Complete task
                </Base.SecondaryButton>

                <Base.PrimaryButton onClick={this.resetTimer}>
                    Reset timer
                </Base.PrimaryButton>

                {shareBox}
            </div>;
        } else {
            var buttons = <div>
                <Base.SecondaryButton onClick={this.startTask}>
                    Start task
                </Base.SecondaryButton>

                <Base.PrimaryButton onClick={this.addForLater}>
                    Add to list for later
                </Base.PrimaryButton>

                {shareBox}
            </div>;
        }

        return <div className="gotr-taskarea">
            <input
                type="text"
                placeholder="What are you working on"
                className="gotr-taskarea-box"
                ref="gotrTaskareaBox"
                value={editing ? tempTitle : title}
                onKeyDown={this.checkForInput}
                onChange={this.updateTempTitle}
                onFocus={this.startEditing}
                onBlur={this.stopEditing}
            />

            {buttons}
        </div>;
    },

    getInitialState: function() {
        return {
            editing: false,
            tempTitle: ''
        };
    },

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
        debugger
        flux.actions.addTask(task);
        flux.actions.newSession();
    },

    updateTempTitle: function(event) {
        this.setState({
            tempTitle: event.target.value
        });
    },

    toggleShared: function() {
        var flux = this.getFlux();
        var session = this.state.session;
        var task = session.get('task');

        flux.actions.toggleTaskShared(task);
    },

    resetTimer: function(event) {
        var flux = this.getFlux();

        flux.actions.newSession();
    },

    startEditing: function() {
        var session = this.state.session;
        var task = session.get('task');
        var title = task.get('title');

        this.setState({
            editing: true,
            tempTitle: title
        });
    },

    stopEditing: function() {
        var flux = this.getFlux();
        var task = this.state.session.get('task');
        var title = this.state.tempTitle;

        this.setState({
            editing: false
        });

        flux.actions.updateTaskTitle(task, title);
    },

    startTaskFromEnter: function() {
        var task = this.state.session.get('task');
        var text = event.target.value;
        task.set('title', text);
        this.refs.gotrTaskareaBox.getDOMNode().blur();
        this.addForLater();
    }
    ,
    checkForInput: function(event) {
        var flux = this.getFlux();
        var enter = 13;
        var tab = 9;
        if (event.which == enter) {
            event.preventDefault();
            this.startTaskFromEnter(event);

        } else if (event.which === tab) {
            event.preventDefault();
            this.refs.gotrTaskareaBox.getDOMNode().blur();
            flux.actions.openTimer();
        }
    }
});
