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
var manifest_types_1 = require("../../manifest.types");
var utils_1 = require("../../utils");
var getExposedPlaceholders = function (component) {
    if (!Array.isArray(component.placeholders)) {
        return [];
    }
    return component.placeholders.map(function (placeholder) {
        if (typeof placeholder === 'string') {
            return placeholder;
        }
        return placeholder.name;
    });
};
var getDataSourceTemplate = function (component, templates) {
    if (Array.isArray(templates)) {
        return templates.reduce(function (result, template) { return (template.name === component.name ? template.name : result); }, '');
    }
    return '';
};
var generateRenderings = function (_a) {
    var components = _a.components, templates = _a.templates;
    return components.map(function (component) {
        var renderingId = component.renderingId, rendering = __rest(component, ["renderingId"]);
        if (renderingId) {
            rendering.id = renderingId;
        }
        delete rendering.templateId;
        delete rendering.fields;
        delete rendering.placeholders;
        delete rendering.inherits;
        delete rendering.insertOptions;
        rendering.exposedPlaceholders = getExposedPlaceholders(component);
        rendering.dataSourceTemplate = getDataSourceTemplate(component, templates);
        // params can be an array of strings or of RenderingParameterDefinition-s
        // we normalize that into an object format for the manifest for easier ingestion
        if (rendering.params) {
            if (!Array.isArray(rendering.params)) {
                // tslint:disable-next-line:no-string-throw
                throw "The params property on the component definition for " + rendering.name + " is invalid (not an array)";
            }
            rendering.params = rendering.params.map(function (param) {
                if (typeof param === 'string') {
                    return { name: param, type: manifest_types_1.CommonFieldTypes.SingleLineText };
                }
                return param;
            });
        }
        return rendering;
    });
};
exports.default = (function (args) {
    var components = args.components;
    var renderings = generateRenderings({ components: components, templates: args.pipelineResult.templates });
    var finalRenderings = __spreadArrays(args.pipelineResult.renderings, renderings);
    var duplicateIds = utils_1.checkUnique(finalRenderings, function (rendering) { return rendering.id; });
    if (duplicateIds.length > 0) {
        // tslint:disable-next-line:no-string-throw
        throw "The manifest defined duplicate rendering IDs: " + duplicateIds.join(',') + ". This is not allowed.";
    }
    var duplicateNames = utils_1.checkUnique(finalRenderings, function (rendering) { return rendering.name; });
    if (duplicateNames.length > 0) {
        // tslint:disable-next-line:no-string-throw
        throw "The manifest defined duplicate rendering names: " + duplicateNames.join(',') + ". This is not allowed.";
    }
    return __assign(__assign({}, args), { pipelineResult: __assign(__assign({}, args.pipelineResult), { renderings: finalRenderings }) });
});
