var Fluxxor = require('fluxxor');
var constants = require('../constants');

var User = require('../models/user');
var Notification = require('../models/notification');

var NotificationsStore = module.exports = Fluxxor.createStore({
    initialize: function() {
        this.notifications = new Notification.Collection();

        this.notifications.on('add remove change', function() {
            this.emit('change');
        }, this);

        this.bindActions(
            constants.NOTIFY_LIKED_ITEM, this.onNotifyLikedItem,
            constants.USER_ACTION, this.onUserAction
        );
    },

    onNotifyLikedItem: function(payload) {
        var flux = this.flux;
        var itemId = payload.itemId;
        var userId = payload.userId;
        var taskList = flux.store('TaskListStore').getTaskList();
        var item = taskList.get(itemId);

        if (item != null) {
            new User({id: userId}).fetch({
                success: function(user) {
                    this.notifications.add({
                        // text: 'Someone liked that you finished “' + item.get('title') + '.”',
                        item: item,
                        user: user,
                        died: false
                    });
                }.bind(this)
            });
        }
    },

    onUserAction: function() {
        this.notifications.where({died: false}).forEach(function(notif) {
            notif.set({died: true});

            setTimeout(function() {
                notif.destroy();
            }, 8000);
        });
    },

    getNotifications: function() {
        return this.notifications;
    }
});
