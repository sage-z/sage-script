'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var toString = Object.prototype.toString;
function array(val) {
    return toString.call(val) === '[object Array]';
}
exports.array = array;
exports.buffer = require('is-buffer');
function string(val) {
    return typeof val === 'string';
}
exports.string = string;
function number(val) {
    return typeof val === 'number';
}
exports.number = number;
function object(val) {
    return val !== null && typeof val === 'object';
}
exports.object = object;
function date(val) {
    return toString.call(val) === '[object Date]';
}
exports.date = date;
function file(val) {
    return toString.call(val) === '[object File]';
}
exports.file = file;
function fn(val) {
    return toString.call(val) === '[object Function]';
}
exports.fn = fn;
