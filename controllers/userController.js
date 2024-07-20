const asyncHandler = require("express-async-handler")
const userModel = require("../models/userModel")
const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')


const registerUser =asyncHandler(async (req, res)=>{
    const {userName,email,password} = req.body
    if(!userName || !email || !password){
        res.status(400)
        throw new Error("All fileds are mandatory")
    }
    const userAvailable = await userModel.findOne({email})
    if (userAvailable){
        res.status(400)
        throw new Error("user Already available")
    }
    const hashedpassword = await bcrypt.hash(password,10);
    console.log("hashed",hashedpassword)
    const createdUser = await userModel.create({
        userName,
        email,
        password:hashedpassword
    })
    if (createdUser){
        res.status(201).json({_id:createdUser.id,email:createdUser.email});
    } else {
        res.status(400);
        throw new Error("User data is not valid")
    }
})

const loginUser = asyncHandler(async (req,res)=>{
    const {email,password} = req.body
    if(!email||!password){
        res.status(400)
        throw Error("All fields are mandatory")
    }
    const user = await userModel.findOne({email})

    const val = await bcrypt.compare(password,user.password)

    if(user && (await bcrypt.compare(password, user.password))){
        const accestoken = jwt.sign({
            user:{
                userName:user.userName,
                email:email,
                id:user.id
            }
        },process.env.ACCESS_TOKEN,{expiresIn:"15m"}) 
        res.status(201).json({accestoken:accestoken})
    } else {
        res.status(400)
        throw new Error("email or password is not valid")
    }
})

const getCurrentUser = asyncHandler(async (req,res)=>{
    console.log("current user")
    // const currentUser = await userModel.findById(req.params.id)
    res.json(req.user)
})
module.exports = {registerUser,loginUser,getCurrentUser}