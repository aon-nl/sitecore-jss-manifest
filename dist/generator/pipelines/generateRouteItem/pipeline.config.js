"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sitecore_pipelines_1 = require("@sitecore-jss/sitecore-pipelines");
var path = __importStar(require("path"));
var dynamicPlaceholders_1 = require("../../dynamicPlaceholders");
var processRenderings_1 = __importDefault(require("./processRenderings"));
// __dirname returns the directory of this file/module, so it has to be called here
var resolveModulePath = function (modulePath) { return path.resolve(__dirname, modulePath); };
var defaultDatasourceNamer = function (_a) {
    var item = _a.item, placeholder = _a.placeholder, rendering = _a.rendering, index = _a.index;
    var placeholderKeys = placeholder.phKey.split('/');
    var finalPlaceholderKey;
    if (placeholderKeys.length === 1) {
        // single named placeholder e.g. /main
        finalPlaceholderKey = placeholderKeys[0];
    }
    else {
        // dynamic placeholder. We want to extract the final DP key as it should be unique among all DPs.
        // e.g. '/main/footer-bottom-{B4C653AA-FFBC-5821-A8A8-386E791553FE}-0' => 'footer-bottom-B4C653AA-FFBC-5821-A8A8-386E791553FE-0'
        finalPlaceholderKey = placeholderKeys[placeholderKeys.length - 1];
        // get rid of braces
        finalPlaceholderKey = finalPlaceholderKey.replace(/({|})/g, '');
    }
    return item.name + "-" + finalPlaceholderKey + "-" + rendering.componentName + "-" + (index + 1);
};
var defaultDatasourceDisplayNamer = function (_a) {
    var rendering = _a.rendering, index = _a.index;
    return rendering.componentName + "-" + (index + 1);
};
var defaultComponentFactory = function (components, componentName) {
    return components.find(function (component) { return component.name === componentName; });
};
exports.config = function (pipelines) {
    var pipeline = sitecore_pipelines_1.pipelineFactory.create('generateRouteItem');
    pipeline.addProcessor({
        name: 'generateItem',
        modulePath: resolveModulePath('./generateItem.js'),
    });
    pipeline.addProcessor({
        name: 'processPlaceholders',
        modulePath: resolveModulePath('./processPlaceholders.js'),
    });
    pipeline.addProcessor({
        name: 'processRenderings',
        process: processRenderings_1.default,
        args: {
            dynamicPlaceholderKeyGenerator: dynamicPlaceholders_1.getDynamicPlaceholderKey,
            placeholder: {
                phKey: '/',
            },
            rendering: {},
            componentFactory: defaultComponentFactory,
            datasourceNamer: defaultDatasourceNamer,
            datasourceDisplayNamer: defaultDatasourceDisplayNamer,
        },
    });
    pipeline.addProcessor({
        name: 'processChildRoutes',
        modulePath: resolveModulePath('./processChildRoutes.js'),
    });
    pipelines.addPipeline(pipeline);
};
