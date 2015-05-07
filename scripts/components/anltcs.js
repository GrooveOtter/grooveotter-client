var React = require('react');

var Anltcs = module.exports = exports = React.createClass({
    render: function() {
        return <div className="gotr-anltcs">
            <div className="gotr-anltcs-count">45</div>
            <div className="gotr-anltcs-desc">minutes in Groove</div>
            <svg className="gotr-anltcs-graphic">
                <mask id="gotr-anltcs-bar">
                    <line x1="10" y1="10" y2="10" x2="140"></line>
                </mask>
                <line x1="91" y1="10" x2="200" y2="10" className="gotr-anltcs-background"></line>
                <line x1="0" y1="10" y2="10" x2="90" className="gotr-anltcs-foreground"></line>
            </svg>
            <div className="gotr-anltcs-minutes"><span className="gotr-anltcs-minutes-working"></span>577 working</div>
            <div
            className="gotr-anltcs-minutes"><span className="gotr-anltcs-minutes-organizing"></span>62 organizing</div>
        </div>;
    }
});
