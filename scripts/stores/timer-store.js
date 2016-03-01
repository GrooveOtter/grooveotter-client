var React = require('react');
var Fluxxor = require('fluxxor');
var Timer = require('../models/newsfeed');
var constants = require('../constants');

var TimerStore = module.exports = Fluxxor.createStore({
    initialize: function() {
        this.bindActions(
            constants.OPEN_TIMER, this.onOpenTimer,
            constants.NEXT_ONBOARDING, this.onNextOnboarding
            // constants.SKIP_ONBOARDING, this.onSkipOnboarding
        );
    },

    onOpenTimer: function() {
        this.emit('openTimer');
    },

    onNextOnboarding: function() {
        this.waitFor(['OnboardingStore'], function(onboardingStore) {
            if (onboardingStore.getCurrentStep() === 'timer') {
                this.emit('openTimer');
            } else if (onboardingStore.getPreviousStep() === 'timer') {
                this.emit('closeTimer');
            }
        });
    }
});
