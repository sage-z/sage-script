'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var isBuffer = require('is-buffer');
var toString = Object.prototype.toString;
function Array(val) {
    return toString.call(val) === '[object Array]';
}
exports.Array = Array;
function String(val) {
    return typeof val === 'string';
}
exports.String = String;
function Number(val) {
    return typeof val === 'number';
}
exports.Number = Number;
function Undefined(val) {
    return typeof val === 'undefined';
}
exports.Undefined = Undefined;
function Object(val) {
    return val !== null && typeof val === 'object';
}
exports.Object = Object;
function Date(val) {
    return toString.call(val) === '[object Date]';
}
exports.Date = Date;
function File(val) {
    return toString.call(val) === '[object File]';
}
exports.File = File;
function Function(val) {
    return toString.call(val) === '[object Function]';
}
exports.Function = Function;
