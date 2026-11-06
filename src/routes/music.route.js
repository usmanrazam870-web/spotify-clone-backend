const express=require('express')
const musicController=require('../controllers/music.controller')
const multer=require('multer')
const authMiddleware=require('../middlewares/auth.middleware')
const route=express.Router()
const upload=multer({storage:multer.memoryStorage()})

route.post('/upload',upload.single('music'),authMiddleware.authArtist, musicController.createMusic)
route.post('/album',authMiddleware.authArtist,musicController.createAlbum)
route.get('/',authMiddleware.authUser,musicController.getAllMusics)
route.get('/albums',authMiddleware.authUser,musicController.getAllAlbums)
route.get('/albums/:albumId',authMiddleware.authUser,musicController.getAllAlbumById)
module.exports=route