const Dept=require('../modals/deptModel')


module.exports.getDept=(req,res)=>{
    Dept.find()
    .then(data=>{
     if(!data){
         return  res.status(400).json({message:'no data'})
     }
     return  res.status(200).json({message:'success',data:data})
    
    })
    .catch(err=>{
     return  res.status(400).json({message:'error'})
    
    })
 }

