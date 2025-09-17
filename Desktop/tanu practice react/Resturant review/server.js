const express = require("express")
const connectTodb = require("./config/db");
const ResturantRouter = require("./Routes/Resturant.router");
const RiviewRouter = require("./Routes/Review.router");
const app = express()
app.use(express.json())

connectTodb();


app.use("Resturant",ResturantRouter)
app.use("Review", RiviewRouter)

app.get("/",(req,res)=>{
    res.status(404).json({msg:"unknown route is not found"})
})

app.listen(3000,()=>{
    console.log("server is running on the port 3000")
})