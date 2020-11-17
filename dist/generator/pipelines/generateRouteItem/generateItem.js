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
var utils_1 = require("../../utils");
exports.default = (function (args) {
    if (!args.route) {
        return args;
    }
    var item = Object.assign({}, args.route);
    delete item.children;
    delete item.path;
    delete item.placeholders;
    delete item.fields;
    item.layout = {
        renderings: [],
        placeholders: [],
    };
    if (args.route.fields) {
        item.fields = utils_1.convertComponentDataToFields({ data: args.route.fields, context: { item: item } });
    }
    return __assign(__assign({}, args), { item: item });
});
