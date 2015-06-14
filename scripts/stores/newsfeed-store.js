var Fluxxor = require('fluxxor');
var Newsfeed = require('../models/newsfeed');
var constants = require('../constants');

var NewsfeedStore = module.exports = Fluxxor.createStore({
    initialize: function() {
        this.currentItemIndex = 0;
        this.newsfeed = new Newsfeed();

        this.newsfeed.on('add remove change', function() {
            this.emit('change');
        }.bind(this));

        this.newsfeed.fetch({fetch: true});

        this.bindActions(
            constants.CYCLE_NEWSFEED, this.onCycleNewsfeed
        );
    },

    onCycleNewsfeed: function() {
        var index = this.currentItemIndex;
        var newsfeed = this.newsfeed;

        this.currentItemIndex = (index + 1) % newsfeed.length;

        this.emit('change');
    },

    getCurrentItem: function() {
        return this.newsfeed.at(this.currentItemIndex);
    }
});
