const express = require("express")
const app = express();
const apiRoutes = require("./routes/api");

app.use(express.json())
app.use("/api", apiRoutes);



app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

app.listen(3000,()=>{
    console.log("server is running on the port 3000")
})