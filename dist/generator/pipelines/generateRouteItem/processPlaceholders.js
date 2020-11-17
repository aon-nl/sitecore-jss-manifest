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
var processRenderings = function (renderings, routeName) {
    if (renderings === void 0) { renderings = []; }
    return renderings.reduce(function (result, rendering) {
        if (rendering.placeholders) {
            return __spreadArrays(result, getPlaceholderNames(rendering.placeholders, routeName));
        }
        return result;
    }, []);
};
var getPlaceholderNames = function (placeholders, routeName) {
    if (placeholders === void 0) { placeholders = {}; }
    return Object.keys(placeholders).reduce(function (result, phName) {
        var placeholder = {
            renderings: placeholders[phName],
            phName: phName,
        };
        if (!placeholder.renderings || !Array.isArray(placeholder.renderings)) {
            // tslint:disable-next-line:no-string-throw max-line-length
            throw "Placeholder '" + phName + "' on route '" + routeName + "' contained non-array renderings data. Probably a route data authoring error. (YAML indentation?)";
        }
        return __spreadArrays(result, [phName], processRenderings(placeholder.renderings, routeName));
    }, []);
};
exports.default = (function (args) {
    if (!args.route) {
        return args;
    }
    var placeholderNames = getPlaceholderNames(args.route.placeholders, args.route.name);
    return __assign(__assign({}, args), { item: __assign(__assign({}, args.item), { layout: __assign(__assign({}, args.item.layout), { placeholders: placeholderNames }) }) });
});
