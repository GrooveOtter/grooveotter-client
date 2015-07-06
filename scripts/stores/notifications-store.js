var Fluxxor = require('fluxxor');
var constants = require('../constants');

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
        var taskList = flux.store('TaskListStore').getTaskList();
        var itemId = payload.itemId;
        var item = taskList.get(itemId);

        if (item != null) {
            this.notifications.add({
                text: 'Someone liked that you finished “' + item.get('title') + '.”',
                died: false
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
