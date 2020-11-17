"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var traversal_1 = require("../../traversal");
// expands link fields with 'jss://other-item-id' link values into links to those other items
exports.default = (function (args) {
    var manifest = args.pipelineResult;
    var handleField = function (field) {
        if (field.value && field.value.href && field.value.href.startsWith('jss://')) {
            var id_1 = field.value.href.substring(6);
            var path_1 = '';
            traversal_1.traverseItems(manifest.items.routes, function (item, currentPath) {
                if (!item.id || item.id !== id_1) {
                    return;
                }
                path_1 = currentPath;
            });
            if (!path_1) {
                throw new Error("The link " + field.value.href + " pointed to a nonexistant route ID.");
            }
            // the path value is a root relative including the root, e.g. home/foo
            // for a link, we want the route path which would not include the 'home' piece so we strip it
            // for a root link, there's no / so we just sub that in
            // eslint-disable-next-line no-param-reassign
            field.value.href = path_1.indexOf('/') >= 0 ? path_1.substring(path_1.indexOf('/')) : '/';
        }
    };
    traversal_1.traverseAllFields(manifest.items.routes, handleField);
    traversal_1.traverseAllFields(manifest.items.nonRoutes, handleField);
    return args;
});
