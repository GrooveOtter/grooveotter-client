var React = require('react');
var Fluxxor = require('fluxxor');
var Base = require('./base');
var classNs = require('classnames');
var OnboardingStep = require('./onboarding-step');

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

            <OnboardingStep stepName="sharing">
                <div className="gotr-onboarding-title">
                    Share it
                </div>

                <div className="gotr-onboarding-text">
                    You worked hard. Get some recognition for what you did.
                </div>
            </OnboardingStep>
        </span>;

        if (session.isStarted()) {
            var buttons = <div>
                <div className="gotr-button-container">
                    <Base.SecondaryButton onClick={this.completeTask}>
                        Complete task
                    </Base.SecondaryButton>
                </div>

                <div className="gotr-button-container">
                    <Base.PrimaryButton onClick={this.resetTimer}>
                        Reset timer
                    </Base.PrimaryButton>
                </div>

                {shareBox}
            </div>;
        } else {
            var buttons = <div>
                <div className="gotr-button-container">
                    <Base.SecondaryButton onClick={this.startTask}>
                        Start task
                    </Base.SecondaryButton>
                </div>

                <div className="gotr-button-container">
                    <Base.PrimaryButton onClick={this.addForLater}>
                        Add to list for later
                    </Base.PrimaryButton>
                </div>

                {shareBox}
            </div>;
        }

        return <div className="gotr-taskarea">
            <input
                type="text"
                placeholder="What do you want to work on?"
                className="gotr-taskarea-box"
                ref="gotrTaskareaBox"
                value={editing ? tempTitle : title}
                onKeyDown={this.checkForInput}
                onChange={this.updateTempTitle}
                onFocus={this.startEditing}
                onBlur={this.stopEditing}
            />

            <OnboardingStep stepName="taskarea">
                <div className="gotr-onboarding-title">
                    Create a task
                </div>

                <div className="gotr-onboarding-text">
                    Organize your thoughts, and stay on task by writing it down for now or later.
                </div>
            </OnboardingStep>

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
            session: flux.store('SessionStore').getSession(),
            currentStep: flux.store('OnboardingStore').getCurrentStep()
        };
    },

    completeTask: function() {
        var flux = this.getFlux();
        var task = this.state.session.get('task');
        var user = window.gotrUser;
        var session = flux.store('SessionStore').getSession();

        // Fix the current model by adding this task to the list

        session.endTimer();
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
        var session = flux.store('SessionStore').getSession();

        session.endTimer();
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

    startTaskFromEnter: function(event) {
        var task = this.state.session.get('task');
        var text = event.target.value;
        task.set('title', text);
        this.refs.gotrTaskareaBox.getDOMNode().blur();
        this.addForLater();
    },

    checkForInput: function(event) {
        var flux = this.getFlux();

        if (event.which === 13) { // enter
            event.preventDefault();
            this.startTaskFromEnter(event);
        } else if (event.which === 9) { // tab
            event.preventDefault();
            this.refs.gotrTaskareaBox.getDOMNode().blur();
            flux.actions.openTimer();
        }
    }
});
