angular.module('gotr')
    .controller('DashboardController', DashboardController);

DashboardController.$inject = ['taskList'];
function DashboardController(taskList) {
    var vm = this;

    this.taskList = taskList;
}
