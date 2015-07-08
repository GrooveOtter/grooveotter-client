var React = require('react');
var Fluxxor = require('fluxxor');
var tweenState = require('react-tween-state');

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

// This is the code for the analytics widget in
// the bottom-right corner of the dashboard. It
// uses SVG masks and lines for the graph, and
// grabs data from the analytics store.

var Anltcs = module.exports = exports = React.createClass({
    mixins: [FluxMixin, tweenState.Mixin],

    getInitialState: function() {
        var flux = this.getFlux();

        return {
            siteTime: flux.store('AnltcsStore').getSiteTime(),
            sessionTime: 0
        };
    },

    componentDidMount: function() {
        var flux = this.getFlux();

        this.setStateFromFlux();
        flux.store('AnltcsStore').on('change', this.setStateFromFlux);
    },

    componentWillUmount: function() {
        var flux = this.getFlux();

        flux.store('AnltcsStore').removeListener('change', this.setStateFromFlux);
    },

    setStateFromFlux: function() {
        var flux = this.getFlux();
        var anltcsStore = flux.store('AnltcsStore');

        this.setState({siteTime: anltcsStore.getSiteTime()});

        this.tweenState('sessionTime', {
            easing: tweenState.easingTypes.easeInOutQuad,
            duration: 750,
            endValue: anltcsStore.getSessionTime()
        });
    },

    render: function() {
        var sessionTime = Math.floor(+this.getTweeningValue('sessionTime')/60000);
        var siteTime = this.state.siteTime;
        var cord = Math.floor(sessionTime / siteTime * 100);
        var total = Math.floor(siteTime / (60 * 1000));
        // this occurs on page-load,
        // when sessionTime and siteTime are 0
        if (isNaN(cord)) {
            cord = 0;
        }

        // TODO: setup linguistics
        return <div className="gotr-anltcs">
            <div className="gotr-anltcs-count">{sessionTime}</div>
            <div className="gotr-anltcs-desc">minutes in Groove Today</div>

        </div>;
    }
});
