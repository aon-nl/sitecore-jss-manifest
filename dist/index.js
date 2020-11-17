"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var generate_1 = require("./generator/generate");
exports.generateToFile = generate_1.generateToFile;
exports.generateToVariable = generate_1.generateToVariable;
__export(require("./generator/manifest.types"));
__export(require("./generator/manifest.babel-shim"));
var SitecoreIcon_1 = require("./generator/SitecoreIcon");
exports.SitecoreIcon = SitecoreIcon_1.SitecoreIcon;
