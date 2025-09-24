const express = require("express")
const connectTodb = require("./config/db.config")
const router = require("./routes/Authroutes")
const app = express()
app.use(express.json())


connectTodb
app.use(router)




app.get("/",(req,res)=>{
    res.json({msg:"this is unknown route"})
})



app.listen(3000,()=>{
    console.log("server is running on the port 3000")
})