"use strict";
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var sitecore_pipelines_1 = require("@sitecore-jss/sitecore-pipelines");
var chalk_1 = __importDefault(require("chalk"));
var fs = __importStar(require("fs-extra"));
var path = __importStar(require("path"));
var utils_1 = require("../utils");
var manifest_1 = require("./manifest");
var processSpecFile = function (moduleWrapper, manifest) { return __awaiter(void 0, void 0, void 0, function () {
    var module, moduleResult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, moduleWrapper()];
            case 1:
                module = _a.sent();
                if (!module.default || typeof module.default !== 'function') {
                    console.warn('no valid default export defined on module', module);
                    return [2 /*return*/, manifest];
                }
                moduleResult = module.default(manifest);
                // spec files should only return undefined or a promise, we only care about the promise
                if (moduleResult && moduleResult.then) {
                    // result is a promise
                    // resolve the promise and return the manifest instance so that any non-async spec files
                    // after the current file will receive the manifest instance as an argument
                    return [2 /*return*/, moduleResult.then(function () { return manifest; })];
                }
                return [2 /*return*/, manifest];
        }
    });
}); };
var processSpecFiles = function (_a) {
    var fileGlobs = _a.fileGlobs, manifestInstance = _a.manifestInstance;
    return __awaiter(void 0, void 0, void 0, function () {
        var moduleWrappers, manifest, _i, moduleWrappers_1, moduleWrapper;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    moduleWrappers = utils_1.importModules({ fileGlobs: fileGlobs });
                    manifest = manifestInstance;
                    _i = 0, moduleWrappers_1 = moduleWrappers;
                    _b.label = 1;
                case 1:
                    if (!(_i < moduleWrappers_1.length)) return [3 /*break*/, 4];
                    moduleWrapper = moduleWrappers_1[_i];
                    return [4 /*yield*/, processSpecFile(moduleWrapper, manifest)];
                case 2:
                    // eslint-disable-next-line no-await-in-loop
                    manifest = _b.sent();
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, manifest];
            }
        });
    });
};
var initRequire = function (requireArg) {
    if (!requireArg) {
        return;
    }
    try {
        if (requireArg.startsWith('.')) {
            requireArg = path.join(process.cwd(), requireArg);
        }
        require(requireArg);
    }
    catch (e) {
        throw new Error("Unable to load manifest require " + requireArg + ": " + e);
    }
};
var copyMedia = function (mediaPaths, outputPath) {
    var seen = new Set();
    return mediaPaths
        .filter(function (item) { return (seen.has(item.src) ? false : seen.add(item.src)); })
        .map(function (mediaPath) {
        if (!mediaPath.src) {
            console.warn("Media field value " + JSON.stringify(mediaPath) + " did not have an expected 'src' property. Its media item will not be deployed.");
            return { success: false };
        }
        var mediaSourcePath = path.isAbsolute(mediaPath.src) ? "." + mediaPath.src : mediaPath.src;
        if (fs.existsSync(mediaSourcePath)) {
            if (!fs.statSync(mediaSourcePath).isFile()) {
                console.warn("Source media path referred to in manifest data is not a file: " + mediaSourcePath);
                return { success: false };
            }
            var mediaDestinationPath = path.join(path.dirname(outputPath), mediaPath.src);
            var mediaDestinationFolder = path.dirname(mediaDestinationPath);
            fs.ensureDirSync(mediaDestinationFolder);
            fs.copySync(mediaSourcePath, mediaDestinationPath);
            console.log("copied media from: " + mediaSourcePath + " to: " + mediaDestinationPath);
            return { source: mediaSourcePath, destination: mediaDestinationPath, success: true };
        }
        // tslint:disable-next-line:no-string-throw
        throw "Source media file referred to in manifest data doesn't exist: " + mediaSourcePath;
    });
};
var writeOutput = function (_a) {
    var outputPath = _a.outputPath, manifest = _a.manifest, excludeMedia = _a.excludeMedia;
    return __awaiter(void 0, void 0, void 0, function () {
        var media, finalManifest;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(outputPath !== 'console')) return [3 /*break*/, 3];
                    return [4 /*yield*/, fs.ensureFile(outputPath)];
                case 1:
                    _b.sent();
                    // we copy the media first, because we no longer need the media prop after that
                    if (!excludeMedia && manifest.media) {
                        copyMedia(manifest.media, outputPath);
                    }
                    media = manifest.media, finalManifest = __rest(manifest, ["media"]);
                    return [4 /*yield*/, fs.writeJson(outputPath, finalManifest, { spaces: 2 })];
                case 2:
                    _b.sent();
                    console.log(chalk_1.default.green("Manifest has been generated and written to " + outputPath));
                    return [2 /*return*/, finalManifest];
                case 3:
                    console.log('manifest', JSON.stringify(manifest, null, 2));
                    return [2 /*return*/, manifest];
            }
        });
    });
};
var getPipelineConfig = function (_a) {
    var patchGlobs = _a.patchGlobs;
    return __awaiter(void 0, void 0, void 0, function () {
        var manifestConfig, patchedConfig, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, sitecore_pipelines_1.configLoader({
                        fileGlobs: ['./pipelines/**/pipeline.config.js'],
                        workingDirectory: __dirname,
                    })];
                case 1:
                    manifestConfig = _c.sent();
                    if (!patchGlobs) return [3 /*break*/, 3];
                    return [4 /*yield*/, sitecore_pipelines_1.configLoader({
                            fileGlobs: patchGlobs,
                            existingConfig: manifestConfig,
                            allowEmptyGlobs: true,
                        })];
                case 2:
                    _b = _c.sent();
                    return [3 /*break*/, 4];
                case 3:
                    _b = manifestConfig;
                    _c.label = 4;
                case 4:
                    patchedConfig = _b;
                    return [2 /*return*/, patchedConfig];
            }
        });
    });
};
// generates the JSON manifest and returns it as a variable
// NOTE: media is not copied into the manifest when using this method,
// and no files are written to disk. Use generateToFile() to make a manifest
// that is designed to get packaged/imported.
function generateToVariable(_a) {
    var requireArg = _a.requireArg, fileGlobs = _a.fileGlobs, pipelines = _a.pipelines, appName = _a.appName, _b = _a.excludeItems, excludeItems = _b === void 0 ? false : _b, _c = _a.excludeDictionary, excludeDictionary = _c === void 0 ? false : _c, language = _a.language, pipelinePatchFileGlobs = _a.pipelinePatchFileGlobs, debug = _a.debug, wipe = _a.wipe, rootPlaceholders = _a.rootPlaceholders, skipPlaceholderBlacklist = _a.skipPlaceholderBlacklist;
    return __awaiter(this, void 0, void 0, function () {
        var finalPipelines, _d, manifestInstance, manifestOutput;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    initRequire(requireArg);
                    _d = pipelines;
                    if (_d) return [3 /*break*/, 2];
                    return [4 /*yield*/, getPipelineConfig({ patchGlobs: pipelinePatchFileGlobs })];
                case 1:
                    _d = (_e.sent());
                    _e.label = 2;
                case 2:
                    finalPipelines = _d;
                    manifestInstance = manifest_1.createManifestInstance({
                        pipelines: finalPipelines,
                        appName: appName,
                        excludeItems: excludeItems,
                        excludeDictionary: excludeDictionary,
                        language: language,
                        debug: debug,
                        wipe: wipe,
                        rootPlaceholders: rootPlaceholders,
                        skipPlaceholderBlacklist: skipPlaceholderBlacklist,
                    });
                    return [4 /*yield*/, processSpecFiles({ fileGlobs: fileGlobs, manifestInstance: manifestInstance })];
                case 3:
                    manifestInstance = _e.sent();
                    return [4 /*yield*/, manifestInstance.getManifest()];
                case 4:
                    manifestOutput = _e.sent();
                    return [2 /*return*/, manifestOutput];
            }
        });
    });
}
exports.generateToVariable = generateToVariable;
// generates a JSON manifest and writes its contents to a directory. Media referenced in the manifest
// is also copied to the directory.
function generateToFile(_a) {
    var _b = _a.outputPath, outputPath = _b === void 0 ? 'console' : _b, _c = _a.excludeMedia, excludeMedia = _c === void 0 ? false : _c, generateToVariableOptions = __rest(_a, ["outputPath", "excludeMedia"]);
    return __awaiter(this, void 0, void 0, function () {
        var manifestOutput;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, generateToVariable(generateToVariableOptions)];
                case 1:
                    manifestOutput = _d.sent();
                    return [2 /*return*/, writeOutput({ outputPath: outputPath, manifest: manifestOutput, excludeMedia: excludeMedia })];
            }
        });
    });
}
exports.generateToFile = generateToFile;
