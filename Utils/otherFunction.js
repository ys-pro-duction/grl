const fs = require("node:fs");
const path = require("path");

function oneDigitToTwo(digit) {
    if (digit.toString().length === 1) {
        return `0${digit}`
    } else {
        return digit
    }
}

function getLastShowIndex(date) {
    let hour = date.getHours();
    const min = date.getMinutes();

    const intervals = Math.floor(min / 15);
    let finalMin;
    let finalHour;
    if (min >= 45) {
        finalMin = 0;
        finalHour = hour + 1;
    } else {
        finalMin = (intervals + 1) * 15;
        finalHour = hour
    }
    const nowTime = `${finalHour}:${finalMin}`
    const index = allDrawTime.indexOf(nowTime)
    if (index <0) {
        return allDrawTime.length
    }else{
        return index
    }
}

const allDrawTime = ['9:0', '9:15', '9:30', '9:45', '10:0', '10:15', '10:30', '10:45', '11:0', '11:15', '11:30', '11:45', '12:0', '12:15', '12:30', '12:45', '13:0', '13:15', '13:30', '13:45', '14:0', '14:15', '14:30', '14:45', '15:0', '15:15', '15:30', '15:45', '16:0', '16:15', '16:30', '16:45', '17:0', '17:15', '17:30', '17:45', '18:0', '18:15', '18:30', '18:45', '19:0', '19:15', '19:30', '19:45', '20:0', '20:15', '20:30', '20:45', '21:0', '21:15', '21:30']
module.exports = {oneDigitToTwo, allDrawTime, getLastShowIndex}