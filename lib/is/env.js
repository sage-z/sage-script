"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Equipment = (function () {
    function Equipment() {
        this.b = 'asdf';
        this.init();
    }
    Equipment.prototype.init = function () {
        this.b = '12313';
    };
    Object.defineProperty(Equipment.prototype, "bd", {
        get: function () {
            return {
                b: this.b
            };
        },
        set: function (value) {
            console.log('setter: ' + value);
        },
        enumerable: true,
        configurable: true
    });
    return Equipment;
}());
exports.default = Equipment;
exports.e = new Equipment();
exports.name = exports.e.bd;
function standardBrowser() {
    if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
        return false;
    }
    return (typeof window !== 'undefined' &&
        typeof document !== 'undefined');
}
exports.standardBrowser = standardBrowser;
function env() {
    if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
        return false;
    }
    return (typeof window !== 'undefined' &&
        typeof document !== 'undefined');
}
exports.env = env;
function getVersion() {
    if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
        return false;
    }
    return (typeof window !== 'undefined' &&
        typeof document !== 'undefined');
}
exports.getVersion = getVersion;
