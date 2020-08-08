"use strict";
exports.__esModule = true;
exports.parseTime = void 0;
function parseTime(date, hour) {
    if (!date)
        return;
    var time = date.split('+')[0].replace('T', ' ');
    if (hour === 'hour') {
        return time;
    }
    else {
        return time.split(' ')[0];
    }
}
exports.parseTime = parseTime;
