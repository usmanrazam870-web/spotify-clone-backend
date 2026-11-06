const spotifyModel=require('../models/spotify.model')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
async function registerUser(req,res) {
    const {username,email,password,role='user'}=req.body
    const isUserExist= await spotifyModel.findOne({
        $or:[
            {username},{email}
        ]
    })
    if(isUserExist){
        return res.status(409).json({
            message:"User alreaady exist"
        })
    }
    const hash=await bcrypt.hash(password,10)
    const user= await spotifyModel.create({
        username,
        email,
        password:hash,
        role
    })
    const token=jwt.sign({
        _id:user._id,
        role:user.role
    },process.env.JWT_PRIVATE_KEY)
    res.cookie("token",token)
    res.status(201).json({
        message:"User Registered Successfully",
        user:{
        id:user._id,
        username:user.username,
        email:user.email,
        role:user.role
        }
    })
}
async function loginUser(req,res){
    const {username,email,password}=req.body
    const user=await spotifyModel.findOne({
        $or:[
            {username},{email}
        ]
    })
    if(!user)
    {
        return res.status(401).json({
            message:"Invalid Credential"
        })
    }
    const isPasswordValid=await bcrypt.compare(password,user.password)
    if(!isPasswordValid){
        res.status(401).json({
            message:"Invalid Credential"
        })
    }
    const token=jwt.sign({
        _id:user._id,
        role:user.role
    },process.env.JWT_PRIVATE_KEY)
    res.cookie("token",token)
    res.status(201).json({
        message:"User Logged in Successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
            role:user.role
        }
    })
}
async function logOutUser(req,res){
    res.clearCookie("token")
    res.status(200).json({
        message:"User Log Out Successfully"
    })
}
module.exports={registerUser,loginUser,logOutUser}