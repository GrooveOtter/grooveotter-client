/* global console */

angular.module('gotr')
    .controller('DemoController', DemoController);

function DemoController() {
    var vm = this;

    this.sayHi = sayHi;

    function sayHi() {
        console.log('Hi');
    }
}
