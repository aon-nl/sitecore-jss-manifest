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
var fs_extra_1 = require("fs-extra");
var glob = __importStar(require("glob"));
var import_fresh_1 = __importDefault(require("import-fresh"));
var nodePath = __importStar(require("path"));
// inspired by 'lookupFiles' method: https://github.com/mochajs/mocha/blob/master/lib/utils.js
exports.resolveFiles = function (_a) {
    var fileGlob = _a.fileGlob, extensions = _a.extensions, recursive = _a.recursive, workingDirectory = _a.workingDirectory;
    var files = [];
    var lookupPath = fileGlob;
    var re = new RegExp("\\.(" + extensions.join('|') + ")$");
    if (!fs_extra_1.existsSync(lookupPath)) {
        if (fs_extra_1.existsSync(lookupPath + ".js")) {
            lookupPath += '.js';
        }
        else {
            var options = {};
            if (workingDirectory) {
                options.cwd = workingDirectory;
            }
            files = glob.sync(lookupPath, options);
            return files;
        }
    }
    try {
        var stat = fs_extra_1.statSync(lookupPath);
        if (stat.isFile()) {
            return [nodePath.resolve(lookupPath)];
        }
    }
    catch (err) {
        // ignore error
        return [];
    }
    fs_extra_1.readdirSync(lookupPath).forEach(function (file) {
        var filePath = nodePath.join(lookupPath, file);
        var stat;
        try {
            stat = fs_extra_1.statSync(filePath);
            if (stat.isDirectory()) {
                if (recursive) {
                    files = files.concat(exports.resolveFiles({ fileGlob: filePath, extensions: extensions, recursive: recursive, workingDirectory: workingDirectory }));
                }
                return;
            }
        }
        catch (err) {
            // ignore error
            return;
        }
        if (!stat.isFile() || !re.test(filePath) || nodePath.basename(filePath)[0] === '.') {
            return;
        }
        var resolvedPath = nodePath.resolve(filePath);
        files.push(resolvedPath);
    });
    return files;
};
exports.importModules = function (_a) {
    var _b = _a.fileGlobs, fileGlobs = _b === void 0 ? [] : _b, _c = _a.workingDirectory, workingDirectory = _c === void 0 ? '' : _c;
    var resolved = [];
    fileGlobs.forEach(function (fileGlob) {
        resolved = resolved.concat(exports.resolveFiles({ fileGlob: fileGlob, extensions: ['.js'], recursive: true, workingDirectory: workingDirectory }));
    });
    if (!resolved.length) {
        console.warn("No files matched any of the source patterns: '" + fileGlobs.join(', ') + "'");
        return [];
    }
    // wrap import() in a function so we can control when the promise starts to resolve.
    // otherwise, promises start to resolve immediately upon creation.
    var modules = resolved.map(function (file) { return function () { return import_fresh_1.default(nodePath.resolve(workingDirectory, file)); }; });
    return modules;
};
