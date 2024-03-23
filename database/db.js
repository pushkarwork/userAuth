const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const a = require("")
//ENV CONFIG
dotenv.config({ path: "./config.env" });
const dbstring = process.env.DBSTRING

const connectDb = async () => {
    try {
        await mongoose.connect(dbstring)
        console.log("db connected")
    } catch (error) {
        console.log(error)
    }
}


module.exports = connectDb;