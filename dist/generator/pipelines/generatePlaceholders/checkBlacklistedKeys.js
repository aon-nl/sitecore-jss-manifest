"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var blacklistedKeys = new Map();
blacklistedKeys.set('content', true);
blacklistedKeys.set('fallback', true);
blacklistedKeys.set('body-top', true);
blacklistedKeys.set('body-bottom', true);
blacklistedKeys.set('head', true);
blacklistedKeys.set('footer', true);
blacklistedKeys.set('main', true);
blacklistedKeys.set('json', true);
blacklistedKeys.set('header', true);
blacklistedKeys.set('newsletter', true);
blacklistedKeys.set('newsletter_head', true);
blacklistedKeys.set('webedit', true);
exports.default = (function (args) {
    if (args.skipPlaceholderBlacklist) {
        return args;
    }
    var blacklistedPlaceholders = args.placeholders.filter(function (placeholder) { return blacklistedKeys.has(placeholder.name); });
    if (blacklistedPlaceholders.length === 0) {
        return args;
    }
    console.error("The manifest used the following reserved placeholder key names:");
    blacklistedPlaceholders.forEach(function (ph) { return console.error(ph.name); });
    console.error();
    console.error('These placeholder name(s) are reserved by the Sitecore system or SXA, and cannot be used without conflict.');
    console.error('Consider renaming these placeholders to have a prefix specific to your JSS app.');
    console.error('If you understand the risks and want to use these placeholder names anyway, pass --allowConflictingPlaceholderNames');
    // tslint:disable-next-line:no-string-throw
    throw 'Aborting due to invalid placeholder name.';
});
