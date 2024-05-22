const {MongoClient} = require("mongodb");

let db;

async function connectMongodb() {
    try {
        const client = new MongoClient(process.env.MONGODB_URL);
        await client.connect();
        db = client.db();
        console.log("MongoDB connected successfully!");
    } catch (error) {
        db = undefined
        console.error("Error connecting to MongoDB:", error.message);
        await connectMongodb()
    }
}

async function isMongoConnected() {
    if (db) {
        console.log("MongoDB is connected.");
    } else {
        console.error("MongoDB is not connected.");
        await connectMongodb()
    }
}


const collectionName = "numbers";

async function saveNewDateNumber(numberData, date) {
    await isMongoConnected()
    try {
        await db.collection(collectionName).insertOne({date: date, number: numberData});
        console.log("New date and number saved successfully.");
    } catch (error) {
        console.error("Error saving new date and number:", error.message);
    }
}

async function updateNumberInDate(numberData, date) {
    await isMongoConnected()
    try {
        const existingData = await db.collection(collectionName).findOne({date: date});
        if (existingData) {
            await db.collection(collectionName).updateOne({date: date}, {$set: {number: numberData}});
            console.log("Number updated successfully.");
        } else {
            await saveNewDateNumber(numberData, date);
        }
    } catch (error) {
        console.error("Error updating number for date:", error.message);
    }
}

async function getNumberBytDate(date) {
    await isMongoConnected()
    try {
        const data = await db.collection(collectionName).findOne({date: date});
        if (data === null) {
            return null;
        }
        return data.number;
    } catch (error) {
        console.error("Error retrieving number by date:", error.message);
        return null;
    }
}

module.exports = {getNumberBytDate, updateNumberInDate, connectMongodb};
