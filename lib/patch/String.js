'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function trim(str) {
    return str ? str.replace(/(^\s*)|(\s*$)/g, '') : str;
}
exports.trim = trim;
function filterTag(str) {
    str = str.replace(/&/ig, "&amp;");
    str = str.replace(/</ig, "&lt;");
    str = str.replace(/>/ig, "&gt;");
    str = str.replace(" ", "&nbsp;");
    return str;
}
exports.filterTag = filterTag;
function changeCase(str, type) {
    type = type || 4;
    switch (type) {
        case 1:
            return str.replace(/\b\w+\b/g, function (word) {
                return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();
            });
        case 2:
            return str.replace(/\b\w+\b/g, function (word) {
                return word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase();
            });
        case 3:
            return str.split('').map(function (word) {
                if (/[a-z]/.test(word)) {
                    return word.toUpperCase();
                }
                else {
                    return word.toLowerCase();
                }
            }).join('');
        case 4:
            return str.toUpperCase();
        case 5:
            return str.toLowerCase();
        default:
            return str;
    }
}
exports.changeCase = changeCase;
