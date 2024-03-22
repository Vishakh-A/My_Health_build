const jwt =require('jsonwebtoken');
const bcrypt =require('bcrypt');
const crypto=require('crypto')

const Admin =require('../modals/admin')
const User =require('../modals/user')
const Doctor = require('../modals/doctor')

/////////////////////////////////Admin///////////////

module.exports.adminLogin=(req,res)=>{
    const { username , password} =req.body;
    console.log(req.body);
    Admin.findOne({username:username})
    .then(data=>{
      if(!data){
       return res.status(400).json({message:'login fail 1'})
      }
      bcrypt.compare(password,data.password)
      .then(info=>{
        if(!info){
            return res.status(400).json({message:'login fail 2'})
        }
        jwt.sign({user:data.username,adminId:data._id,isAdmin:true},process.env.SECRET_KEY,(err,token)=>{
            if(err){
                return res.status(400).json({message:'token fail '})
            }
            return res.status(200).json({message:'success ',token:token})
        })
      })
      .catch(err=>{
          res.status(400).json({message:'login fail 3'})
      })
    })
    .catch(err=>{
        res.status(400).json({message:'login fail 4'})
    })
}

module.exports.adminReg =(req,res)=>{
    const {username ,password} =req.body;
console.log(req.body);
    bcrypt.hash(password,10)
    .then(hash=>{
        console.log(hash);
        if(!hash){
         return res.status(400).json({message:'register fail 1'})
        }
        const newAdmin = new Admin({
            username:username,
            password:hash,
            
        })
        return newAdmin.save()
    })
    .then(info=>{
        res.status(200).json({message:'register success',info:info})
    })
    .catch(err=>{
        console.log(err);
        res.status(400).json({message:'register fail 2'})
    })
}


////////////////////////////////////Doctor /////////////////

module.exports.doctorLogin =(req,res)=>{
    const {email ,password } =req.body
    Doctor.findOne({email:email})
    .then(inf=>{
        console.log(inf);
        if(!inf){
          return  res.status(400).json({message:'invalid user'})
        }
        bcrypt.compare(password,inf.password)
        .then(info=>{
            if(!info){
               return res.status(400).json({message:'incorrect details'})
            }
            jwt.sign({email:inf.email,username:inf.username,id:inf._id,isDoctor:true},process.env.SECRET_KEY_D,(err,token)=>{
                if(err){
                  return  res.status(400).json({message:'register fail 2'})
                }
             return   res.status(200).json({message:'success',token:token})
       
            })
        })
        .catch(err=>{
            res.status(400).json({message:'register fail 2'})
       
        })
    })
    .catch(err=>{
        res.status(400).json({message:'register fail 2'})
   
    })
}
module.exports.doctorChange =(req,res)=>{
    const {password } =req.body;
    

    Doctor.findById(req.userData.id)
    .then(data=>{
        if(!data){
            return  res.status(400).json({message:'error 1'})
        }
        bcrypt.hash(password,10).then(hash=>{
            data.password=hash;
            return data.save()
        }).then(inf=>{
            return  res.status(200).json({message:'success',data:inf})
  
        })
        .catch(err=>{
            return  res.status(400).json({message:'error'})
  
        })

    })
    .catch(err=>{
        return  res.status(400).json({message:'error'})
    }
      
   
    )
   
}


///////////////////////////////////user///////////////////

module.exports.userReg =(req,res)=>{
    const {email ,password, username} =req.body;

    User.findOne({email:email})
    .then(data=>{
        if(data){
            return  res.status(200).json({message:'already exist'})
        }
        bcrypt.hash(password,10)
        .then(hash=>{
            if(!hash){
                return  res.status(400).json({message:'error 2'})
            }
            const newUser=new User({
                userName:username,
                email:email,
                password:hash
            })
            newUser.save()
            .then(inf=>{
                return  res.status(200).json({message:'success',data:inf})
            })
            .catch(err=>{
                console.log(err);
                return  res.status(400).json({message:'erro3'})
            })
        })
        .catch(err=>{
            return  res.status(400).json({message:'error4'})
        })
    })
    .catch(err=>{
        return  res.status(400).json({message:'error5'})
    })

    
}
module.exports.userLogin =(req,res)=>{
    const {email ,password} =req.body
    User.findOne({email:email})
    .then(data=>{
        if(!data){
            log
            return  res.status(400).json({message:'error1'})
        }
        bcrypt.compare(password,data.password)
        .then(info=>{
            if(!info){
                return  res.status(400).json({message:'error2'})
            }
            jwt.sign({email:data.email,username:data.userName,id:data._id,isUser:true},process.env.SECRET_KEY_U,(err,token)=>{
                if(err){
                    return  res.status(400).json({message:'error4'})
                }
                return  res.status(200).json({message:'success',token:token})
    
            })
        })
        .catch(err=>{
            return  res.status(400).json({message:'error3'})
    
        })
    })
    .catch(err=>{
        return  res.status(400).json({message:'error5'})
    
    })
}



