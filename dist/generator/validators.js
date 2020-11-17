"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi = __importStar(require("joi"));
var fieldSchema = joi.object().keys({
    name: joi.string().required(),
    displayName: joi.string(),
    type: joi.string().required(),
});
var templateSchema = joi.object().keys({
    name: joi.string().required(),
    displayName: joi.string(),
    fields: joi.array().items(fieldSchema),
});
var placeholderSchema = joi.object().keys({
    name: joi.string().required(),
    displayName: joi.string(),
});
var validate = function (object, schema, allowUnknown) {
    var error = joi.validate(object, schema, { allowUnknown: allowUnknown }).error;
    if (!error) {
        return { valid: true };
    }
    console.error(error);
    return { valid: false, error: error };
};
exports.validateTemplate = function (template) { return validate(template, templateSchema, true); };
exports.validatePlaceholder = function (placeholder) { return validate(placeholder, placeholderSchema, true); };
