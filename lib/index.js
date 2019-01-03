'use strict';
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
var Base64 = require("./Hashes/Base64");
var CRC32 = require("./Hashes/CRC32");
var MD5 = require("./Hashes/MD5");
var SHA1 = require("./Hashes/SHA1");
var SHA256 = require("./Hashes/SHA256");
var SHA512 = require("./Hashes/SHA512");
var env = require("./is/env");
var business = require("./is/business");
var random = require("./random");
var Str = require("./patch/String");
var Obj = require("./patch/Object");
var qs = require("./qs");
var Event = require("./Event");
var flieList = require("./flieList");
var tools = __assign({ Base64: Base64,
    CRC32: CRC32,
    MD5: MD5,
    SHA1: SHA1,
    SHA256: SHA256,
    SHA512: SHA512 }, env, business, random, Obj, Str, { qs: qs,
    flieList: flieList,
    Event: Event });
module.exports = tools;
