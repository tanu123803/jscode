const mongoose = require("mongoose")

function connectTodb(){
    try {
        mongoose.connect("mongodb://127.0.0.1:27017/Account Recovery")
        console.log("connect To db")

        
    } catch (error) {
        resizeBy.status(500).json({msg:"having issue  connecting with the mongodb"})
        
    }
}

module.exports =connectTodb