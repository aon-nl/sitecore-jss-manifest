"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var traversal_1 = require("../../traversal");
// Fixes up rendering/datasource hierarchy so that the item ID and copy is set on the datasource item
// Done after ID resolution so we can fix up the rendering parent correctly when resolving ID references
/* eslint-disable no-param-reassign */
exports.default = (function (args) {
    var manifest = args.pipelineResult;
    traversal_1.traverseAllRenderings(manifest.items.routes, function (rendering) {
        // ensure that any reference ID and copy attributes make it to the dataSource
        if (rendering.resolvedFromItemId) {
            rendering.dataSource.resolvedFromItemId = rendering.resolvedFromItemId;
            delete rendering.resolvedFromItemId;
        }
        if (rendering.copy) {
            rendering.dataSource.copy = rendering.copy;
            delete rendering.copy;
        }
        // if the rendering has a defined ID, push it down to the datasource item
        if (rendering.id) {
            rendering.dataSource.id = rendering.id;
            delete rendering.id;
        }
    });
    return args;
});
