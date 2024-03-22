const Doctor=require('../modals/doctor')
const Booking =require('../modals/booking')
module.exports.addSchedule=(req,res)=>{
    const { date  } =req.body;
    let check=null
    Doctor.findById(req.userData.id)
    .then(data=>{
        if(!data){
            return  res.status(200).json({message:'No data'})
        }
       
        check= data.schedule.find(item=>item.date == date)
        if(check){
            return res.status(200).json({message:'already exist'})
       
        }
        data.schedule.push({date:date});
        data.save().then(info=>{
            return  res.status(200).json({message:'success',data:data})
    
        }).catch(err=>{
            return  res.status(400).json({message:'error 3'})
         
        })
    })
    .catch(err=>{
        return  res.status(400).json({message:'error'})
     
    })
}
module.exports.getSchedule=(req,res)=>{
    Doctor.findById(req.userData.id,{schedule:1})
    .then(data=>{
        if(data.length <=0){
            return  res.status(200).json({message:'no schedule'})
        }
        return  res.status(200).json({message:'success',data:data})
    })
    .catch(err=>{
        return  res.status(400).json({message:'error'})
    })
    
}

module.exports.deleteSchedule=(req,res)=>{
    const {scheduleId} =req.query
    Doctor.findById(req.userData.id)
    .then(data=>{
        if(data.length <=0){
            return  res.status(200).json({message:'no data to delete '})
        }
        const deletedArray=data.schedule.filter(item=>item._id !=scheduleId)
        data.schedule=deletedArray;
        data.save().then(info=>{
            return  res.status(200).json({message:'success',data:info})
        }).catch(err=>{
            return  res.status(400).json({message:'error '})
        })
    })
    .catch(err=>{
        return  res.status(400).json({message:'error '})
    })
}
module.exports.getUser=(req,res)=>{
    
   Booking.find({doctorId:req.userData.id})
   .populate({path:'userId',modal:'User',select:['userName','email']})
   .then(data=>{
    res.status(200).json({message:'success',data:data})
   })
    .catch(err=>{
        console.log(err);
        return  res.status(400).json({message:'error '})
    })
}
module.exports.addReport=(req,res)=>{
    const {content ,repId } =req.body
   Booking.findById(repId)
   .then(data=>{
    if(!data){
        return  res.status(200).json({message:'noData'})
    }
    data.report =content
    data.save()
    .then(info=>{
        return  res.status(200).json({message:'success'})
    })
    .catch(err=>{
        console.log(err);
        return  res.status(200).json({message:'error1'})
    })
   })
    .catch(err=>{
        console.log(err);
        return  res.status(200).json({message:'error '})
    })
}
module.exports.getreport=(req,res)=>{
    const {userId} =req.query
    Booking.findById(userId)
    .then(data=>{
        if(!data){
            return  res.status(200).json({message:'noData'})
        }
        return  res.status(200).json({message:'success',data:data.report})
       
    })
    .catch(err=>{
        console.log(err);
        return  res.status(200).json({message:'error '})
    
    })
    
}
module.exports.editreport=(req,res)=>{
    const {repId} =req.body
    
}