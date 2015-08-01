var React = require('react');
var Fluxxor = require('fluxxor');
var OnboardingStep = require('./onboarding-step');

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var TimerPanel = module.exports = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('SessionStore', 'TaskListStore')],

    componentDidMount: function() {
        var flux = this.getFlux();
        var timerStore = flux.store('TimerStore');
        timerStore.on('openTimer', this.startSelecting);
        timerStore.on('closeTimer', this.stopSelecting);
    },

    componentDidUnmount: function() {
        var flux = this.getFlux();
        var timerStore = flux.store('TimerStore');
        timerStore.removeListener('openTimer', this.startSelecting);
        timerStore.removeListener('closeTimer', this.stopSelecting);
    },

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

    closeSelector: function() {
        var flux = this.getFlux();
        var session = this.state.session;
        var mins = this.state.mins;
        var task = session.get('task');
        var duration = mins * 60 * 1000;

        if (!isNaN(duration)) {
            flux.actions.updateTaskDuration(task, duration);
            this.stopSelecting();
        }
    },

    checkForInput: function(event) {
        // check for either enter, tab or esc
        if (event.which === 9 || event.which === 13 || event.which === 27) {
            this.closeSelector();
        }
    },

    stopSelecting: function() {
        console.log('selecting')
        this.setState({selecting: false});
    },

    updateMins: function(mins) {
        this.setState({
            mins: mins
        });
    },

    render: function() {
        var selecting = this.state.selecting;
        var session = this.state.session;
        var mins = this.state.mins;
        var duration = session.get('task').get('duration');

        if (selecting) {
            return <div className="gotr-timer-area-container">
                <div className="gotr-timer-area gotr-timer-area-selecting">
                    <Selector mins={mins} onChange={this.updateMins} onKeyDown={this.checkForInput}/>
                </div>
                <div className="gotr-shadow2" onClick={this.closeSelector}/>
                <OnboardingStep stepName="timer">
                    <div className="gotr-onboarding-title">
                        Estimate your time
                    </div>

                    <div className="gotr-onboarding-text">
                        How long does it usually take you? Estimate your time and work undistracted.
                    </div>
                </OnboardingStep>
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
            if (session.isStarted() && self.isMounted()) {
                self.forceUpdate();
            }
        });
    },

    render: function() {
        var session = this.state.session;
        var duration = session.get('task').get('duration');
        var timeRemaining = session.timeRemaining();
        var text = session.clockText();

        return <div className="gotr-timer">
            <div className="gotr-timer-counter">
                <span>{text}</span>
                {!session.isStarted() && <img className="gotr-timer-pencil" src='/pencil.png'/>}
            </div>

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
    mixins: [FluxMixin],
    componentDidMount: function() {
        this.refs.minsInput.getDOMNode().select();
    },

    updateMins: function(event) {
        var input = +event.target.value;
        this.props.onChange(input);
    },

    render: function() {
        var choices = [15, 25, 45];
        var keyDown = this.props.onKeyDown;
        var change = this.props.onChange;
        var mins = this.props.mins;

        return <div className="gotr-selector" onKeyDown={keyDown}>
            <div className="gotr-selector-box">
                <input type="number"
                    ref="minsInput"
                    onChange={this.updateMins}
                    value={mins}
                    onKeyDown={this.checkForInput}
                    className="gotr-selector-box-input"
                    autoFocus={focus}
                />

                mins
            </div>

            <div>
                {choices.map(toOption)}
            </div>
        </div>;

        function toOption(choice) {
            return <SelectorOption onClick={choose} key={choice}>
                {choice}
            </SelectorOption>;

            function choose() {
                change(choice);
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
