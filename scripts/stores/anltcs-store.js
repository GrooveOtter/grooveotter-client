var React = require('react');
var Fluxxor = require('fluxxor');
var constants = require('../constants');

var AnltcsStore = module.exports = Fluxxor.createStore({
    initialize: function() {
        this.bindActions(
            constants.LOG_SESSION_TIME, this.onLogSessionTime,
            constants.LOG_SITE_TIME, this.onLogSiteTime
        );
    },

    onLogSessionTime: function(payload) {
        var time = payload.time;
        var total = localStore.getItem('session-time') || 0;

        localStore.setItem('session-time', time + total);
    },

    onLogSiteTime: function(payload) {
        var time = payload.time;
        var total = localStore.getItem('site-time') || 0;

        localStore.setItem('site-time', time + total);
    },

    getSession: function() {
        return this.session;
    }
});
