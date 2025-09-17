const mongoose = require("mongoose")

function connectTodb(){
    mongoose.connect(" mongodb://127.0.0.1:27017/")
    console.log("connect To db")
}

module.exports = connectTodb