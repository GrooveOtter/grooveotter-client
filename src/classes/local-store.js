angular.module('gotr')
    .factory('LocalStore', LocalStoreClass);

LocalStoreClass.$inject = [];
function LocalStoreClass() {
    /**
     * The class for interfacing with local storage.
     * @class
     * @param {String} fieldName
     * @param {*} [defaultValue]
     */
    function LocalStore(fieldName, defaultValue) {
        /** The field name to use with localStorage. */
        this.fieldName = fieldName;

        /** The default value. */
        this.defaultValue = defaultValue;
    }

    LocalStore.prototype = /** @lends LocalStore.prototype */ {
        /**
         * Stores the given value in local storage using
         * the given field name.
         * @param {*} value
         * @method
         */
        store: store,

        /**
         * Retrieves the value from local storage with
         * the given field name. If it is missing, it
         * will return the default value.
         * @method
         */
        get: get
    };

    return LocalStore;

    function store(value) {
        localStorage.setItem(this.fieldName, value);
    }

    function get() {
        var result = localStorage.getItem(this.fieldName);

        if (result == null) {
            return this.defaultValue;
        } else {
            return result;
        }
    }
}
