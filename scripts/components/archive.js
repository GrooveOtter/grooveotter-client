var React = require('react');
var Fluxxor = require('fluxxor');

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Archive = module.exports = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('TaskListStore')],

    getStateFromFlux: function() {
        var flux = this.getFlux();

        return {
            taskList: flux.store('TaskListStore').getTaskList()
        };
    },

    render: function() {
        var tasks = this.state.taskList.completedTasks();

        return <div>
            {tasks.map(renderTask)}
        </div>;

        function renderTask(task) {
            return <pre key={task.id}>{JSON.stringify(task.toJSON(), null, '  ')}</pre>;
        }
    }
});
