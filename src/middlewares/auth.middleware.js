const jwt=require('jsonwebtoken')


async function authArtist(req,res,next)
{
    const token=req.cookies.token
    if(!token){
        return res.status(401).json({
            message:"Unauthorize"
        })
        
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_PRIVATE_KEY)
        if(decoded.role!=="artist")
        {
            return res.status(403).json({
            message:"You don't have access"
        })
        }
        req.user=decoded
        next()
    }
    catch(err){
        return res.status(401).json({
            message:"Unauthorize"
        })
    }
}
async function authUser(req,res,next)
{
    const token=req.cookies.token
    if(!token){
        return res.status(401).json({
            message:"Unauthorize"
        })
        
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_PRIVATE_KEY)
        if(decoded.role!=="user" )
        {
            return res.status(403).json({
            message:"You don't have access"
        })
        }
        req.user=decoded
        next()
    }
    catch(err){
        return res.status(401).json({
            message:"Unauthorize"
        })
    }
}
module.exports={authArtist,authUser}