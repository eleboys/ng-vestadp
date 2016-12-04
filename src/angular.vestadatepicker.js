(function () {
    'use strict';

    angular
        .module('vesta.datepicker', [])
        .directive('vestadp', vestadp);

    function vestadp() {
        var directive = {
            link: link,
            restrict: 'A',
            require: 'ngModel',
            scope: {
                vdpSelectedDate: "="
            }
        };
        return directive;

        function link(scope, element, attrs, ngModel) {
            scope.options = JSON.parse(attrs.vestadp) || {};
            angular.extend(scope.options, {
                dateChanged: function (elm, date) {
                    if (!scope.vdpSelectedDate || !scope.vdpSelectedDate.toDateString || scope.vdpSelectedDate.toDateString()!=elm.vestadp('getDate').toDateString()){
                        scope.vdpSelectedDate = elm.vestadp('getDate');
                    }
                    ngModel.$setViewValue(date);
                    ngModel.$render();
                }
            });

            var vdp = $(element).vestadp(scope.options);

            scope.$watch("vdpSelectedDate", function(){
                if (scope.vdpSelectedDate){
                    if (vdp.vestadp('getDate').toDateString()!=scope.vdpSelectedDate.toDateString()){
                        var d = scope.vdpSelectedDate;
                        vdp.vestadp('setDate', {year:d.getFullYear(), month: d.getMonth()+1, day: d.getDate()});
                    }
                }
            });
        }
    }

})();
