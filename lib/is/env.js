"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function standardBrowser() {
    if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
        return false;
    }
    return (typeof window !== 'undefined' &&
        typeof document !== 'undefined');
}
exports.standardBrowser = standardBrowser;
