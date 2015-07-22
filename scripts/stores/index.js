var SessionStore = require('./session-store');
var TaskListStore = require('./task-list-store');
var AnltcsStore = require('./anltcs-store');
var NewsfeedStore = require('./newsfeed-store');
var TimerStore = require('./timer-store');
var NotificationsStore = require('./notifications-store');
var OnboardingStore = require('./onboarding-store');

var stores = module.exports = {
    getStores: getStores
};

function getStores() {
    return {
        SessionStore: new SessionStore(),
        TaskListStore: new TaskListStore(),
        AnltcsStore: new AnltcsStore(),
        NewsfeedStore: new NewsfeedStore(),
        TimerStore: new TimerStore(),
        NotificationsStore: new NotificationsStore(),
        OnboardingStore: new OnboardingStore()
    }
}
