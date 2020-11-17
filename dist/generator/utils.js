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
/**
 * Iterates the keys of the given object and constructs a new object with keys that satisfy the given filter function.
 */
exports.filterObject = function (obj, filter) {
    return Object.keys(obj).reduce(function (res, key) {
        var _a;
        if (filter(key, obj[key])) {
            return __assign(__assign({}, res), (_a = {}, _a[key] = obj[key], _a));
        }
        return res;
    }, {});
};
exports.convertComponentDataToFields = function (_a) {
    var data = _a.data, _b = _a.context, _c = (_b === void 0 ? {} : _b).item, item = _c === void 0 ? {} : _c;
    if (!data) {
        return;
    }
    var initialReduceValue = [];
    return Object.keys(data).reduce(function (result, fieldName) {
        var fieldValue = processFieldValue({
            fieldValue: data[fieldName],
            context: { fieldName: fieldName, item: item },
        });
        if (fieldValue !== null) {
            result.push({ name: fieldName, value: fieldValue });
        }
        else {
            console.warn("Skipping field '" + fieldName + "' on " + item.name + " does not contain a value that can be imported: " + JSON.stringify(data[fieldName]));
        }
        return result;
    }, initialReduceValue);
};
var mapFieldValueItem = function (item, fieldValueItem, index, fieldName) {
    // if a field references a shared item by ID, we don't want to auto-name/template it
    if (fieldValueItem.id && !fieldValueItem.name) {
        return fieldValueItem;
    }
    var fieldItem = {
        template: item.template + "-" + fieldName + "-Item",
        name: item.name + "-item-" + index,
    };
    if (fieldValueItem.template) {
        fieldItem.template = fieldValueItem.template;
    }
    if (fieldValueItem.name) {
        fieldItem.name = fieldValueItem.name;
    }
    if (fieldValueItem.displayName) {
        fieldItem.displayName = fieldValueItem.displayName;
    }
    else {
        fieldItem.displayName = item.displayName + "-item-" + index;
    }
    fieldItem.fields = exports.convertComponentDataToFields({
        data: fieldValueItem.fields,
        context: { item: fieldItem },
    });
    return fieldItem;
};
var processFieldValue = function (_a) {
    var fieldValue = _a.fieldValue, _b = _a.context, fieldName = _b.fieldName, item = _b.item;
    if (fieldValue === null) {
        return fieldValue;
    }
    // if the 'value' is an array, create value as an array of items
    if (Array.isArray(fieldValue)) {
        var fieldValueItems = fieldValue;
        return fieldValueItems.map(function (fieldValueItem, index) {
            return mapFieldValueItem(item, fieldValueItem, index, fieldName);
        });
    }
    // simple value, return as-is
    if (typeof fieldValue !== 'object') {
        return fieldValue;
    }
    // value/editable shape
    if (typeof fieldValue.value !== 'undefined') {
        // we fallback to '' so that defining an empty field value results in the empty value
        // being imported, as opposed to being null and triggering 'not an importable value'
        return fieldValue.value || '';
    }
    // link or image field value at the root shape, or a shared item link reference (non-array of items)
    if (fieldValue.href || fieldValue.src || fieldValue.id) {
        return fieldValue;
    }
    // it's an item
    if (fieldValue.fields) {
        return mapFieldValueItem(item, fieldValue, 0, fieldName);
    }
    return null;
};
// checks if an array contains duplicate values using a selector function to get the value to check for uniqueness
// returns array of duplicate keys - or empty array if no dupes
function checkUnique(input, selector) {
    var uniques = new Set();
    var duplicates = [];
    input.forEach(function (element) {
        var key = selector(element);
        if (typeof key === 'undefined') {
            return;
        }
        if (uniques.has(key)) {
            duplicates.push(key);
        }
        else {
            uniques.add(key);
        }
    });
    return duplicates;
}
exports.checkUnique = checkUnique;
/** Finds a template definition by name in one or more arrays of template/component definitions */
function findTemplate(templateName) {
    var templates = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        templates[_i - 1] = arguments[_i];
    }
    var templateResult = null;
    if (!templates) {
        return null;
    }
    templates.forEach(function (templateList) {
        if (!templateList) {
            return;
        }
        var template = templateList.find(function (templateDef) { return templateDef.name === templateName; });
        if (template && templateResult != null) {
            // tslint:disable-next-line:no-string-throw
            throw "Template " + templateName + " was defined more than once with the same name.";
        }
        if (template) {
            templateResult = template;
        }
    });
    return templateResult;
}
exports.findTemplate = findTemplate;
/** Validates that a set of field values are defined on their template definitions */
function validateFieldDefinitions(fields, template, handleError) {
    var inheritedTemplates = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        inheritedTemplates[_i - 3] = arguments[_i];
    }
    inheritedTemplates.forEach(function () { });
    return exports.filterObject(fields, function (fieldName) {
        // we don't have a good way to look up all inherited fields here - so if the rendering inherits a template
        // we disable field filtering so as to allow inherited fields to be defined.
        if (template.inherits) {
            // in future `inheritedTemplates` may be trawled to find inherited values and validate them too
            return true;
        }
        var fieldIsValid = Array.isArray(template.fields) && template.fields.some(function (field) { return field.name === fieldName; });
        if (!fieldIsValid) {
            // tslint:disable-next-line:no-string-throw max-line-length
            handleError(fieldName);
        }
        return fieldIsValid;
    });
}
exports.validateFieldDefinitions = validateFieldDefinitions;
