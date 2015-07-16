var React = require('react');
var Fluxxor = require('fluxxor');
var Timer = require('../models/newsfeed');
var constants = require('../constants');

var TimerStore = module.exports = Fluxxor.createStore({
  initialize: function() {
    this.bindActions(
      constants.OPEN_TIMER, this.onOpenTimer,
      constants.START_TIMER, this.onStartTimer
    );
  },
  onOpenTimer: function() {
    this.emit('openTimer');
  }
});