import Downloader from "nodejs-file-downloader"
import axios from 'axios'
import { UploadShorts } from './UploadShorts';
//ba9i makhdmaach dyal insta
async function GetReelDetails(Reelurl:string,ShortTitle:string) {
    
    const {data} = await axios.post('https://savein.io/api/fetchv2',{
        url : Reelurl
    })

      if(data.success){
        DownloadReel(data.data.urls[0],ShortTitle)
      }else{
        console.log('ERROR')
      }
     
       
  //  DownloadReel(data.data.urls[0],data.data.caption)
}

async function DownloadReel(url:string,desc:string) {
    const filename = 'Motivation-N'+Math.floor(Math.random() * 10000)
    const downloader = new Downloader({
        url: url,
        directory: "./video/", //Sub directories will also be automatically created if they do not exist.
        fileName : `${filename}.mp4`,
       
      });
    
      try {
        await downloader.download();
        console.log('Done Downloading')
        UploadShorts(filename,'title','desc')
      } catch (error) {
        console.log(error);
      }
}



GetReelDetails("https://www.instagram.com/reels/CrYdqEIocCR","Be the 1% #DavidGoggins ")
