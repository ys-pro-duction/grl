const {oneDigitToTwo, getLastShowIndex} = require("./otherFunction")
const {getNumberBytDate} = require("../database/databaseObj");

async function sendUpdatedSubhank(datepicker, subhankHtml) {
    const dateSplited = datepicker.split("/")
    const day = oneDigitToTwo(dateSplited[1])
    const month = oneDigitToTwo(dateSplited[0])
    const year = dateSplited[2]
    return getSubhankAndPutHtml(day, month, year, subhankHtml)
}

async function getSubhankAndPutHtml(day, month, year, subhankHtml) {
    let num
    const selectedDay = new Date()
    selectedDay.setFullYear(year, month - 1, day)
    const today = new Date()
    if (selectedDay > today) {
        num = []
    } else {
        num = await getNumberBytDate(`${day}-${month}-${year}`)
        if (num == null) num = []
    }
    if (selectedDay.getDate() === today.getDate() && selectedDay.getMonth() === today.getMonth() && selectedDay.getFullYear() === today.getFullYear()) {
        if (today.getHours() >= 9) {
            const keepAt = getLastShowIndex(today)
            if (num.length > keepAt) {
                num = num.reverse().slice(0, keepAt)
                num.reverse()
            }
        }else num = []
    }

    const stringNum = JSON.stringify(num)

    return subhankHtml.replace("{{%data%}}", stringNum).replace("{{%date%}}", `${month}/${day}/${year}`)
}

module.exports = {sendUpdatedSubhank}