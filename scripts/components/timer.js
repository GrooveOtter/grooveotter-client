var React = require('react');

var TimerPanel = module.exports = React.createClass({
    getInitialState: function() {
        return {
            selecting: false
        };
    },

    select: function() {
        this.setState({selecting: true});
    },

    unselect: function() {
        this.setState({selecting: false});
    },

    render: function() {
        var selecting = this.state.selecting;

        if (selecting) {
            return <div>
                <div className="gotr-shadow" onClick={this.unselect}/>

                <div className="gotr-timer-area">
                    <Selector/>
                </div>
            </div>;
        } else {
            return <div>
                <div className="gotr-timer-area" onDoubleClick={this.select}>
                    <Timer/>
                </div>
            </div>;
        }
    }
});

var Timer = React.createClass({
    render: function() {
        return <div className="gotr-timer">
            <input type="text" value="20:00" className="gotr-timer-counter" />
            <TimerGraphic/>
        </div>;
    }
});

var TimerGraphic = React.createClass({
    render: function() {
        var seq = 'M 100 13 A 88 88 0 1 0 100.00015358897419 13.000000000134037';
        var sseq = 'M 100 12 A 88 88 0 1 0 100.00015358897419 12.000000000134037';

        return <svg className="gotr-timer-graphic">
            <path className="gotr-timer-shadow" d={sseq}></path>
            <path className="gotr-timer-background" d={seq}></path>
            <path className="gotr-timer-foreground" d={seq}></path>
        </svg>;
    }
});

var SelectorMode = React.createClass({
    render: function() {
        return <div>
            <Selector/>
            <div className="gotr-shadow" onClick={this.props.onLeave}/>
        </div>;
    }
});

var Selector = React.createClass({
    render: function() {
        return <div className="gotr-selector">
            <div className="gotr-selector-box">
                <input value="20" className="gotr-selector-box-input" />
                mins
            </div>

            <SelectorOption>15</SelectorOption>
            <SelectorOption>25</SelectorOption>
            <SelectorOption>45</SelectorOption>
        </div>;
    }
});

var SelectorOption = React.createClass({
    render: function() {
        return <button className="gotr-button gotr-selector-option">
            {this.props.children}
        </button>;
    }
});
