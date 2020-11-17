"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CommonFieldTypes;
(function (CommonFieldTypes) {
    CommonFieldTypes["SingleLineText"] = "Single-Line Text";
    CommonFieldTypes["MultiLineText"] = "Multi-Line Text";
    CommonFieldTypes["RichText"] = "Rich Text";
    CommonFieldTypes["ContentList"] = "Treelist";
    CommonFieldTypes["ItemLink"] = "Droptree";
    CommonFieldTypes["GeneralLink"] = "General Link";
    CommonFieldTypes["Image"] = "Image";
    CommonFieldTypes["File"] = "File";
    CommonFieldTypes["Number"] = "Number";
    CommonFieldTypes["Checkbox"] = "Checkbox";
    CommonFieldTypes["Date"] = "Date";
    CommonFieldTypes["DateTime"] = "Datetime";
})(CommonFieldTypes = exports.CommonFieldTypes || (exports.CommonFieldTypes = {}));
var FieldStorage;
(function (FieldStorage) {
    FieldStorage["Versioned"] = "versioned";
    FieldStorage["Shared"] = "shared";
    FieldStorage["Unversioned"] = "unversioned";
})(FieldStorage = exports.FieldStorage || (exports.FieldStorage = {}));
function isItemDefinition(obj) {
    return obj.name !== undefined;
}
exports.isItemDefinition = isItemDefinition;
