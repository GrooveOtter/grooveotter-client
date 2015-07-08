var React = require('react');
var Fluxxor = require('fluxxor');
var TransitionGroup = require('timeout-transition-group');

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Toaster = module.exports = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('NotificationsStore')],

    getStateFromFlux: function() {
        var flux = this.getFlux();

        return {
            notifications: flux.store('NotificationsStore').getNotifications()
        };
    },

    render: function() {
        var toasts = this.state.notifications.map(renderToast);

        return <TransitionGroup
            enterTimeout={200}
            leaveTimeout={500}
            component="div"
            className="gotr-toaster"
            transitionName="gotr-toaster">
            {toasts}
        </TransitionGroup>;

        function renderToast(notif) {
            return <Toast key={notif.cid} notification={notif}/>
        }
    }
});

var Toast = React.createClass({
    render: function() {
        var notif = this.props.notification;
        var text = notif.get('text');

        return <div className="gotr-toaster-toast">{text}</div>;
    }
});
