var Fluxxor = require('fluxxor');
var constants = require('../constants');

var OnboardingStore = module.exports = Fluxxor.createStore({
    initialize: function() {
        this.steps = [
            'taskarea',
            'timer',
            'analytics',
            'archive',
            'sharing'
        ];

        this.currentStepIndex = 0;

        gotrUser.on('change', function() {
            this.emit('change');
        }, this);

        this.bindActions(
            constants.SKIP_ONBOARDING, this.onSkipOnboarding,
            constants.NEXT_ONBOARDING, this.onNextOnboarding,
            constants.PREV_ONBOARDING, this.onPrevOnboarding
        );
    },

    onSkipOnboarding: function() {
        this.stopOnboarding();
    },

    onNextOnboarding: function() {
        this.currentStepIndex++;

        if (this.currentStepIndex >= this.steps.length) {
            this.stopOnboarding();
        } else {
            this.emit('change');
        }
    },

    onPrevOnboarding: function() {
        this.currentStepIndex--;

        if (this.currentStepIndex < 0) {
            this.currentStepIndex = 0;
        }

        this.emit('change');
    },

    getCurrentStep: function() {
        if (gotrUser.get('introduced')) {
            return null;
        } else {
            return this.steps[this.currentStepIndex];
        }
    },

    stopOnboarding: function() {
        gotrUser.save({introduced: true});
    }
});
