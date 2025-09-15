const express = require("express")
const studentRouter = express.Router()

studentRouter.get("all-student",(req,res)=>{
    let student = 
    res.send("this is all the student")
})