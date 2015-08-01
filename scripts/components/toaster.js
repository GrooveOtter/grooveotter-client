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
        var user = notif.get('user');
        var item = notif.get('item');
        var pic = user.get('picture');
        var name = user.get('full_name');
        var title = item.get('title');

        return <div className="gotr-toaster-toast">
            <div className="gotr-toaster-pic">
                <img src={pic}/>
            </div>

            <div className="gotr-toaster-text">
                <span className="gotr-toaster-text-highlight">{name}</span>
                &nbsp;liked that you finished&nbsp;
                <span className="gotr-toaster-text-highlight">&ldquo;{title}&rdquo;</span>
            </div>
        </div>;
    }
});
