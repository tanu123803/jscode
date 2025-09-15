const express = require("express")
const app = express()
app.use(express.json())





app.get("/",(req,res)=>{
    res.status(4000).json({msg:"this is unknown route"})
})

app.listen(3000,()=>{
    console.log("server is running on the port 3000")
})