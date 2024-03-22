const User=require('../modals/user')
const Dept=require('../modals/deptModel')
const Doctor=require('../modals/doctor');
const user = require('../modals/user');
const Booking= require('../modals/booking')

module.exports.getDoctor=(req,res)=>{
    const {deptId}=req.query;
    Doctor.find({dept:deptId},{password:0}).populate({path:'dept',model:'Dept'})
    .then(data=>{
        if(!data){
          return  res.status(200).json({message:'no doctor '})
        }
        return  res.status(200).json({message:'success',data:data})
    })
    .catch(err=>{
        console.log(err);
      return  res.status(200).json({message:'error '})
    })
}
module.exports.addBooking=(req,res)=>{
    const{doctorId,date,deptId,age}=req.body
   const newBooking =new Booking({
    userId:req.userData.id,
    doctorId:doctorId,
    bookDate:date,
    deptId:deptId,
    age:age
   })
   newBooking.save()
   .then(info=>{
    return  res.status(200).json({message:'success'})
  
   })
    .catch(err=>{
        console.log(err);
        return  res.status(200).json({message:'last catch error '})
    })
}

module.exports.getAllBooking=(req,res)=>{
  Booking.find({userId:req.userData.id})
  .populate([{path:'doctorId',model:'Doctor',select:'username'},{path:'deptId',model:'Dept'}])
  .then(data=>{
    return res.status(200).json({message:'success',data});
  })
  .catch(err=>{
    console.log(err);
    return  res.status(200).json({message:'last catch error '})

  })
}

module.exports.getBooking=(req,res)=>{
   const {doctorId}=req.query
    Doctor.findOne({_id:doctorId})
    .then(data=>{
        
        if(data.length <=0){
            return res.status(200).json({message:'NoData'})
        }
        const userbook=data.appointment.filter(item=>item.patient==req.userData.id)
        return res.status(200).json({message:'success',data:userbook})
    })
    .catch(err=>{
        
        return res.status(200).json({message:'last catch error '})
   
    })
    
}
module.exports.cancelBooking=(req,res)=>{
    const {id} =req.query;
    Booking.findByIdAndDelete(id)
    .then(info=>{
        return res.status(200).json({message:'success'})
    })
    .catch(err=>{
        return res.status(200).json({message:'last catch error '})
   
    })
}
module.exports.getReport=(req,res)=>{
    const {bookingId} =req.query
    Booking.findById(bookingId)
    .populate([
        {path:'userId',model:'User',select:['userName','email']},
        {path:'doctorId',model:'Doctor',select:['username','email']},
        {path:'deptId',model:'Dept',select:['deptName']}
    ])
    .then(data=>{
        res.status(200).json({message:'success',data})
    })
    .catch(err=>{
        return res.status(200).json({message:'last catch error '})
    })
}
module.exports.getvalidReport=(req,res)=>{
    Booking.find({userId:req.userData.id,report:{$exists:true}})
    .populate([
        {path:'doctorId',model:'Doctor',select:'username'},
        {path:'deptId',model:'Dept',select:'deptName'}
    ])
    .then(data=>{
        return res.status(200).json({message:'success',data:data})
    })
    .catch(err=>{
        return res.status(200).json({message:'last catch error '})
   
    })
}
