var React = require('react');
var Fluxxor = require('fluxxor');
var dateformat = require('dateformat');

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var TimerPanel = module.exports = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('SessionStore', 'TaskListStore')],

    getInitialState: function() {
        return {
            mins: 20 * 60 * 1000,
            selecting: false
        };
    },

    getStateFromFlux: function() {
        var flux = this.getFlux();

        return {
            session: flux.store('SessionStore').getSession()
        };
    },

    startSelecting: function() {
        var session = this.state.session;
        var task = session.get('task');
        var duration = task.get('duration');
        var mins = Math.floor(duration / (60 * 1000));

        if (!session.isStarted()) {
            this.setState({
                mins: mins,
                selecting: true
            });
        }
    },
    stopSelecting: function() {
        var flux = this.getFlux();
        var session = this.state.session;
        var mins = this.state.mins;
        var task = session.get('task');
        var duration = mins * 60 * 1000;

        console.log('flux', flux);
        flux.actions.updateTaskDuration(task, duration);
        this.setState({selecting: false});
    },

    updateMins: function(mins) {
        this.setState({
            mins: mins
        });
    },

    checkForInput: function(e) {
        var tabKey = 9;
        if (e.which === tabKey) {
            this.setState({selecting:false});
        }
    },

    render: function() {
        var selecting = this.state.selecting;
        var session = this.state.session;
        var mins = this.state.mins;
        var duration = session.get('task').get('duration');

        if (selecting) {
            return <div className="gotr-timer-area-container">
                <div onKeyDown={this.testFunction} className="gotr-timer-area gotr-timer-area-selecting">
                    <Selector mins={mins} onChange={this.updateMins} />
                </div>

                <div className="gotr-shadow" onClick={this.stopSelecting}/>
            </div>;
        } else {
            return <div className="gotr-timer-area-container">
                <div className="gotr-timer-area" onClick={this.startSelecting}>
                    <Timer/>
                </div>
            </div>;
        }
    }
});

var Timer = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('SessionStore')],

    getStateFromFlux: function() {
        var flux = this.getFlux();

        return {
            session: flux.store('SessionStore').getSession()
        };
    },

    componentDidUpdate: function() {
        var session = this.state.session;
        var self = this;

        requestAnimationFrame(function() {
            if (session.is() && self.isMounted()) {
                self.forceUpdate();
            }
        });
    },

    render: function() {
        var session = this.state.session;
        var duration = session.get('task').get('duration');
        var timeRemaining = session.timeRemaining();
        var text = dateformat(new Date(timeRemaining), 'MM:ss');

        return <div className="gotr-timer">
            <div className="gotr-timer-counter">{text}</div>
            <TimerGraphic ratio={timeRemaining / duration}/>
        </div>;
    }
});

var TimerGraphic = React.createClass({
    describeShadow: function() {
        return arc(0, 0, true);
    },

    describeBackground: function() {
        return arc(0, 0, false);
    },

    describeForeground: function() {
        var ratio = this.props.ratio;

        return arc(0, 360 - ratio * 360, false);
    },

    render: function() {
        var shadow = this.describeShadow();
        var background = this.describeBackground();
        var foreground = this.describeForeground();

        return <svg className="gotr-timer-graphic">
            <path className="gotr-timer-shadow" d={shadow}></path>
            <path className="gotr-timer-background" d={background}></path>
            <path className="gotr-timer-foreground" d={foreground}></path>
        </svg>;
    }
});

var Selector = React.createClass({

    updateMins: function(event) {
        this.props.onChange(event.target.value);
    },

    render: function() {
        var choices = [15, 25, 45];
        var onChange = this.props.onChange;
        var mins = this.props.mins;

        return <div className="gotr-selector">
            <div className="gotr-selector-box">
                <input
                    onChange={this.updateMins}
                    value={mins}
                    className="gotr-selector-box-input"
                />

                mins
            </div>

            {choices.map(toOption.bind(this))}
        </div>;

        function toOption(choice) {
            return <SelectorOption onClick={change} key={choice}>
                {choice}
            </SelectorOption>;

            function change() {
                onChange(choice);
            }
        }
    }
});

var SelectorOption = React.createClass({
    render: function() {
        return <button className="gotr-button gotr-selector-option" {...this.props}>
            {this.props.children}
        </button>;
    }
});

function polarToCartesian(degrees) {
    var radians = degrees * Math.PI / 180;
    var radius = 88;

    return {
        x: 100 + radius * Math.cos(radians),
        y: 100 + radius * Math.sin(radians)
    };
}

function arc(start, end, shadow) {
    var begin = polarToCartesian(start - 90);
    var final = polarToCartesian(end + 0.0001 - 90);
    var radius = 88;

    var large = end - start <= 180 ? 1 : 0;

    return [
        'M', begin.x, begin.y + !shadow,
        'A', radius, radius, 0, large, 0, final.x, final.y + !shadow
    ].join(' ');
}
