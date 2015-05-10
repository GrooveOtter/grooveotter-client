var React = require('react');
var Fluxxor = require('fluxxor');

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Anltcs = module.exports = exports = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('AnltcsStore')],

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

        var cord = Math.floor(sessionTime / siteTime * 100);
        var total = Math.floor(siteTime / (60 * 1000));
        var working = Math.floor(sessionTime / (60 * 1000));
        var organizing = total - working;

        if (isNaN(cord)) {
            cord = 0;
        }

        // TODO: setup linguistics

        return <div className="gotr-anltcs">
            <div className="gotr-anltcs-count">{total}</div>
            <div className="gotr-anltcs-desc">minutes in Groove</div>
            <div className="gotr-anltcs-graphic-container">
                <svg className="gotr-anltcs-graphic">
                    <mask id="gotr-anltcs-bar">
                        <line x1="5" y1="5" y2="5" x2="100%"/>
                    </mask>

                    <line x1="0" y1="5" x2="200%" y2="5" className="gotr-anltcs-background"/>
                    <line x1="0" y1="5" y2="5" x2={cord + '%'} className="gotr-anltcs-foreground"/>
                    <line x1={cord + '%'} y1="0" x2={cord + '%'} y2="10" className="gotr-anltcs-divider"/>
                </svg>
            </div>

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
