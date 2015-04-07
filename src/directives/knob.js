angular.module('gotr')
    .directive('gotrKnob', Knob);

Knob.$inject = [];
function Knob() {
    var directive = {
        restrit: 'EA',
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
        link: link,
        bindToController: true
    };

    return directive;

    function link(scope, element, _, vm) {
        var canvas = angular.element(element[0]).find('canvas')[0];
        var ctx = canvas.getContext('2d');

        // There might be some shorthand to make this shorter
        draw(vm.value, vm.max);

        scope.$watch('vm.value', function(value) {
            draw(value, vm.max);
        });

        scope.$watch('vm.max', function(max) {
            draw(vm.value, max);
        });

        function draw(value, max) {
            var min = 0;
            var arc = 2 * Math.PI;
            var center = vm.width / 2;
            var bgLineWidth = center * vm.bgThickness;
            var fgLineWidth = center * vm.fgThickness;

            value = Math.min(max, Math.max(min, value));

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            var angle = (value - min) * arc / (max - min);

            var radius = center - bgLineWidth / 2;

            var start = 1.5 * Math.PI;
            var end = 1.5 * Math.PI + arc;

            ctx.beginPath();
            ctx.strokeStyle = vm.bgColor;
            ctx.lineWidth = bgLineWidth;
            ctx.arc(center, center, radius, end, start, true);
            ctx.stroke();

            ctx.beginPath();
            ctx.strokeStyle = vm.fgColor;
            ctx.lineWidth = fgLineWidth;
            if (value === 0) {
                ctx.arc(center, center, radius, end, start, true);
            } else {
                ctx.arc(center, center, radius, start, start + angle, true);
            }
            ctx.stroke();
        }
    }
}

KnobController.$inject = [];
function KnobController() {
    var vm = this;

    var width = vm.width;
    vm.fgThickness = 0.03;
    vm.bgThickness = 0.24;
    vm.fgColor = '#77A78D';
    vm.bgColor = '#EDEDED';

    vm.inputStyle = {
        position: 'absolute',
        top: ((width / 2) - (width / 8)) + 'px',
        left: (width / 2) * vm.bgThickness + 'px',
        width: width - (width * vm.bgThickness) + 'px',
        verticalAlign: 'middle',
        border: '0px',
        background: 'none',
        font: '300 34px Muli',
        textAlign: 'center',
        color: '#4d4e5e',
        padding: '0px',
        WebkitAppearance: 'none'
    };

    vm.divStyle = {
        width: vm.width + 'px',
        height: vm.width + 'px',
        position: 'relative',
        userSelect: 'none'
    };
}
