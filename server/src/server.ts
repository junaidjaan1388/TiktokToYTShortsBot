import { connect } from 'mongoose';
import dotenv from 'dotenv';
import express,{Application} from 'express';
import cors from 'cors';
import { CreateLink, GetAllWaitList, GetFirstWaitList, DeleteLink, CheckifisWorking, UpdateLink } from './db/WaitList';
import { cronjobFunc } from './cronjobFunc';
import cron from 'node-cron';
import { GetTiktokInfo } from './tiktok';
import { GetReelDetailsV2 } from './instagram';

dotenv.config()
const app: Application = express();

const PORT = process.env.PORT || 8080 ; 

let currentStatus: string = "IDLE";

export function updateStatus(newStatus:string) {
    currentStatus = newStatus;
  }

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
cron.schedule('*/30 * * * * ',()=>{
        cronjobFunc();
})

app.get('/status', (req, res) => {
    res.json({ status: currentStatus });
});

app.post('/AddNewLinkToWaitList',async (req:express.Request,res:express.Response)=>{
    console.log(req.body)
    if (req.body.type == 'tiktok')
    {
        const tikInfo = await GetTiktokInfo(req.body.tiktokLink)
        await CreateLink({
            tiktokLink:req.body.tiktokLink,
            title : tikInfo?.Title,
            description : tikInfo?.Description,
            dynamic_cover : tikInfo?.dynamic_cover,
            logo:req.body.logo,
            filter:req.body.filter,
            duration:tikInfo?.duration as number,
            isWorking:false,
            watermark:req.body.watermark,
            type : req.body.type
         }).then(()=>res.send(true))
           .catch(()=>{
            return res.status(404).json({ success: false, message: 'An error occurred, please try again later' });
        })
    }
    else if (req.body.type == 'instagram')
    {
        const reelInfo = await GetReelDetailsV2(req.body.tiktokLink);
        await CreateLink({
            tiktokLink:req.body.tiktokLink,
            title : reelInfo?.title,
            description : reelInfo?.description,
            dynamic_cover : reelInfo?.dynamic_cover,
            logo:req.body.logo,
            filter:req.body.filter,
            duration: reelInfo?.duration !== undefined ? parseFloat(reelInfo?.duration) : 0,
            isWorking:false,
            watermark:req.body.watermark,
            type : req.body.type
         }).then(()=>res.send(true))
           .catch(()=>{
            return res.status(404).json({ success: false, message: 'An error occurred, please try again later' });
        })

    }
        
    console.log("type => " + req.body.type)
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
    try {
        await DeleteLink(req.query.id as string) 
        res.json({ success: true, message: 'TT Deleted Successfully' })
    }catch{
        res.status(404).json({ success: false, message: 'An error occurred while Deleting TT, please try again later' });
    }
   
})
app.post('/UpdateLink',async (req:express.Request,res:express.Response)=>{
    try{
        const result = await UpdateLink(req.body)
        res.json({ success: true, message: 'TT Updated Successfully' })
    }catch{
        res.status(404).json({ success: false, message: 'An error occurred while Updating TT, please try again later' });
    }
    
    //res.send(result)
})
app.get('/status',async (req:express.Request,res:express.Response)=>{
    const result = await CheckifisWorking()
    res.send(result > 0 ? true : false) 
})









app.listen(PORT,()=>console.log("Listening on : "+PORT))
