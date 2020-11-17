"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var sitecore_pipelines_1 = require("@sitecore-jss/sitecore-pipelines");
var path = __importStar(require("path"));
// __dirname returns the directory of this file/module, so it has to be called here
var resolveModulePath = function (modulePath) { return path.resolve(__dirname, modulePath); };
exports.config = function (pipelines) {
    var pipeline = sitecore_pipelines_1.pipelineFactory.create('generateContentItem');
    pipeline.addProcessor({
        name: 'generateItem',
        modulePath: resolveModulePath('./generateItem.js'),
    });
    pipeline.addProcessor({
        name: 'processNestedContent',
        modulePath: resolveModulePath('./processNestedContent.js'),
    });
    pipelines.addPipeline(pipeline);
};
