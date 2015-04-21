angular.module('gotr')
    .controller('DashboardController', DashboardController);

DashboardController.$inject = ['$scope', 'taskList', 'taskListStore'];
function DashboardController($scope, taskList, taskListStore) {
    var vm = this;

    vm.taskList = taskList;

    $scope.$watchCollection('vm.taskList', function() {
        taskListStore.persist(taskList);
    });
}
