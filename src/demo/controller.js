/* global alert */

angular.module('gotr')
    .controller('DemoController', DemoController);

DemoController.$inject = ['$location'];
function DemoController($location) {
    var vm = this;

    vm.sayHi = sayHi;

    function sayHi() {
        alert('Hi');
    }
}
