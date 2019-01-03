'use strict';

/**
 * 合并对象
 *
 */

// export function merge(){
//     let _args = arguments,
//     newObj: object = {}
//     if(!_args.length) return newObj;
//     for(let index in _args){
//         for(let key in _args[index]){
//             newObj[key] = _args[index][key]
//         }
//     }
//     return newObj;
// }

export const assign = function(t: any) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};

export const copy = function(object: any) {
    // JSON.stringify(object)
    return JSON.parse(JSON.stringify(object))
};