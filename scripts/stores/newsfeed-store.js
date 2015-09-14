var Fluxxor = require('fluxxor');
var Newsfeed = require('../models/newsfeed');
var Notification = require('../models/notification');
var constants = require('../constants');
var _ = require('lodash');

var NewsfeedStore = module.exports = Fluxxor.createStore({
    initialize: function() {
        this.currentItemIndex = 0;
        this.lockCycle = false
        this.newsfeed = new Newsfeed();

        this.newsfeed.on('reset add remove change', function() {
            this.emit('change');
        }, this);
        this.newsfeed.fetch({reset: true});
        this.bindActions(
            constants.NOTIFY_LIKED_ITEM, this.onNotifyLikedItem,
            constants.CYCLE_NEWSFEED, this.onCycleNewsfeed,
            constants.LIKE_SHARED_ITEM, this.onLikeSharedItem,
            constants.COMPLETE_TASK, this.onCompleteTask,
            constants.LOCK_CYCLE, this.stopCycle,
            constants.UNLOCK_CYCLE, this.startCycle
        );
    },

    stopCycle: function() {
        this.lockCycle = true
        this.emit('change')
    },

    startCycle: function() {
        if (this.flux.store('SessionStore').session.isStarted()) {
            return
        }
        this.lockCycle = false
        this.emit('change')
    },

    onCycleNewsfeed: function() {
        if (this.lockCycle) {
            return
        }
        var index = this.currentItemIndex;
        var newsfeed = this.newsfeed;

        this.currentItemIndex = (index + 1) % newsfeed.length;


        this.emit('change');
    },

    onLikeSharedItem: function(payload) {
        var item = payload.item;

        item.get('task').like();
        this.emit('change');
    },

    getCurrentItem: function() {
        return this.newsfeed.at(this.currentItemIndex);
    },

    onNotifyLikedItem: function(payload) {
        var item = payload.itemId
        var notification = this.newsfeed.findWhere({task_id: item})

        notification.fetch({
            success: function() {
                this.emit('change')
            }.bind(this)
        })
    },

    onCompleteTask: function() {
        var taskDay = localStorage.getItem('taskDay');
        var currentDay = new Date().getDate();
        var userName = gotrUser.get('full_name');
        var text = userName + ' finished their first task of the day';
        var randomInt = Math.floor(Math.random() * 10);

        if (taskDay != currentDay && randomInt === 4 && userName != '' && userName != undefined) {
            var notification = new Notification({'text': text,'user_id': gotrUser.id, type: 'first_task'});
            notification.save();
            localStorage.setItem('taskDay', currentDay);
        }
    }


});
