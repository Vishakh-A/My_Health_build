const mongoose=require('mongoose')

const userSchema =new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
  
        
    
})

module.exports =new mongoose.model('User',userSchema)