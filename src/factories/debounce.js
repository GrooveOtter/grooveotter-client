angular.module('gotr')
    .factory('debounce', Debounce);

Debounce.$inject = ['$timeout', '$q'];
function Debounce($timeout, $q) {
    return debounce;

    /**
     * Creates a function that delays invoking func until after
     * wait milliseconds have elapsed since the last time it was
     * invoked.  The created function returns a promise for when
     * the original is invoked.
     *
     * Note: If the immediate option is true, func is invoked on
     * the trailing edge of the timeout only if the the debounced
     * function is invoked more than once during the wait timeout.
     *
     * @param {Function} fn - The function to debounce
     * @param {Number} delay - The number of miliseconds to delay
     * @param {Boolean} [immediate] - if the debounce should be immediate
     * @global
     */
    function debounce(fn, delay, immediate) {
        var timeout;
        var deferred = $q.defer();

        return function() {
            var context = this;
            var args = arguments;

            var callNow = immediate && !timeout;

            if (timeout) {
                $timeout.cancel(timeout);
            }

            timeout = $timeout(later, delay);

            if (callNow) {
                resolve();
            }

            return deferred.promise;

            function later() {
                timeout = null;

                if (!immediate) {
                    resolve();
                }
            }

            function resolve() {
                deferred.resolve(fn.apply(context, args));
                deferred = $q.defer();
            }
        };
    }
}
