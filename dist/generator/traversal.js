"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// traverses a tree of items on the manifest
// does NOT traverse non-root items (e.g. datasource items, treelist items)
// only root items. `items` is the root of the tree, eg routes or nonRoutes
// callback gets two parameters:
// 1) the item
// 2) the path to the item from the root (including the root name e.g. home/foo; routing would normally have /foo for that)
exports.traverseItems = function (items, callback) {
    if (!items) {
        return;
    }
    var traverseInternal = function (itemArray, paths) {
        itemArray.forEach(function (item) {
            callback(item, "" + paths.join('/') + (paths.length === 0 ? '' : '/') + item.name);
            if (item.children && item.children.length > 0) {
                var newPath = __spreadArrays(paths, [item.name]);
                traverseInternal(item.children, newPath);
            }
        });
    };
    traverseInternal(items, []);
};
// traverses a tree of items on the manifest
// includes traversal of non-root items (e.g. datasource items, treelist items)
// `items` is the root of the tree, eg routes or nonRoutes
// the callback gets two arguments: the item definition, and the item type
// ('item', 'rendering', or 'datasource')
function traverseAllItems(items, callback) {
    if (!items || !items.forEach) {
        return;
    }
    function processSingleItem(item, type) {
        callback(item, type);
        // look over the item's children, if any
        if (item.children && item.children.length > 0) {
            traverseAllItems(item.children, callback);
        }
        // look over items defined in the item's fields
        // (e.g. datasource items)
        if (item.fields) {
            Object.keys(item.fields).forEach(function (fieldName) {
                var currentField = item.fields[fieldName];
                var processCandidateFieldValue = function (value) {
                    if (value.template || value.id) {
                        processSingleItem(value, 'item');
                    }
                };
                // datasource item
                processCandidateFieldValue(currentField);
                // items defined as part of a treelist/multilist field
                if (Array.isArray(currentField.value)) {
                    currentField.value.forEach(processCandidateFieldValue);
                }
                // individual item reference (i.e. droplink, droptree)
                // checking for resolvedFromItemId in case referenced objects were not fully built the first run through
                if (currentField.value && (currentField.value.id || currentField.value.resolvedFromItemId)) {
                    processCandidateFieldValue(currentField.value);
                }
            });
        }
        // traverse the item's layout/renderings for item definitions
        if (item.layout && item.layout.renderings) {
            item.layout.renderings.forEach(function (rendering) {
                if (!rendering.dataSource) {
                    return;
                }
                processSingleItem(rendering.dataSource, 'datasource');
            });
        }
    }
    items.forEach(function (item) { return processSingleItem(item, 'item'); });
}
exports.traverseAllItems = traverseAllItems;
// traverses every field value in an item array, including all children, datasource items, etc
function traverseAllFields(items, callback) {
    traverseAllItems(items, function (item) {
        if (!item.fields || !Array.isArray(item.fields)) {
            return;
        }
        item.fields.forEach(callback);
    });
}
exports.traverseAllFields = traverseAllFields;
// traverses all rendering instance definitions in an item tree
function traverseAllRenderings(items, callback) {
    traverseAllItems(items, function (item, type) {
        if (type !== 'item' || !item.layout || !item.layout.renderings) {
            return;
        }
        item.layout.renderings.forEach(function (rendering) {
            callback(rendering, item);
        });
    });
}
exports.traverseAllRenderings = traverseAllRenderings;
