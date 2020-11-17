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
var traversal_1 = require("../../traversal");
var utils_1 = require("./utils");
exports.default = (function (args) {
    var content = args.content;
    var templates = utils_1.enhanceTemplates(args.templates);
    var media = args.media ? __spreadArrays(args.media) : [];
    traversal_1.traverseItems(content, function (item) {
        var mediaOutput = utils_1.buildMediaOutput(item, templates);
        media.push.apply(media, mediaOutput);
    });
    return __assign(__assign({}, args), { media: media });
});
