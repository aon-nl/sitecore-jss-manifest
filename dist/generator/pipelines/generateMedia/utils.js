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
exports.enhanceTemplates = function (templates) {
    var newTemplates = __spreadArrays(templates);
    newTemplates.getTemplate = function getTemplate(templateName) {
        var foundTemplate = this.find(function (template) { return template.name === templateName; });
        if (foundTemplate) {
            foundTemplate.allFields = getAllTemplateFields(foundTemplate, templates);
        }
        return foundTemplate;
    };
    return newTemplates;
};
// NOTE: this function does not attempt to do anything about field names
// that might be duplicated in the template inheritance tree. That said, for
// the purposes of extracting media field values, we don't need to be concerned
// about duplicates or naming collisions. We simply need a field type and
// a field value.
function getAllTemplateFields(template, templateCollection) {
    if (!template) {
        return null;
    }
    // If the template already has an `allFields` property, assume that
    // its inheritance tree has already been resolved.
    if (template.allFields && Array.isArray(template.allFields)) {
        return template.allFields;
    }
    var allFields = [];
    // If the template has its own fields, add them to the `allFields` array.
    if (template.fields && Array.isArray(template.fields)) {
        allFields.push.apply(allFields, template.fields);
    }
    // Recursively add fields from all inherited templates and any ancestors.
    if (template.inherits && Array.isArray(template.inherits)) {
        template.inherits.forEach(function (inheritedTemplateName) {
            var inheritedTemplate = templateCollection.find(function (t) { return t.name === inheritedTemplateName; });
            if (!inheritedTemplate || !inheritedTemplate.fields || !Array.isArray(inheritedTemplate.fields)) {
                return;
            }
            var inheritedFields = getAllTemplateFields(inheritedTemplate, templateCollection);
            if (inheritedFields) {
                allFields.push.apply(allFields, inheritedFields);
            }
        });
    }
    return allFields;
}
function getMediaFieldValue(field) {
    return field.value;
}
function getNestedFieldValue(field, templates) {
    // If there is only one item
    if (!Array.isArray(field.value)) {
        return buildMediaOutput(field.value, templates);
    }
    return field.value.reduce(function (result, item) {
        // eslint-disable-next-line no-use-before-define
        var media = buildMediaOutput(item, templates);
        return __spreadArrays(result, media);
    }, []);
}
function getFieldValues(_a) {
    var field = _a.field, templates = _a.templates;
    switch (field.type) {
        case 'Image':
            return [getMediaFieldValue(field)];
        case 'File':
            return [getMediaFieldValue(field)];
        case 'Droptree':
        case 'Multilist':
        case 'Treelist':
            return getNestedFieldValue(field, templates);
        default:
            return null;
    }
}
function buildMediaOutput(item, templates) {
    var template = templates.getTemplate(item.template);
    if (!template) {
        return [];
    }
    if (!item || !item.fields) {
        return [];
    }
    var fields = item.fields.reduce(function (result, field) {
        if (!template.allFields) {
            return [];
        }
        var templateField = template.allFields.find(function (f) { return f.name === field.name; });
        if (templateField) {
            return __spreadArrays(result, [__assign(__assign({}, field), { type: templateField.type })]);
        }
        return result;
    }, []);
    var fieldValues = fields.reduce(function (result, field) {
        var values = getFieldValues({ field: field, templates: templates });
        if (values) {
            return __spreadArrays(result, values);
        }
        return result;
    }, []);
    return fieldValues;
}
exports.buildMediaOutput = buildMediaOutput;
