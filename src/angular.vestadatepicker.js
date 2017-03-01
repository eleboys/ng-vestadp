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
            var options = JSON.parse(attrs.vestadp) || {};
            angular.extend(options, {
                dateChanged: function (elm, date) {
                    ngModel.$setViewValue(elm.vestadp('getDate'));
                }
            });

            var vdp = $(element).vestadp(options);
        }
    }

})();
