"use strict";
exports.__esModule = true;
exports.getProperty = void 0;
function getProperty(obj, key) {
    if (!obj) {
        return false;
    }
    if (typeof key === 'string') {
        return getProperty(obj, key.split('.'));
    }
    if (key.length === 1 && obj.hasOwnProperty(key[0])) {
        return obj[key[0]];
    }
    if (obj.hasOwnProperty(key[0])) {
        return getProperty(obj[key[0]], key.slice(1));
    }
    return false;
}
exports.getProperty = getProperty;
