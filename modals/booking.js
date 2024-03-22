const mongoose =require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    doctorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Doctor'
    },
    deptId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Dept'
    }
    ,
    bookDate:{
        type:String,
        required:true
    },
    age:{
        type:String,
        required:true
    },
    report:String
})

module.exports =new mongoose.model('Booking',bookingSchema)