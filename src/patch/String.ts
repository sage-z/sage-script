'use strict';

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
export function trim(str: string) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}