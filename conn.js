const mongoose=require('mongoose')

mongoose.connect(process.env.DB_URl).then(info=>{
    console.log('connect');
}).catch(err=>{
    console.log(err);
})