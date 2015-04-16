angular.module('gotr')
    .factory('taskListStore', TaskListStore);

TaskListStore.$inject = ['LocalStore', '$q'];
function TaskListStore(LocalStore, $q) {
    var store = new LocalStore('tasks', []);

    var taskListStore = {
        get: get,
        insert: insert
    };

    return taskListStore;

    function get() {
        return $q(function(resolve) {
            resolve(store.get());
        });
    }

    function insert(task) {
        return get().then(function(taskList) {
            taskList.push(task);
            store.store(taskList);
            return task;
        });
    }
}
