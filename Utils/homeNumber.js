const {oneDigitToTwo, allDrawTime, getLastShowIndex} = require("./otherFunction");
const {getNumberBytDate} = require("../database/databaseObj");

function getHomeNumberObject(id, hour, mins, number, ab) {
    return {
        "$id": `${id}`,
        "lname": `${ab}`,
        "drhrs": hour,
        "drmins": mins,
        "nosplayed": `${number}`,
        "xaxis": "0",
        "yaxis": "1"
    }
}

async function getTodayNumber() {
    const today = new Date()
    if (today.getHours() < 9){ return [] }
    // const localDate = today.toLocaleDateString().split("/")
    // const day = localDate[1]
    // const month = localDate[0]
    // const year = localDate[2]
    let num = await getNumberBytDate(`${oneDigitToTwo(today.getDate())}-${oneDigitToTwo(today.getMonth() + 1)}-${today.getFullYear()}`)
    if (num == null) return []
    const keepAt = getLastShowIndex(today)
    if (num.length > keepAt) {
        num = num.reverse().slice(0, keepAt);
        num.reverse()
    }
    return convertToNormal(num);
}

function convertToNormal(num) {
    let objCount = 0
    let finalArray = []
    for (let i = 0; i < num.length; i++) {
        const number = num[i]
        const hr = number.hr
        const min = number.min
        const n60 = number.n60
        const n70 = number.n70
        finalArray[objCount] = getHomeNumberObject(objCount+1,hr,min,n60,"A")
        objCount++
        finalArray[objCount] = getHomeNumberObject(objCount+1,hr,min,n70,"B")
        objCount++
    }
    return finalArray
}
module.exports = {getTodayNumber}