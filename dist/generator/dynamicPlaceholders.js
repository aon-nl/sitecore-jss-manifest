"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var makePath = function (separator) {
    var parts = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        parts[_i - 1] = arguments[_i];
    }
    var newParts = [];
    parts.forEach(function (part) {
        var splitParts = part ? part.split(separator).filter(function (val) { return val; }) : [];
        if (splitParts.length) {
            newParts = newParts.concat(splitParts);
        }
    });
    var path = newParts.join(separator);
    // preserve the leading separator if it was provided
    if (parts[0] && parts[0].indexOf(separator) === 0) {
        path = "" + separator + path;
    }
    return path;
};
var formatGuid = function (guid) {
    var formattedGuid = guid;
    if (guid.length === 36) {
        // no wrapping braces
        formattedGuid = "{" + guid + "}";
    }
    return formattedGuid.toUpperCase();
};
exports.getDynamicPlaceholderKey = function (parentPlaceholderPath, rendering, placeholderName) {
    if (rendering && rendering.uid) {
        var uid = formatGuid(rendering.uid);
        var index = 0; // this could become dynamic if we wish to support "incrementing" dynamic placeholders as well
        return makePath('/', parentPlaceholderPath, placeholderName + "-" + uid + "-" + index);
    }
    return makePath('/', parentPlaceholderPath, placeholderName);
};
