angular.module('gotr')
    .controller('DashboardController', DashboardController);

DashboardController.$inject = ['$scope', 'taskList', 'taskListStore'];
function DashboardController($scope, taskList, taskListStore) {
    var vm = this;

    vm.taskList = taskList;

    vm.tabs = [
        {title: 'Today', content: 'today.html', active: true},
        {title: 'Blocker', content: 'blocker.html', active: false},
        {title: 'Archive', content: 'archive.html', active: false}
    ];

    vm.selectTab = selectTab;

    $scope.$watchCollection('vm.taskList', function() {
        taskListStore.persist(taskList);
    });

    function selectTab(tab) {
        vm.tabs.forEach(function(tab) {
            tab.active = false;
        });

        tab.active = true;
    }
}
