const musicModel=require('../models/music.model')
const jwt=require('jsonwebtoken')
const {uploadFile}=require('../services/storage.services')
const albumModel=require('../models/album.model')

async function createMusic(req,res){
    
    
    
    const {title}=req.body
    const file=req.file
    
    const result=await uploadFile(file.buffer.toString("base64"))
    const music=await musicModel.create({
        uri:result.url,
        title,
        artist:req.user._id
    })
    res.status(201).json({
        message:"Music Created Successfully", // Yahan message empty tha, text add kar diya
        music:{
            id:music.id,
            uri:music.uri,
            title:music.title,
            artist:req.user._id
        }
    })
    
    
}

async function createAlbum(req,res){
   
        const {title, music}=req.body 
        
        const album=await albumModel.create({
            title,
            artist:req.user._id,
            music: music, 
        })
        
        res.status(201).json({
            message:"Album created Successfully",
            album:{
                _id:album._id,
                title:album.title,
                artist:album.artist,
                music:album.music, 
            }
        })
    }
    
async function getAllMusics(req,res){
    
    const musics=await musicModel
    .find()
    .limit(1)
    .populate("artist")
    res.status(200).json({
        message:"Musics Fetched Successfully",
        musics:musics
    })

}
async function getAllAlbums(req,res){
    const albums=await albumModel
    .find()
    .select('title artist')
    .populate('artist','username email')
    .populate("music")
    return res.status(200).json({
        message:"Album Fetched Successfully",
        albums:albums
    })
}
async function getAllAlbumById(req,res){
    const albumId=req.params.albumId
    const albums=await albumModel.findById(albumId).populate('artist','username email').populate("music")
    return res.status(200).json({
        message:"Album Fetched Successfully",
        albums:albums
    })
}
module.exports={createMusic,createAlbum,getAllMusics,getAllAlbums,getAllAlbumById}