const {getNumberBytDate, updateNumberInDate} = require("../database/databaseObj");
const {oneDigitToTwo} = require("./otherFunction");

async function getRawDateForUpdate(date) {
    const dateSplited = date.split("-")
    const day = oneDigitToTwo(dateSplited[0])
    const month = oneDigitToTwo(dateSplited[1])
    const year = dateSplited[2]
    let nullFound = false
    let num = await getNumberBytDate(`${oneDigitToTwo(day)}-${oneDigitToTwo(month)}-${year}`)
    if (num == null) {
        num = []
        nullFound = true
    }
    return [num, nullFound]
}

async function setNumberDataForDate(numData, date) {
    await updateNumberInDate(numData, date)
}

module.exports = {getRawDateForUpdate, setNumberDataForDate}