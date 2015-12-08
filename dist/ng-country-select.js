(function() {
    "use strict";
    angular.module("countrySelect", []).constant('csConfig', {

    }).directive('countrySelect', function() {
            return {
                restrict: 'A',
                require: '^ngModel',
                scope: {
                    ngModel: '=',
                    country: '='
                },
                link: function(scope, element) {
                    element.countrySelect();
                }
            };
        }
    );

}).call(this);