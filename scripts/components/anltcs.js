var React = require('react');
var Fluxxor = require('fluxxor');

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Anltcs = module.exports = exports = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('TaskListStore')],

    getStateFromFlux: function() {
        var flux = this.getFlux();
        var AnltcsStore = flux.store('AnltcsStore');

        return {
            sessionTime: AnltcsStore.getSessionTime(),
            siteTime: AnltcsStore.getSiteTime()
        };
    },

    render: function() {
        var sessionTime = this.state.sessionTime;
        var siteTime = this.state.siteTime;

        var cord = (sessionTime / siteTime) * 130;
        var working = Math.floor(sessionTime / (60 * 1000));
        var organizing = Math.floor(siteTime / (60 * 1000)) - working;

        // TODO: setup linguistics

        return <div className="gotr-anltcs">
            <div className="gotr-anltcs-count">{working}</div>
            <div className="gotr-anltcs-desc">minutes in Groove</div>
            <svg className="gotr-anltcs-graphic">
                <mask id="gotr-anltcs-bar">
                    <line x1="10" y1="10" y2="10" x2="140"/>
                </mask>
                <line x1={cord + 1} y1="10" x2="200" y2="10" className="gotr-anltcs-background"/>
                <line x1="0" y1="10" y2="10" x2={cord} className="gotr-anltcs-foreground"/>
            </svg>

            <div className="gotr-anltcs-minutes">
                <span className="gotr-anltcs-minutes-working"/>
                {working} working
            </div>

            <div className="gotr-anltcs-minutes">
                <span className="gotr-anltcs-minutes-organizing"/>
                {organizing} organizing
            </div>
        </div>;
    }
});
