const nodemailer=require('nodemailer')

const transport=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.USER,
        pass:process.env.PASS
    }
})

module.exports.sendMail=(mailOptions)=>{

    transport.sendMail(mailOptions,(err,info)=>{
        if(err){
            console.log(err);
        }else{
            console.log('success');
        }
    })
}
module.exports.mailOptions={
    from:{
        name:'MyHealth',
        address:process.env.USER
    },
    to:'',
    subject:'',
    html:``
}