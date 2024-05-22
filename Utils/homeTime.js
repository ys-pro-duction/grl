const {oneDigitToTwo} = require("./otherFunction");

const emptyTime = [{
    "NextDrowTime": "00", "LastDrawTime": "00", "RemainTime": "00", "NowTime": "00", "TodatyDate": `00/00/0000`
}]
function getServerTime() {
    const today = new Date()
    if (today.getHours() < 9 || (today.getHours() > 21 && today.getMinutes() > 29)) return emptyTime
    return [{
        "NextDrowTime": getNextDrawTimeDate(today),
        "RemainTime": "00:00:00",
        "NowTime": getNowTime(today),
        "TodatyDate": `${oneDigitToTwo(today.getDate())}/${oneDigitToTwo(today.getMonth() + 1)}/${today.getFullYear()}`
    }]
}
// function getNextDraw
function getNextDrawTimeDate(date) {
    let hour = date.getHours();
    const min = date.getMinutes();

    const intervals = Math.floor(min / 15);

    let finalMin;
    let finalHour;
    if (min >= 45) {
        finalMin = 0;
        finalHour = hour + 1;
    }else{
        finalMin = (intervals + 1) * 15;
        finalHour = hour
    }
    const am_pm = (finalHour < 12) ? "A.M." : "P.M."
    if (finalHour > 12 ) finalHour = finalHour-12
    const formattedHour = finalHour < 10 ? '0' + finalHour : finalHour;
    const formattedMin = finalMin < 10 ? '0' + finalMin : finalMin;
    return `${formattedHour}:${formattedMin}:00 ${am_pm}`;
}
function getNowTime(date) {
    let hour = date.getHours()
    const min = date.getMinutes()
    const sec = date.getSeconds()
    const am_pm = (hour < 12) ? "A.M." : "P.M."
    if (hour > 12 ) hour = hour-12
    return `${oneDigitToTwo(hour)}:${oneDigitToTwo(min)}:${oneDigitToTwo(sec)} ${am_pm}`
}

module.exports = {getServerTime}