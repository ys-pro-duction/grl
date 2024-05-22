process.env.TZ = "Asia/Calcutta";
require("dotenv").config()
const express = require("express")
const path = require("path")
const fs = require('node:fs');
require("./database/databaseObj").connectMongodb()
const {sendUpdatedSubhank} = require("./Utils/subhankNumber");

const {oneDigitToTwo} = require("./Utils/otherFunction");
let subhankHtml

let homeHtml
const bodyParser = require('body-parser');
const {getServerTime} = require("./Utils/homeTime");
const {getTodayNumber} = require("./Utils/homeNumber");
const {getRawDateForUpdate, setNumberDataForDate} = require("./Utils/updatingNumber");
const app = express()
// app.use(bodyParser.urlencoded({extended: false}));

// app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use("/", (req, resp, next) => {
    resp.setHeader("Cache-Control", "public, max-age=2592000")
    next();
});
app.use("/", express.static(path.join(__dirname, 'public')));
app.get("/", async (req, resp) => {
    resp.removeHeader("Cache-Control")
    resp.status(200).sendFile(path.join(__dirname, "public", "html", "index.html"))
})
app.get("/shubhank.html", async (req, resp) => {
    const today = new Date()
    const datepicker = `${oneDigitToTwo(today.getMonth() + 1)}/${oneDigitToTwo(today.getDate())}/${today.getFullYear()}`
    resp.removeHeader("Cache-Control")
    resp.send(await sendUpdatedSubhank(datepicker, subhankHtml))
})
app.post("/shubhank.html", async (req, resp) => {
    resp.removeHeader("Cache-Control")
    resp.setHeader("Cache-Control", "public, max-age=10")
    const datepicker = req.body.datepicker
    resp.send(await sendUpdatedSubhank(datepicker, subhankHtml))
})
app.get("/homeDraw", async (req, resp) => {
    resp.removeHeader("Cache-Control")
    resp.setHeader("Cache-Control", "public, max-age=10")
    const todayNumber = await getTodayNumber()

    resp.status((todayNumber.length <= 0) ? 404 : 200).send(todayNumber)
})
app.get("/GetServerTime", async (req, resp) => {
    resp.removeHeader("Cache-Control")
    const serverTime = getServerTime()
    resp.status(serverTime[0].NextDrowTime === "00" ? 404 : 200).send(serverTime)
})
app.get("/disclaimer.htm", async (req, resp) => {
    resp.sendFile(path.join(__dirname, "public", "html", "disclaimer.htm"))
})
app.get("/getAdminData", async (req, resp) => {
    resp.removeHeader("Cache-Control")
    const token = req.headers.token
    if (token === process.env.PASSCODE1 || token === process.env.PASSCODE2 || token === process.env.PASSCODE3) {
        const date = req.headers.date
        if (!date) {
            resp.status(403).send("date missing");
            return;
        }
        const [numberData, nullFound] = await getRawDateForUpdate(date)
        resp.status(nullFound ? 300 : 200).send(numberData)
    } else {
        resp.status(401).send("fuck u")
    }
    const numberBody = req.body
})
app.post("/setAdminData", async (req, resp) => {
    resp.removeHeader("Cache-Control")
    const token = req.headers.token
    const numberBody = req.body
    const date = req.headers.date
    if (!token || !date) {
        resp.status(403).send("fuck u");
        return;
    }
    if (token === process.env.PASSCODE1 || token === process.env.PASSCODE2 || token === process.env.PASSCODE3) {
        await setNumberDataForDate(numberBody, date)
        resp.status(200).send("done")
    } else {
        resp.status(401).send("fuck u")
    }
})
app.get("/sitemap.xml", async (req, resp) => {
    resp.sendFile(path.join(__dirname, "public", "html", "sitemap.xml"))
})
app.get("/:anything", async (req, resp) => {
    resp.sendFile(path.join(__dirname, "public", "html", "404.html"))
})


fs.readFile(path.join(__dirname, "public", "html", "shubhank.html"), 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    subhankHtml = data
});

fs.readFile(path.join(__dirname, "public", "html", "index.html"), 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    homeHtml = data
});

app.listen(8080, () => console.log(" Server ready on port 8080."));