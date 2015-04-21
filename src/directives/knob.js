angular.module('gotr')
    .directive('gotrKnob', Knob);

Knob.$inject = [];
function Knob() {
    var directive = {
        restrict: 'EA',
        replace: true,
        templateUrl: 'knob.html',
        scope: {
            value: '=',
            max: '=',
            width: '=',
            label: '='
        },
        controller: KnobController,
        controllerAs: 'vm',
        bindToController: true
    };

    return directive;
}

KnobController.$inject = [];
function KnobController() {
    var vm = this;

    vm.fgLineWidth = vm.width / 2 * 0.03;
    vm.bgLineWidth = vm.width / 2 * 0.24;
    vm.fgColor = '#74aa8b';
    vm.bgColor = '#ededed';
    vm.describeBg = describeBg;
    vm.describeFg = describeFg;
    vm.calcDivStyle = calcDivStyle;
    vm.calcInputStyle = calcInputStyle;

    var center = vm.width / 2;
    var radius = center - vm.bgLineWidth / 2;

    function describeBg() {
        return arc(0, 0);
    }

    function describeFg() {
        return arc(0, vm.value / vm.max  * 360);
    }

    function polarToCartesian(degrees) {
        var radians = degrees * Math.PI / 180;

        return {
            x: center + radius * Math.cos(radians),
            y: center + radius * Math.sin(radians)
        };
    }

    function arc(start, end) {
        var begin = polarToCartesian(start - 90);
        var final = polarToCartesian(end + 0.0001 - 90);

        var large = end - start <= 180 ? 1 : 0;

        return [
            'M', begin.x, begin.y,
            'A', radius, radius, 0, large, 0, final.x, final.y
        ].join(' ');
    }
}

function calcDivStyle(width) {
    return {
        width: width + 'px',
        height: width + 'px',
        position: 'relative',
        WebkitUserSelect: 'none',
        userSelect: 'none',
        margin: '0 auto'
    };
}

function calcInputStyle(width) {
    var bgThickness = 0.24;

    return {
        position: 'absolute',
        top: ((width / 2) - (width / 12)) + 'px',
        left: (width / 2) * bgThickness + 'px',
        width: width - (width * bgThickness) + 'px',
        verticalAlign: 'middle',
        border: '0px',
        background: 'none',
        font: 'normal 36px proxima-nova',
        textAlign: 'center',
        color: '#4d4e5e',
        padding: '0px',
        WebkitAppearance: 'none'
    };
}
