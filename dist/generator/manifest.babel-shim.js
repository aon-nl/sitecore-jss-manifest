"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// this is a shim to allow non-TypeScript consumers to take advantage of typings data when they cannot specify the
// type of the manifest var in a manifest source file, e.g.
// instead of export default (manifest: Manifest) => { ... }, you can use
// import { addComponent } from 'thislib';
// export default (manifest) => { addComponent(manifest, { data }); }
// DEPRECATED: favor using typing JSDoc instead, e.g. @param {Manifest} manifest Manifest instance to add components to
function addComponent(manifest) {
    var components = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        components[_i - 1] = arguments[_i];
    }
    manifest.addComponent.apply(manifest, components);
}
exports.addComponent = addComponent;
function addTemplate(manifest) {
    var templates = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        templates[_i - 1] = arguments[_i];
    }
    manifest.addTemplate.apply(manifest, templates);
}
exports.addTemplate = addTemplate;
function addPlaceholder(manifest) {
    var placeholders = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        placeholders[_i - 1] = arguments[_i];
    }
    manifest.addPlaceholder.apply(manifest, placeholders);
}
exports.addPlaceholder = addPlaceholder;
function addRouteType(manifest) {
    var routeTypes = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        routeTypes[_i - 1] = arguments[_i];
    }
    manifest.addRouteType.apply(manifest, routeTypes);
}
exports.addRouteType = addRouteType;
function addRoute(manifest) {
    var routes = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        routes[_i - 1] = arguments[_i];
    }
    manifest.addRoute.apply(manifest, routes);
}
exports.addRoute = addRoute;
function addContent(manifest) {
    var contents = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        contents[_i - 1] = arguments[_i];
    }
    manifest.addContent.apply(manifest, contents);
}
exports.addContent = addContent;
function addDictionary(manifest) {
    var entries = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        entries[_i - 1] = arguments[_i];
    }
    manifest.addDictionary.apply(manifest, entries);
}
exports.addDictionary = addDictionary;
