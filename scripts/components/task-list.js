var React = require('react');
var Fluxxor = require('fluxxor');
var classNs = require('classnames');
var TransitionGroup = require('timeout-transition-group');

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

// The task list seen in the 'Today' tab.

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
                leaveTimeout={1000}
                enterTimeout={1000}
                transitionName="gotr-task"
                transitionEnter={false}>
                {tasks.map(renderTask)}
            </TransitionGroup>
            <CompletedItems/>
        </div>;

        function renderTask(task) {
            return <Task task={task} key={task.cid}/>;
        }
    }
});

var CompletedItems = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('SessionStore')],
    getStateFromFlux: function() {
        var flux = this.getFlux();

        return {
            session: flux.store('SessionStore').getSession(),
            taskList: flux.store('TaskListStore').getTaskList()
        };
    },

    getInitialState: function() {
        return {
            toggleCompleted: false
        }
    },

    render: function() {
        var toggleCompleted = this.state.toggleCompleted;
        var state = this.state;
        if (toggleCompleted) {
            return this.renderCompletedTasks(state);
        }
        else {
            return (
                <button className="gotr-button gotr-button-nav gotr-button-completed" onClick ={this.toggleCompleted}> Completed</button>
            );
        }
    },
    renderCompletedTasks: function(state) {
        var tasks = state.taskList.completedTasks()
        var todayTasks = [];
        var today = new Date().toString().slice(0,10);
        var taskCount = 0;
        tasks.map(function(key) {
            var parsedTask = key.get('updated_at').toString().slice(0,10);
            if (parsedTask === today) {
                todayTasks.push(key);
          }
        });

        return (<div><button onClick ={this.toggleCompleted} className="gotr-button gotr-button-nav gotr-button-completed"> Completed</button><ol type="1">{todayTasks.map(renderTask)}</ol> </div>);

        function renderTask(task) {
            taskCount++
            var task = task.get("title");
            return <li className="gotr-completed-task">{{taskCount}} {{ task}} </li>
        }
    },

    toggleCompleted: function() {
        var toggleState = !this.state.toggleCompleted;
        this.setState({
            toggleCompleted: toggleState
        });
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

    componentDidUpdate: function() {
        var session = this.state.session;
        var task = this.props.task;
        var self = this;

        requestAnimationFrame(function() {
            var active = session.get('task').cid === task.cid;

            if (active && session.isStarted() && self.isMounted()) {
                self.forceUpdate();
            }
        });
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
        var taskInSession = this.state.session.get('started');
        var selectedTask = task.cid;
        var currentTask = this.state.session.get('task').cid;

        if (taskInSession == null & !isNaN(duration)) {
            flux.actions.updateTaskDuration(task,duration);
        }
        if (taskInSession!= null & task.cid != this.state.session.get('task').cid) {
            flux.actions.updateTaskDuration(task,duration);
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
            'gotr-task-active': sessionTask.cid === task.cid
        });

        if (sessionTask.cid === task.cid) {
            var button = <button
                disabled
                className="gotr-button gotr-button-primary gotr-task-button">
                {session.hasEnded() ? 'Ended' : 'In Progress'}
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
                    disabled={sessionTask.cid === task.cid}
                    onBlur={this.updateDuration}
                />

                <div className="gotr-task-mins">mins</div>
                <button onClick={this.deleteTask} className="gotr-task-kill"/>
            </div>
        </div>;
    }
});
