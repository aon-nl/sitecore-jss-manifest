"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sitecore_pipelines_1 = require("@sitecore-jss/sitecore-pipelines");
exports.config = function (pipelines) {
    var pipeline = sitecore_pipelines_1.pipelineFactory.create('generateMedia');
    pipeline.addProcessor({
        name: 'processRouteItems',
        modulePath: {
            workingDirectory: __dirname,
            filePath: './processRouteItems.js',
        },
    });
    pipeline.addProcessor({
        name: 'processContentItems',
        modulePath: {
            workingDirectory: __dirname,
            filePath: './processContentItems.js',
        },
    });
    pipelines.addPipeline(pipeline);
};
