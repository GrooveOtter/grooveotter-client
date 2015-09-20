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
        var currentItemIndex = (index + 1) % newsfeed.length;

        if (!this.previousItem) {
            this.previousItem = this.newsfeed.at(0)
        }
        var currentItem = this.newsfeed.at(currentItemIndex)
        if (currentItem.get('user_id') == this.previousItem.get('user_id') && currentItemIndex < newsfeed.length - 2) {
            var canGo = false
            this.newsfeed.each(function(notification, index) {
                if (index > currentItemIndex && notification.get('user_id') != this.previousItem.get('user_id')) {
                    canGo = true
                }
            }.bind(this))
            if (canGo) {
                this.newsfeed.remove(currentItem)
                var newPosition = this.newsfeed.length - 1;
                for (var i = index+1; i < this.newsfeed.length - 2; i++) {
                    if (this.newsfeed.at(i).get('user_id') != currentItem.get('user_id')) {
                        newPosition = i+1;
                        break;
                    } else {
                        var moveable = this.newsfeed.at(i);
                        this.newsfeed.remove(moveable);
                        this.newsfeed.add(currentItem, {at: i});
                        currentItem = moveable;
                    }
                }
                this.newsfeed.add(currentItem, {at: newPosition})
                this.onCycleNewsfeed()
            } else {
                this.currentItemIndex = 0
                this.previousItem = null
                this.onCycleNewsfeed()
            }
            return
        }
        this.currentItemIndex = currentItemIndex
        this.previousItem = currentItem

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

        if (taskDay != currentDay && randomInt === 4 && userName != '' && userName != undefined && userName  != '') {
            var notification = new Notification({'text': text, user: gotrUser, 'user_id': gotrUser.id, type: 'first_task'});
            notification.save({}, function(model, response) {
                this.newsfeed.add(model, {at: this.currentItemIndex + 1});
                this.emit('change')
            }.bind(this));
            localStorage.setItem('taskDay', currentDay);
        }
    }


});
