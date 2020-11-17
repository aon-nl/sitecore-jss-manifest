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
    var pipeline = sitecore_pipelines_1.pipelineFactory.create('generateManifest');
    pipeline.addProcessor({
        name: 'generateTemplates',
        modulePath: resolveModulePath('./generateTemplates.js'),
    });
    pipeline.addProcessor({
        name: 'generateRouteItems',
        modulePath: resolveModulePath('./generateRouteItems.js'),
    });
    pipeline.addProcessor({
        name: 'generateContentItems',
        modulePath: resolveModulePath('./generateContentItems.js'),
    });
    pipeline.addProcessor({
        name: 'generateDictionary',
        modulePath: resolveModulePath('./generateDictionary.js'),
    });
    pipeline.addProcessor({
        name: 'generateRenderings',
        modulePath: resolveModulePath('./generateRenderings.js'),
    });
    pipeline.addProcessor({
        name: 'generatePlaceholders',
        modulePath: resolveModulePath('./generatePlaceholders.js'),
    });
    pipeline.addProcessor({
        name: 'generateMedia',
        modulePath: resolveModulePath('./generateMedia.js'),
    });
    pipeline.addProcessor({
        name: 'expandReferencedContent',
        modulePath: resolveModulePath('./expandReferencedContent.js'),
    });
    pipeline.addProcessor({
        name: 'expandIdLinks',
        modulePath: resolveModulePath('./expandIdLinks.js'),
    });
    pipeline.addProcessor({
        name: 'cleanupRenderingDatasources',
        modulePath: resolveModulePath('./cleanupRenderingDatasources.js'),
    });
    pipelines.addPipeline(pipeline);
};
