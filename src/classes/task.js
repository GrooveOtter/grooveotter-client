angular.module('gotr')
    .factory('Task', TaskClass);

TaskClass.$inject = [];
function TaskClass() {
    /**
     * A timer for task sessions.
     * @class
     * @global
     * @param {String} title
     * @param {Number} limit
     * @param {Boolean} [isNew]
     */
    function Task(title, limit, isNew) {
        /** A unique identifier to prevent Angular from throwing a fit */
        this.id = generateKey();

        /** The title of the task */
        this.title = title;

        /** The time limit of the task in miliseconds */
        this.limit = limit;

        /** Indicates if the task has been completed */
        this.completed = false;

        /** Indicates if the task is an unpersisted model */
        this.isNew = isNew || false;
    }

    Task.prototype = {};

    Task.prototype.complete = complete;

    return Task;

    function complete() {
        this.completed = true;
    }
}

function generateKey() {
    return Math.random().toString(16).slice(2);
}
