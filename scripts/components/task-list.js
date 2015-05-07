var React = require('react');

var TaskList = module.exports = React.createClass({
    render: function() {
        var tasks = this.props.tasks;

        return <div className="gotr-task-list">
            {tasks.map(renderTask)}
        </div>;

        function renderTask(task) {
            return <Task task={task} key={task.id}/>;
        }
    }
});

var Task = React.createClass({
    render: function() {
        var task = this.props.task;

        return <div className="gotr-task">
            <div className="gotr-task-left">
                <div className="gotr-checkbox"></div>
                <input value={task.title}
                    className="gotr-task-text"/>
            </div>

            <div className="gotr-task-right">
                <button className="gotr-button gotr-task-button gotr-task-button-start">Start task</button>
                <input value={task.duration / (60 * 60 * 1000)} className="gotr-task-duration"/>
                <div className="gotr-task-mins">mins</div>
                <a href="#" className="gotr-task-kill"></a>
            </div>
        </div>;
    }
});
