"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (args) {
    var placeholderNames = args.placeholderNames;
    var result = placeholderNames
        // for any placeholders of form '/key1/key2/etc...', extract the last segment of the key
        .map(function (phKey) {
        if (phKey.indexOf('/') !== -1) {
            return phKey.substring(phKey.lastIndexOf('/') + 1);
        }
        return phKey;
    })
        // http://stackoverflow.com/a/14438954/9324
        // filter out duplicate values
        .filter(function (phKey, index, arr) { return arr.indexOf(phKey) === index; });
    return __assign(__assign({}, args), { placeholderNames: result });
});
