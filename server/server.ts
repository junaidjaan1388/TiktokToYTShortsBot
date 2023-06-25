import { Schema, model, connect } from 'mongoose';
import dotenv from 'dotenv';
import express,{Application} from 'express';
import cors from 'cors';
import { WaitList , CreateLink, GetAllWaitList, GetFirstWaitList, DeleteLink, CheckifisWorking } from './db/WaitList';
import { cronjobFunc } from './cronjobFunc';
import cron from 'node-cron'
import { GetTiktokDuration } from './tiktok';
dotenv.config()
const app: Application = express();

const PORT = process.env.PORT || 8080 ; 
app.use(cors())
app.use(express.json())

try{
     connect(process.env.MONGO_URL!);
     console.log("Connected To MongoDB !")
    // cronjobFunc();
}catch(e){
    console.log('Error While connecting to MongoDB!!')
    console.log(e)
}



//https://crontab.guru/#*/30_*_*_*_*
// cron.schedule('*/30 * * * * ',()=>{
//         cronjobFunc();
// })


app.post('/AddNewLinkToWaitList',async (req:express.Request,res:express.Response)=>{
    const duration = await GetTiktokDuration(req.body.tiktokLink)
    console.log(duration)
    const result = await CreateLink({
        tiktokLink:req.body.tiktokLink,
        logo:req.body.logo,
        filter:req.body.filter,
        duration:duration as number,
        isWorking:false
     }).then(()=>res.send(true))
       .catch(()=>{
        res.status(400) 
        res.send('Error accured While ')
    }) 
})

app.get('/GetWaitList',async (req:express.Request,res:express.Response)=>{

    const result = await GetAllWaitList()
    res.send(result)
})
app.get('/GetFirstWaitList',async (req:express.Request,res:express.Response)=>{

    const result = await GetFirstWaitList()
    res.send(result)
})
app.get('/DeleteLink',async (req:express.Request,res:express.Response)=>{
   await DeleteLink(req.query.id as string) 
    res.send(true)
})

app.get('/status',async (req:express.Request,res:express.Response)=>{
    const result = await CheckifisWorking()
    res.send(result > 0 ? true : false) 
})









app.listen(PORT,()=>console.log("Listening on : "+PORT))