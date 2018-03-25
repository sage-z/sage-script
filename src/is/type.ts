'use strict';
/**
 * 
 * 数据类型检测
 * @module
 */

const isBuffer = require('is-buffer');
const toString = Object.prototype.toString;

/**
 * 确定一个值是否是一个 Array
 *
 * @param {Object} val 要测试的值
 * @returns {boolean} 如果value是一个数组，则返回true，否则返回false
 */
export function Array(val: any) {
  return toString.call(val) === '[object Array]';
}

// /**
//  * 确定一个值是否是一个 ArrayBuffer
//  *
//  * @param {Object} val
//  * @returns {boolean} 
//  */
// function isArrayBuffer(val: any) {
//   return toString.call(val) === '[object ArrayBuffer]';
// }

// /**
//  * 确定一个值是否是一个 FormData
//  *
//  * @param {Object} val
//  * @returns {boolean}
//  */
// function isFormData(val: any) {
//   return (typeof FormData !== 'undefined') && (val instanceof FormData);
// }

// /**
//  * Determine if a value is a view on an ArrayBuffer
//  *
//  * @param {Object} val
//  * @returns {boolean}
//  */
// function isArrayBufferView(val: any) {
//   var result;
//   if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
//     result = ArrayBuffer.isView(val);
//   } else {
//     result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
//   }
//   return result;
// }

/**
 * 确定一个值是否是一个 String
 *
 * @param {Object} val
 * @returns {boolean}
 */
export function String(val: any) {
  return typeof val === 'string';
}

/**
 * 确定一个值是否是一个 Number
 *
 * @param {Object} val
 * @returns {boolean}
 */
export function Number(val: any) {
  return typeof val === 'number';
}

/**
 * 确定一个值是否是一个 undefined
 *
 * @param {Object} val
 * @returns {boolean}
 */
export function Undefined(val: any) {
  return typeof val === 'undefined';
}

/**
 * 确定一个值是否是一个 Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
export function Object(val: any) {
  return val !== null && typeof val === 'object';
}

/**
 * 确定一个值是否是一个 Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
export function Date(val: any) {
  return toString.call(val) === '[object Date]';
}

/**
 * 确定一个值是否是一个 File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
export function File(val: any) {
  return toString.call(val) === '[object File]';
}

// /**
//  * 确定一个值是否是一个 Blob
//  *
//  * @param {Object} val The value to test
//  * @returns {boolean} True if value is a Blob, otherwise false
//  */
// function isBlob(val: any) {
//   return toString.call(val) === '[object Blob]';
// }

/**
 * 确定一个值是否是一个 Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
export function Function(val: any) {
  return toString.call(val) === '[object Function]';
}

// /**
//  * 确定一个值是否是一个 Stream
//  *
//  * @param {Object} val The value to test
//  * @returns {boolean} True if value is a Stream, otherwise false
//  */
// function isStream(val: any) {
//   return isObject(val) && isFunction(val.pipe);
// }

// /**
//  * Determine if a value is a URLSearchParams object
//  *
//  * @param {Object} val The value to test
//  * @returns {boolean} True if value is a URLSearchParams object, otherwise false
//  */
// function isURLSearchParams(val: any) {
//   return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
// }
