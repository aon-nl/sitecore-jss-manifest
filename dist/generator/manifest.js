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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sitecore_pipelines_1 = require("@sitecore-jss/sitecore-pipelines");
var fieldTypes_1 = __importDefault(require("./fieldTypes"));
var validators_1 = require("./validators");
exports.createManifestInstance = function (_a) {
    var pipelines = _a.pipelines, _b = _a.appName, appName = _b === void 0 ? '' : _b, _c = _a.excludeItems, excludeItems = _c === void 0 ? false : _c, _d = _a.excludeDictionary, excludeDictionary = _d === void 0 ? false : _d, _e = _a.language, language = _e === void 0 ? '' : _e, _f = _a.debug, debug = _f === void 0 ? false : _f, _g = _a.wipe, wipe = _g === void 0 ? false : _g, rootPlaceholders = _a.rootPlaceholders, skipPlaceholderBlacklist = _a.skipPlaceholderBlacklist;
    var manifestSourceData = {
        appName: appName,
        components: new Array(),
        templates: new Array(),
        placeholders: new Array(),
        routes: new Array(),
        content: new Array(),
        dictionary: new Array(),
        language: language,
        wipe: wipe,
        rootPlaceholders: rootPlaceholders,
        skipPlaceholderBlacklist: skipPlaceholderBlacklist,
    };
    var addComponent = function () {
        var _a;
        var components = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            components[_i] = arguments[_i];
        }
        (_a = manifestSourceData.components).push.apply(_a, components);
    };
    var addRoute = function () {
        var _a;
        var routes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            routes[_i] = arguments[_i];
        }
        (_a = manifestSourceData.routes).push.apply(_a, routes);
    };
    var addContent = function () {
        var _a;
        var contents = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            contents[_i] = arguments[_i];
        }
        (_a = manifestSourceData.content).push.apply(_a, contents);
    };
    var addTemplateInternal = function () {
        var templates = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            templates[_i] = arguments[_i];
        }
        templates.forEach(function (template) {
            var validationResult = validators_1.validateTemplate(template);
            if (validationResult.valid) {
                manifestSourceData.templates.push(template);
            }
            else {
                throw validationResult.error;
            }
        });
    };
    var addTemplate = function () {
        var templates = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            templates[_i] = arguments[_i];
        }
        templates.forEach(function (template) {
            var internalTemplate = template;
            internalTemplate.route = false;
            internalTemplate.defaultRoute = false;
            addTemplateInternal(internalTemplate);
        });
    };
    var addPlaceholder = function () {
        var placeholders = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            placeholders[_i] = arguments[_i];
        }
        placeholders.forEach(function (placeholder) {
            if (validators_1.validatePlaceholder(placeholder).valid) {
                manifestSourceData.placeholders.push(placeholder);
            }
        });
    };
    var addRouteType = function () {
        var routeTypes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            routeTypes[_i] = arguments[_i];
        }
        routeTypes.forEach(function (template) {
            var internalTemplate = template;
            internalTemplate.route = true;
            internalTemplate.defaultRoute = false;
            addTemplateInternal(internalTemplate);
        });
    };
    var setDefaultRouteType = function (defaultRouteType) {
        var internalTemplate = defaultRouteType;
        internalTemplate.route = false;
        internalTemplate.defaultRoute = true;
        addTemplateInternal(internalTemplate);
    };
    var addDictionary = function () {
        var _a;
        var entries = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            entries[_i] = arguments[_i];
        }
        manifestSourceData.dictionary = (_a = manifestSourceData.dictionary).concat.apply(_a, entries);
    };
    var getManifest = function () { return __awaiter(void 0, void 0, void 0, function () {
        var pipelineArgs, pipeline, result, _a, items, dictionary, output;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    pipelineArgs = {
                        debug: debug,
                        skipPlaceholderBlacklist: manifestSourceData.skipPlaceholderBlacklist,
                        components: manifestSourceData.components,
                        routes: manifestSourceData.routes,
                        content: manifestSourceData.content,
                        dictionary: manifestSourceData.dictionary,
                        templates: manifestSourceData.templates,
                        placeholders: manifestSourceData.placeholders,
                        appName: manifestSourceData.appName,
                        language: manifestSourceData.language,
                        pipelines: pipelines,
                        pipelineResult: {
                            templates: new Array(),
                            items: {
                                routes: new Array(),
                                nonRoutes: new Array(),
                            },
                            placeholders: new Array(),
                            dictionary: new Array(),
                            media: new Array(),
                            appName: manifestSourceData.appName,
                            language: manifestSourceData.language,
                            renderings: new Array(),
                            wipeExisting: manifestSourceData.wipe,
                            rootPlaceholders: manifestSourceData.rootPlaceholders,
                        },
                    };
                    pipeline = __assign({}, pipelines.generateManifest);
                    pipeline.args = __assign(__assign({}, pipeline.args), pipelineArgs);
                    return [4 /*yield*/, sitecore_pipelines_1.runPipeline(pipeline)];
                case 1:
                    result = _b.sent();
                    _a = result.pipelineResult, items = _a.items, dictionary = _a.dictionary, output = __rest(_a, ["items", "dictionary"]);
                    // exclude items and media here as opposed to preventing them from being generated in
                    // the manifest because some processors/pipelines may rely on generated manifest data
                    if (!excludeItems) {
                        output.items = items;
                    }
                    if (!excludeDictionary) {
                        output.dictionary = dictionary;
                    }
                    return [2 /*return*/, output];
            }
        });
    }); };
    return {
        getManifest: getManifest,
        addComponent: addComponent,
        addTemplate: addTemplate,
        addPlaceholder: addPlaceholder,
        addRouteType: addRouteType,
        setDefaultRouteType: setDefaultRouteType,
        addRoute: addRoute,
        addContent: addContent,
        addDictionary: addDictionary,
        fieldTypes: fieldTypes_1.default,
        language: language,
    };
};
