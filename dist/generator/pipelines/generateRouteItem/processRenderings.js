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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var v5_1 = __importDefault(require("uuid/v5"));
var manifest_types_1 = require("../../manifest.types");
var utils_1 = require("../../utils");
var JSS_UUID_NAMESPACE = '0e52892a-f862-4d08-9487-987617b637cd';
var generateRenderingParams = function (component, rendering) {
    var _a;
    if (!rendering.params) {
        return [];
    }
    var reducedParams = Object.keys(rendering.params).reduce(function (result, paramName) {
        return __spreadArrays(result, [
            {
                name: paramName,
                value: rendering.params[paramName],
            },
        ]);
    }, []);
    if (!Array.isArray((_a = component) === null || _a === void 0 ? void 0 : _a.params)) {
        // tslint:disable-next-line:max-line-length no-string-throw
        console.warn(chalk_1.default.red("An instance of " + component.name + " defined param(s) '" + reducedParams.map(function (rp) { return rp.name; }).join(', ') + "', but the component definition did not define any params. Define them on the manifest component definition to use them. Instance definition: " + JSON.stringify(rendering, null, 2)));
    }
    // find params that are not defined in manifest
    // tslint:disable-next-line:max-line-length
    var invalidParams = reducedParams.filter(function (param) { return !component.params.some(function (componentParam) { return (componentParam.name ? componentParam.name : componentParam) === param.name; }); });
    if (invalidParams.length > 0) {
        var validParams = component.params.map(function (cp) { return (cp.name ? cp.name : cp); }).join(',');
        var invalidParamsString = invalidParams.map(function (ip) { return ip.name; }).join(', ');
        // tslint:disable-next-line:max-line-length no-string-throw
        console.warn(chalk_1.default.red("Param(s) " + invalidParamsString + " defined on an instance of component " + component.name + " was not defined on the component definition. Add it to the manifest component definition to use it. Valid params: " + validParams + ". Instance definition: " + JSON.stringify(rendering, null, 2)));
    }
    return reducedParams;
};
var generateFields = function (component, rendering, dataSourceItem, allComponents) {
    if (!rendering.fields) {
        return [];
    }
    var renderingFields = rendering.fields;
    if (component) {
        // tslint:disable-next-line:max-line-length
        var handleError = function (fieldName) { console.warn(chalk_1.default.red(dataSourceItem.name + " route datasource defined data for '" + fieldName + "' on component " + component.name + ". This field is not defined on this component. It may be a typo, or the field may need to be added to the component definition.")); };
        renderingFields = utils_1.validateFieldDefinitions(rendering.fields, component, handleError, allComponents);
    }
    return utils_1.convertComponentDataToFields({ data: renderingFields, context: { item: dataSourceItem } });
};
var generateChildrenFields = function (children) {
    var result = children.slice(0);
    result.forEach(function (child) {
        if (!manifest_types_1.isItemDefinition(child)) {
            return;
        }
        if (child.fields) {
            child.fields = utils_1.convertComponentDataToFields({ data: child.fields, context: { item: child } });
        }
        if (child.children) {
            child.children = generateChildrenFields(child.children);
        }
    });
    return result;
};
var createDataSourceItem = function (_a) {
    var rendering = _a.rendering, datasourceNamer = _a.datasourceNamer, datasourceDisplayNamer = _a.datasourceDisplayNamer, context = __rest(_a, ["rendering", "datasourceNamer", "datasourceDisplayNamer"]);
    // rendering is an ID reference, not a whole rendering, so this will come from elsewhere
    // UNLESS it's a copy - in which case we still want it to get named as a local DS item
    if (!rendering.componentName && rendering.id && !rendering.copy) {
        return {};
    }
    var namerContext = __assign({ rendering: rendering }, context);
    var name = rendering.name ? rendering.name : datasourceNamer(namerContext);
    var displayName = rendering.displayName;
    if (!displayName) {
        displayName = rendering.name ? null : datasourceDisplayNamer(namerContext); // don't set anything if name provided w/ out displayName
    }
    var result = __assign({ name: name,
        displayName: displayName, template: rendering.componentName }, rendering);
    if (result.children) {
        result.children = generateChildrenFields(result.children);
    }
    delete result.fields;
    delete result.id;
    delete result.placeholders;
    delete result.uid;
    delete result.componentName;
    delete result.params;
    return result;
};
var generatePlaceholderKey = function (dynamicPlaceholderKeyGenerator, placeholder, rendering) {
    var phKey = dynamicPlaceholderKeyGenerator(placeholder.phKey, rendering, placeholder.phName);
    return phKey;
};
var generateRenderingUid = function (renderingName, renderingIndex, parentPlaceholderKey) {
    // 1. We calculate the deterministic namespace UUID for the parent placeholder
    var parentNamespace = v5_1.default(renderingName + parentPlaceholderKey, JSS_UUID_NAMESPACE);
    // 2. Using the parent UUID, we create a deterministic UUID for the rendering using its index in the placeholder
    var renderingUid = v5_1.default(renderingIndex.toString(), parentNamespace);
    // make the UID look Sitecore-ish
    return "{" + renderingUid.toUpperCase() + "}";
};
var processRendering = function (rendering, index, context) {
    var newContext = __assign(__assign({}, context), { rendering: rendering, index: index });
    var dsItem = createDataSourceItem(newContext);
    var component = context.componentFactory(context.components, rendering.componentName);
    // check for component def, as long as the component isn't an id-only ref
    // (defines id but not name)
    if (!component && rendering.componentName) {
        // tslint:disable-next-line:max-line-length
        console.warn(chalk_1.default.red("The component '" + rendering.componentName + "' used on route '" + context.route.name + "' was not defined in the manifest. Please define this component with 'manifest.addComponent()', or change the name to an existing component name."));
    }
    var renderingParams = generateRenderingParams(component, rendering);
    var fields = generateFields(component, rendering, dsItem, context.components);
    dsItem.fields = fields;
    var layoutRendering = {
        renderingName: rendering.componentName,
        placeholderKey: context.placeholder.phKey,
        placeholderName: context.placeholder.phName,
        dataSource: dsItem,
        renderingParams: renderingParams,
    };
    if (rendering.id) {
        layoutRendering.id = rendering.id;
    }
    if (rendering.copy) {
        layoutRendering.copy = rendering.copy;
    }
    if (rendering.uid) {
        layoutRendering.uid = rendering.uid;
    }
    else {
        // assign a rendering instance uid for placeholder keys further down the tree
        layoutRendering.uid = generateRenderingUid(dsItem.name ? dsItem.name : layoutRendering.renderingName, index, context.placeholder.phKey);
        newContext.rendering.uid = layoutRendering.uid;
    }
    if (context.onRenderingProcessed) {
        context.onRenderingProcessed(layoutRendering);
    }
    if (rendering.placeholders) {
        processPlaceholders(newContext, rendering.placeholders);
    }
};
var processPlaceholders = function (context, placeholders) {
    if (!placeholders) {
        return;
    }
    Object.keys(placeholders).forEach(function (phName) {
        var phKey = generatePlaceholderKey(context.dynamicPlaceholderKeyGenerator, __assign(__assign({}, context.placeholder), { phName: phName }), context.rendering);
        var placeholder = {
            renderings: placeholders[phName],
            phName: phName,
            phKey: phKey,
        };
        placeholder.renderings.forEach(function (rendering, index) {
            processRendering(rendering, index, __assign(__assign({}, context), { placeholder: placeholder }));
        });
    });
};
exports.default = (function (args) {
    if (!args.route) {
        return args;
    }
    var placeholders = args.route.placeholders;
    var renderings = [];
    var onRenderingProcessed = function (rendering) {
        renderings.push(rendering);
    };
    var context = __assign(__assign({}, args), { onRenderingProcessed: onRenderingProcessed });
    processPlaceholders(context, placeholders);
    // error if renderings don't have unique names
    var datasourceNames = renderings
        .map(function (rendering) { return rendering.dataSource && rendering.dataSource.name; })
        .filter(function (x) { return x; });
    var duplicateDatasourceNames = new Set(datasourceNames.filter(function (v, i) { return datasourceNames.indexOf(v) !== i; })); // https://stackoverflow.com/a/47298567/201808
    if (duplicateDatasourceNames.size > 0) {
        var dupes = JSON.stringify(Array.from(duplicateDatasourceNames));
        // tslint:disable-next-line:max-line-length
        throw chalk_1.default.red("Route \"" + args.item.name + "\" has rendering(s) with identical names: " + dupes + ". Please assign unique rendering names using the 'name' property.");
    }
    return __assign(__assign({}, args), { item: __assign(__assign({}, args.item), { layout: __assign(__assign({}, args.item.layout), { renderings: renderings }) }) });
});
