'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.assign = function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
    }
    return t;
};
exports.copy = function (object) {
    return JSON.parse(JSON.stringify(object));
};
