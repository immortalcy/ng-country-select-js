(function () {
    "use strict";
    angular.module("ngCountrySelect", []).constant('csConfig', {
        defaultCountry: "",
        onlyCountries: void 0,
        preferredCountries: ['us', 'gb'],
        responsiveDropdown: false
    }).directive('ngCountrySelect', function (csConfig) {
            return {
                restrict: 'A',
                require: '^ngModel',
                scope: {
                    ngModel: '=',
                    country: '='
                },

                link: function (scope, element, attrs, ctrl) {
                    var handleWhatsSupposedToBeAnArray, options, read, watchOnce;

                    read = function () {
                        return ctrl.$setViewValue(element.val());
                    };

                    handleWhatsSupposedToBeAnArray = function (value) {
                        if (value instanceof Array) {
                            return value;
                        } else {
                            return value.toString().replace(/[ ]/g, '').split(',');
                        }
                    };

                    options = angular.copy(csConfig);
                    angular.forEach(options, function (value, key) {
                        var option;
                        if (!(attrs.hasOwnProperty(key) && angular.isDefined(attrs[key]))) {
                            return;
                        }
                        option = attrs[key];
                        if (key === 'preferredCountries') {
                            return options.preferredCountries = handleWhatsSupposedToBeAnArray(option);
                        } else if (key === 'onlyCountries') {
                            return options.onlyCountries = handleWhatsSupposedToBeAnArray(option);
                        } else if (typeof value === "boolean") {
                            return options[key] = option === "true";
                        } else {
                            return options[key] = option;
                        }
                    });

                    watchOnce = scope.$watch('ngModel', function (newValue) {
                        return scope.$$postDigest(function () {
                            if (newValue !== null && newValue !== void 0 && newValue.length > 0) {
                                //if (newValue[0] !== '+') {
                                //  newValue = '+' + newValue;
                                //}
                                element.val(newValue);
                            }
                            element.countrySelect(options);
                            return watchOnce();
                        });
                    });

                    element.on('blur keyup change', function (event) {
                        return scope.$apply(read);
                    });

                    return element.on('$destroy', function () {
                        element.countrySelect('destroy');
                        return element.off('blur keyup change');
                    });
                }

            };
        }
    );

}).call(this);