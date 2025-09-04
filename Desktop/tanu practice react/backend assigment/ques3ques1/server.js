const express = require("express");

const app = express();
app.use(express.json())





app.get("/home",(req,res)=>{
    res.send("<>welcome to Home page</>")
})

app.get("/aboutus",(req,res)=>{
    res.json({message:"welcome to about us"})
})

app.get("/contactus",(req,res)=>{
    res.json({
        email: "dummy@example.com",
        phone: "123-456-7890"
    })
})

app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

app.listen(3000,()=>{
    console.log("server is running on the port 3000")
})