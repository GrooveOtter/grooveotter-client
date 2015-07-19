var Fluxxor = require('fluxxor');
var Newsfeed = require('../models/newsfeed');
var constants = require('../constants');
var _ = require('lodash');

var NewsfeedStore = module.exports = Fluxxor.createStore({
    initialize: function() {
        this.currentItemIndex = 0;
        this.newsfeed = new Newsfeed();

        this.newsfeed.on('reset add remove change', function() {
            this.emit('change');
        }, this);
        this.newsfeed.fetch({reset: true});
        this.bindActions(
            constants.CYCLE_NEWSFEED, this.onCycleNewsfeed,
            constants.LIKE_SHARED_ITEM, this.onLikeSharedItem
        );
    },

    onCycleNewsfeed: function() {
        var index = this.currentItemIndex;
        var newsfeed = this.newsfeed;

        this.currentItemIndex = (index + 1) % newsfeed.length;

        this.emit('change');
    },

    onLikeSharedItem: function(payload) {
        var item = payload.item;

        item.like();
    },

    getCurrentItem: function() {
        return this.newsfeed.at(this.currentItemIndex);
    }
});
