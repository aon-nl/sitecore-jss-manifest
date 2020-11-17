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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../utils");
var validators_1 = require("../../validators");
exports.default = (function (args) {
    var components = args.components;
    var templates = components.reduce(function (result, component) {
        // throw if you defined a single ID for a component (which since it splits into a template + rendering, needs two explicit IDs set)
        if (component.id) {
            // tslint:disable-next-line:no-string-throw max-line-length
            throw "The component " + component.name + " defined an 'id'. Because a component becomes two separate items in Sitecore, it must have two separate IDs. Please specify unique 'templateId' and 'renderingId' properties instead.";
        }
        // don't generate template for component without fields that inherits nothing
        if (!component.fields && !component.inherits) {
            return result;
        }
        var templateId = component.templateId, template = __rest(component, ["templateId"]);
        if (templateId) {
            template.id = templateId;
        }
        delete template.renderingId;
        delete template.params;
        delete template.fieldEditorFields;
        delete template.displayFieldEditorButton;
        delete template.placeholders;
        delete template.allowedPlaceholders;
        delete template.graphQLQuery;
        delete template.customExperienceButtons;
        var validationResult = validators_1.validateTemplate(template);
        if (validationResult.valid) {
            return __spreadArrays(result, [template]);
        }
        throw validationResult.error;
    }, []);
    var finalTemplates = __spreadArrays(args.templates, templates);
    var duplicateIds = utils_1.checkUnique(finalTemplates, function (template) { return template.id; });
    if (duplicateIds.length > 0) {
        // tslint:disable-next-line:no-string-throw
        throw "The manifest defined duplicate template IDs: " + duplicateIds.join(',') + ". This is not allowed.";
    }
    var duplicateNames = utils_1.checkUnique(finalTemplates, function (template) { return template.name; });
    if (duplicateNames.length > 0) {
        // tslint:disable-next-line:no-string-throw
        throw "The manifest defined duplicate template names: " + duplicateNames.join(',') + ". This is not allowed.";
    }
    return __assign(__assign({}, args), { pipelineResult: __assign(__assign({}, args.pipelineResult), { templates: finalTemplates }) });
});
