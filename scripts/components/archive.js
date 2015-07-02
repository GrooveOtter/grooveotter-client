var React = require('react');
var Fluxxor = require('fluxxor');
var lodash = require('lodash');
var dateformat = require('dateformat');
var NavButton = require('./base').NavButton;
var classNs = require('classnames');

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

// This is the code for the 'archive' tab
// in the dashboard. It uses the tasks from
// the task list store and displays all
// uncompleted tasks in a paginated-accordian
// list.

var Archive = module.exports = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('TaskListStore')],

    getInitialState: function() {
        return {
            currentWeekIndex: 0
        };
    },

    getStateFromFlux: function() {
        var flux = this.getFlux();

        return {
            taskList: flux.store('TaskListStore').getTaskList()
        };
    },

    // Decrement the `currentWeekIndex` (current page),
    // effectively paging to the left.
    goLeft: function() {
        var currentWeekIndex = this.state.currentWeekIndex;

        this.setState({
            currentWeekIndex: currentWeekIndex - 1
        });
    },

    // Increment the `currentWeekIndex` (current page),
    // effectively paging to the right.
    goRight: function() {
        var currentWeekIndex = this.state.currentWeekIndex;

        this.setState({
            currentWeekIndex: currentWeekIndex + 1
        });
    },

    render: function() {
        var currentWeekIndex = this.state.currentWeekIndex;
        var tasks = this.state.taskList.completedTasks();

        var weeks = archiveWeeks(tasks);

        var left = currentWeekIndex > 0;
        var right = currentWeekIndex < weeks.length - 1;

        var week = weeks[currentWeekIndex];

        return <div className="gotr-archive">
            <NavButton disabled={!left} onClick={this.goLeft}>
                <div className="gotr-archive-left">&nbsp;</div>
            </NavButton>

            <NavButton disabled={!right} onClick={this.goRight}>
                <div className="gotr-archive-right">&nbsp;</div>
            </NavButton>

            <NavButton disabled>{week.date}</NavButton>

            <Week week={week}/>
        </div>;
    }
});

var Week = React.createClass({
    render: function() {
        var week = this.props.week;

        return <div className="gotr-archive-week">
            {week.days.map(renderDay)}
        </div>

        function renderDay(day) {
            return <Day key={day.date} day={day}/>;
        }
    }
});

var Day = React.createClass({
    getInitialState: function() {
        return {
            open: false
        };
    },

    // Toggle between open and closed states.
    // This is held on a per-component basis,
    // so the state is reset when the page
    // changes.
    toggleOpen: function() {
        var open = this.state.open;

        this.setState({
            open: !open
        });
    },

    render: function() {
        var open = this.state.open;
        var day = this.props.day;

        var set = classNs('gotr-archive-day', {
            'gotr-archive-day-open': open
        });

        return <div className={set} onClick={this.toggleOpen}>
            <div className="gotr-archive-day-title">
                <div className="gotr-archive-day-title-range">
                    {formatDay(day.date)}
                </div>

                <div className="gotr-archive-day-title-arrow"/>

                <div className="gotr-archive-day-title-count">
                    <span className="gotr-archive-day-checkmark"/>
                    <span>{day.tasks.length} tasks complete</span>
                </div>
            </div>

            <div className="gotr-archive-day-tasks">
                <ol>{day.tasks.map(renderTask)}</ol>
            </div>
        </div>;

        function renderTask(task) {
            return <Task key={task.cid} task={task.toJSON()}/>
        }
    }
});

var Task = React.createClass({
    render: function() {
        var task = this.props.task;

        return <li className="gotr-archive-task">
            <div className="gotr-archive-task-title">
                {task.title}
            </div>

            <div className="gotr-archive-task-count">
                <span className="gotr-archive-task-clock"/>
                <span>{task.duration / (60 * 1000)} mins</span>
            </div>
        </li>;
    }
});

function archiveWeeks(tasks) {
    var weeks = lodash.chain(tasks)
        .groupBy(getDayOfTask)
        .map(toDayObj)
        .sortBy(getDate)
        .reverse()
        .groupBy(weekOf)
        .map(toWeekObj)
        .reverse()
        .value();

    // Weeks should never be empty.
    if (weeks.length === 0) {
        weeks.push({date: 'This Week', days: []});
    } else {
        weeks[0].date = 'This Week';
    }

    return weeks;
}

function getDayOfTask(task) {
    return dayOf(task.get('updated_at'));
}

function dayOf(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function weekOf(day) {
    var sunday = new Date(day.date);
    sunday.setDate(sunday.getDate() - sunday.getDay());

    var saturday = new Date(sunday);
    saturday.setDate(saturday.getDate() + 6);

    return formatDate(sunday) + ' - ' + formatDate(saturday);
}

function getDate(day) {
    return day.date;
}

function toDayObj(tasks, day) {
    return {
        date: new Date(day),
        tasks: tasks
    };
}

function toWeekObj(days, week) {
    return {
        date: week,
        days: days,
    };
}

function formatDay(date) {
    return dateformat(date, 'dddd, mmmm dS');
}

function formatDate(date) {
    return dateformat(date, 'mmmm dS');
}
