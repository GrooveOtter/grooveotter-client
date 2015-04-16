angular.module('gotr')
    .factory('taskListStore', TaskListStore);

TaskListStore.$inject = ['LocalStore', '$q'];
function TaskListStore(LocalStore, $q) {
    var store = new LocalStore('tasks', []);

    var taskListStore = {
        get: get,
        persist: persist
    };

    return taskListStore;

    function get() {
        return $q(function(resolve) {
            resolve(store.get());
        });
    }

    function persist(data) {
        return $q(function(resolve) {
            store.store(data);
            resolve();
        });
    }
}
