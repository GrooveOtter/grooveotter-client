var React = require('react');
var Fluxxor = require('fluxxor');
var classNs = require('classnames');

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var OnboardingStep = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('OnboardingStore')],

    getStateFromFlux: function() {
        var flux = this.getFlux();
        var onboardingStore = flux.store('OnboardingStore');

        return {
            currentStep: onboardingStore.getCurrentStep(),
            steps: onboardingStore.steps,
            currentStepIndex: onboardingStore.currentStepIndex
        };
    },

    render: function() {
        var stepName = this.props.stepName;
        var direction = this.props.direction;
        var currentStep = this.state.currentStep;
        var currentStepIndex = this.state.currentStepIndex;
        var steps = this.state.steps;

        var mainSet = classNs('gotr-onboarding-container', {
            'gotr-onboarding-container-active': stepName === currentStep
        });

        return <div className={mainSet} onClick={this.stopPropogation}>
            <div className="gotr-shadow" onClick={this.skipOnboarding}/>
            <div className="gotr-onboarding">
                <div className="gotr-onboarding-arrows">
                    <div className="gotr-onboarding-arrows-up"/>
                </div>

                <div className="gotr-onboarding-step">
                    {this.props.children}

                    <div className="gotr-onboarding-dots">
                        {steps.map(renderStep)}
                    </div>

                    <div className="gotr-onboarding-buttons">
                        <div className="gotr-onboarding-buttons-exit" onClick={this.skipOnboarding}>
                            Exit
                        </div>

                        <div className="gotr-onboarding-buttons-next" onClick={this.nextStep}>
                            {currentStepIndex === steps.length - 1 ? 'Finish' : 'Next'}
                        </div>
                    </div>
                </div>

                <div className="gotr-onboarding-arrows">
                    <div className="gotr-onboarding-arrows-down"/>
                </div>
            </div>
        </div>;

        function renderStep(stepName1) {
            var dotSet = classNs('gotr-onboarding-dot', {
                'gotr-onboarding-dot-active': stepName1 === currentStep
            });

            return <div key={stepName1} className={dotSet}/>;
        }
    },

    skipOnboarding: function() {
        var flux = this.getFlux();

        flux.actions.skipOnboarding();
    },

    nextStep: function() {
        var flux = this.getFlux();

        flux.actions.nextOnboarding();
    },

    stopPropogation: function(event) {
        event.stopPropagation();
    }
});

module.exports = OnboardingStep;
