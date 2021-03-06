(function () {
    'use strict';

    angular
        .module('vesta.datepicker', [])
        .directive('vestadp', vestadp);

    function vestadp() {
        var directive = {
            link: link,
            restrict: 'A',
            require: 'ngModel'
        };
        return directive;

        function link(scope, element, attrs, ngModel) {
            var options = scope.$eval(attrs.vestadp) || {};
            angular.extend(options, {
                dateChanged: function (elm, date) {
                    ngModel.$setViewValue(elm.vestadp('getDate'));
                }
            });

            var vdp = $(element).vestadp(options);

            ngModel.$formatters.push(function(value){
                value = value ? new Date(value) : value;
                return vdp.vestadp('formatDate', value);
            });

            scope.$watch(function () {
                return scope.$eval(attrs.minDate);
            }, function (newValue, oldValue) {
                if (newValue == oldValue) return;
                $(element).vestadp('minDate', newValue);
            });

            scope.$watch(function () {
                return scope.$eval(attrs.maxDate);
            }, function (newValue, oldValue) {
                if (newValue == oldValue) return;
                $(element).vestadp('maxDate', newValue);
            });
        }
    }

})();
