const express = require("express")
const { default: Resturantmodel } = require("../Model/restaurantModel")

const RiviewRouter = express.Router()


RiviewRouter .get("all-restaurants",async (req,res)=>{
    try {
        const Resturant = await Resturantmodel.find()
       res.json(Resturant)
        
    } catch (error) {
        res.status(500).json({msg:"having issue with fetching the data"})
        
    }

    
})
RiviewRouter .post("add-restaurants",async(req,res)=>{


    try {
        const Restaurant = await Resturantmodel.create(req.body)
        res.status(201).json({msg:"add resturant"})

        if(!Restaurant)returnres.status(404)
        
    } catch (error) {
        res.status(500).json({msg:"having issue with fetching the data"})
        
    }

    
    
})


RiviewRouter.get("/:id",(req,res)=>{
    try {
        const Restaurant = Resturantmodel.findById(req.params.id)
       if(!Restaurant)returnres.status(404).json({msg:"resturant not found"})
        
    } catch (error) {
        res.status(500).json({msg:"having issue with fetching the data"})
        
    }
    
})

RiviewRouter .delete("/:id",async (req,res)=>{
    try {
        const Resturant = await Resturantmodel.findByIdAndDelete(req.param.id)
     if(!Restaurant)returnres.status(404).json({msg:"resturant not found"})
        
    } catch (error) {
         res.status(500).json({msg:"having issue with fetching the data"})
        
        
    }
    
    
        
})
module.exports = RiviewRouter