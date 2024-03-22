require('dotenv').config();
require('./conn');
const express =require('express')
const bodyParser =require('body-parser')
const cors= require('cors')
const path=require('path')

const admin =require('./routes/admin')
const doctor =require('./routes/doctor')
const user =require('./routes/user')
const guardRoute=require('./routes/guardRoute')
port =process.env.PORT || 8000 ;
const app =express();


app.use(express.static('dist'))
app.use(cors())
app.use(bodyParser.urlencoded ({extended:true}))
app.use(bodyParser.json());

app.use('/api/user',user)
app.use('/api/doctor',doctor)
app.use('/api/admin',admin)
app.use('/api/guard',guardRoute)

app.get('*',(req,res)=>{
     res.sendFile(path.join(__dirname,'dist/index.html'))
    

})
app.listen(port,()=>{
    console.log(`server started at port ${port}`);
}
)