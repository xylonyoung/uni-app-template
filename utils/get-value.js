"use strict";
exports.__esModule = true;
exports.getValue = void 0;
function getValue(obj, key) {
    if (!obj) {
        return '';
    }
    if (typeof key === 'string') {
        return getValue(obj, key.split('.'));
    }
    if (key.length === 1 && obj.hasOwnProperty(key[0])) {
        return obj[key[0]];
    }
    if (obj.hasOwnProperty(key[0])) {
        return getValue(obj[key[0]], key.slice(1));
    }
}
exports.getValue = getValue;
