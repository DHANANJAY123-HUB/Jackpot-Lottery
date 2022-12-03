const mongoose = require('mongoose')
const url = "mongodb://localhost:27017/Jackpot_Lottery"
mongoose.connect(url)
const db = mongoose.connection
console.log("Successfully connected to mongodb database")
module.exports = db