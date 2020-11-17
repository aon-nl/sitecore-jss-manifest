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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (args) {
    var placeholders = args.placeholders, placeholderNames = args.placeholderNames, rootPlaceholders = args.rootPlaceholders;
    var knownPlaceholderNames = placeholderNames.concat(rootPlaceholders);
    var finalPlaceholders = __spreadArrays(placeholders);
    knownPlaceholderNames.forEach(function (name) {
        if (!finalPlaceholders.find(function (existing) { return existing.name === name; })) {
            finalPlaceholders.push({ name: name });
        }
    });
    return __assign(__assign({}, args), { placeholders: finalPlaceholders });
});
