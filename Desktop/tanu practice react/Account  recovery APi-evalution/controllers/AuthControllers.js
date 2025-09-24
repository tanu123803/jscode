const User = require()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const nodemailer = require("nodemailer")





exports.register = async(req,res)=>{
    try {
        const{email,password} = req.body
        const hashedpassword = await bcrypt.hash(password,10);
        const newUser = new userInfo({email,password:hashedpassword})
        await newUser.save()
        res.status(201).json({msg:"user has been register succesfully"})
    } catch (error) {
        res.status(400).json({error:"facing error while login the user"})
        
    }
}



exports.login = async(req,res)=>{
    try {
        const{email,password} = req.body
        const user = await  Userfindone({email})
        if(!user){
            return res.status(404).json({msg:"user not found"})
        }
        const isMatch = await bcrypt compare (password,user.password)
        if(!isMatch){
            return res.status(404).json({msg:"invalid user credentials "})
        }
        

        
    } catch (error) {
        res.status(500).json({error:error.message})
        
    }
}