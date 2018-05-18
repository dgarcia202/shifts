const moment = require('moment');

const dateParamPosition = 2;
const dateInputFormat = 'D/M/YY';
const dateDisplayFormat = 'D MMM YYYY, ddd';

let shiftPattern = ['M', 'M', 'T', 'T', 'T', 'T', 'T', '*', '*', 'M', 'M', 'M', 'M', 'M', 'T', 'T', '*', '*', '*', '*', '*'];
let patternStartDate = moment('10/1/18', dateInputFormat);

main();

/* funcs */

function main() {
    if (!hasDateParameter()) {
        console.log('No date param provided');
        process.exit();
    }

    let date = moment(process.argv[dateParamPosition], dateInputFormat);

    if (!date.isValid()) {
        console.log('Provided date is not valid');
        process.exit();
    }

    let week = getWeek(date);
    week.forEach(function(cursor) {
        console.log(`${cursor.format(dateDisplayFormat)} - ${getShift(cursor)}`);
    });
}

function hasDateParameter() {
    return process.argv.length >= (dateParamPosition + 1);
}

function getWeek(date) {
    let cursor = moment(date);
    cursor.subtract(date.weekday() - 1, 'days');

    let week = [moment(cursor)];
    do {
        cursor.add(1, 'days');
        week.push(moment(cursor));
    } while (cursor.weekday() != 1);

    return week;
}

function getShift(date) {
    let totalDays = date.diff(patternStartDate, 'days');
    let offset = totalDays % shiftPattern.length;
    return shiftPattern[offset];
}