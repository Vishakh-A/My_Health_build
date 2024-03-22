const jwt= require('jsonwebtoken')

///////////////////////Admin//////////////////////

module.exports.adminVerify=(req,res,next)=>{
    const token =req.headers.authorization;
    if(!token){
        return res.status(200).json({message:'no_token'}) 
    }
    jwt.verify(token,process.env.SECRET_KEY,(err,decode)=>{
        if(err){
            
            return res.status(200).json({message:'verifyerror'})
        }
        req.userData =decode;
        next();
    })
}


///////////////////////Doctor//////////////////////

module.exports.doctorVerify=(req,res,next)=>{
    const token =req.headers.authorization;
    if(!token){
        return res.status(200).json({message:'no token'}) 
    }
    jwt.verify(token,process.env.SECRET_KEY_D,(err,decode)=>{
        if(err){
            return res.status(200).json({message:'error'})
        }
        req.userData =decode;
        next();
    })
}


///////////////////////User//////////////////////

module.exports.userVerify=(req,res,next)=>{
    const token =req.headers.authorization;
    if(!token){
        return res.status(200).json({message:'no token'}) 
    }
    jwt.verify(token,process.env.SECRET_KEY_U,(err,decode)=>{
        if(err){
            console.log(err);
            return res.status(200).json({message:'error'})
        }
        req.userData =decode;
        next();
    })
}