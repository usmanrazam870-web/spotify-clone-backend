const {ImageKit}=require('@imagekit/nodejs') 

const ImageKitClient=new ImageKit({
    privateKey:process.env.IMAGE_KIT_PRIVATE_KEY
})
async function uploadFile(file){
    const result=await ImageKitClient.files.upload({
        file:file.toString("base64"),
        fileName:"music" + Date.now(),
        folder:"spotify_Backend/music"
    })
    return result
}
module.exports={uploadFile}