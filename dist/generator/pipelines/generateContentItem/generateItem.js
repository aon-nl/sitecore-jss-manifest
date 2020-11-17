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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var utils_1 = require("../../utils");
exports.default = (function (args) {
    var _a = args.content, componentName = _a.componentName, item = __rest(_a, ["componentName"]);
    delete item.children;
    delete item.path;
    // shared components may come through here and use the 'componentName' spec instead of 'template' - this allows that
    if (componentName) {
        item.template = componentName;
    }
    var template = utils_1.findTemplate(item.template, args.components, args.templates);
    if (!template && item.template !== 'Folder') {
        // tslint:disable-next-line:max-line-length
        console.warn(chalk_1.default.yellow("Template " + item.template + " used on " + item.name + " was not defined in the manifest. If this is not a known Sitecore template or GUID the import will fail."));
    }
    if (args.content.fields) {
        var renderingFields = args.content.fields;
        if (template) {
            // tslint:disable-next-line:max-line-length
            var handleError = function (fieldName) { throw chalk_1.default.red("Item '" + item.name + "' defined data for field '" + fieldName + "'. This field is not defined on '" + template.name + "'. It may be a typo, or the field may need to be added to the template/component definition."); };
            renderingFields = utils_1.validateFieldDefinitions(args.content.fields, template, handleError, args.templates, args.components);
        }
        item.fields = utils_1.convertComponentDataToFields({ data: renderingFields, context: { item: item } });
    }
    return __assign(__assign({}, args), { item: item });
});
