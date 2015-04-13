angular.module('gotr')
    .factory('LocalStore', LocalStoreClass);

LocalStoreClass.$inject = [];
function LocalStoreClass() {
    /**
     * The class for interfacing with local storage.
     * @class
     * @global
     * @param {String} fieldName
     * @param {*} [defaultValue]
     */
    function LocalStore(fieldName, defaultValue) {
        /** The field name to use with localStorage. */
        this.fieldName = fieldName;

        /** The default value. */
        this.defaultValue = defaultValue;
    }

    LocalStore.prototype = {};
    LocalStore.prototype.store = store;
    LocalStore.prototype.get = get;
    LocalStore.prototype.add = add;

    return LocalStore;

    /**
     * Serializes the given value to JSON and stores
     * that in the local storage using the given
     * field name.
     * @param {*} value
     * @memberof LocalStore.prototype
     */
    function store(value) {
        var json = JSON.stringify(value);

        localStorage.setItem(this.fieldName, json);
    }

    /**
     * Retrieves the value from local storage with
     * the given field name and parses it from JSON.
     * If it is missing, it will return the default
     * value.
     * @memberof LocalStore.prototype
     */
    function get() {
        var result = localStorage.getItem(this.fieldName);

        if (result == null) {
            return this.defaultValue;
        } else {
            return JSON.parse(result);
        }
    }

    /**
     * Adds the given amount to the store assuming
     * it is a number.
     * @param {number} amount
     */
    function add(amount) {
        var current = this.get();
        this.store(current + amount);
    }
}
