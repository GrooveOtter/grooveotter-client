var React = require('react');
var Fluxxor = require('fluxxor');
var classNs = require('classnames');
var TransitionGroup = require('react/addons').addons.CSSTransitionGroup;

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var TaskList = module.exports = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('TaskListStore')],

    getStateFromFlux: function() {
        var flux = this.getFlux();

        return {
            taskList: flux.store('TaskListStore').getTaskList()
        };
    },

    render: function() {
        var tasks = this.state.taskList.uncompletedTasks();

        return <div className="gotr-task-list">
            <TransitionGroup
                transitionName="gotr-task"
                transitionEnter={false}>
                {tasks.map(renderTask)}
            </TransitionGroup>
        </div>;

        function renderTask(task) {
            return <Task task={task} key={task.id}/>;
        }
    }
});

var Task = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('SessionStore')],

    getStateFromFlux: function() {
        var flux = this.getFlux();

        return {
            session: flux.store('SessionStore').getSession()
        };
    },

    startTask: function() {
        var flux = this.getFlux();
        var task = this.props.task;

        flux.actions.startSessionFromTask(task);
    },

    complete: function(event) {
        var flux = this.getFlux();
        var task = this.props.task;

        flux.actions.completeTask(task);
    },

    updateTitle: function(event) {
        var flux = this.getFlux();
        var task = this.props.task;
        var title = event.target.value;

        flux.actions.updateTaskTitle(task, title);
    },

    updateDuration: function(event) {
        var flux = this.getFlux();
        var task = this.props.task;
        var mins = event.target.value;
        var duration = mins * 60 * 1000;

        if (!isNaN(duration)) {
            flux.actions.updateTaskDuration(task, duration);
        }
    },

    deleteTask: function() {
        var flux = this.getFlux();
        var task = this.props.task;

        flux.actions.deleteTask(task);
    },

    render: function() {
        var session = this.state.session;
        var sessionTask = session.get('task');
        var task = this.props.task;
        var title = task.get('title');
        var duration = task.get('duration');
        var completed = task.get('completed');

        var checkboxClass = classNs('gotr-checkbox', {
            'gotr-checkbox-checked': completed
        });

        var taskClass = classNs('gotr-task', {
            'gotr-task-active': sessionTask.id === task.id
        });

        if (sessionTask.id === task.id) {
            var button = <button
                disabled
                className="gotr-button gotr-button-primary gotr-task-button">
                In Progress
            </button>;
        } else {
            var button = <button
                className="gotr-button gotr-button-secondary gotr-task-button"
                onClick={this.startTask}>
                Start task
            </button>;
        }

        return <div className={taskClass}>
            <div className="gotr-task-left">
                <div className={checkboxClass} onClick={this.complete}/>

                <input
                    defaultValue={title}
                    className="gotr-task-text"
                    onBlur={this.updateTitle}
                />
            </div>

            <div className="gotr-task-right">
                {button}

                <input
                    type="number"
                    defaultValue={duration / (60 * 1000)}
                    className="gotr-task-duration"
                    onBlur={this.updateDuration}
                />

                <div className="gotr-task-mins">mins</div>
                <button onClick={this.deleteTask} className="gotr-task-kill"/>
            </div>
        </div>;
    }
});
