import Downloader from "nodejs-file-downloader"
import axios from 'axios'
import { UploadShorts } from './UploadShorts';
import {igTypes} from './instagram_types';
//ba9i makhdmaach dyal insta

function get_hashtags(text: string): string[] {
  const regex = /#[^\s#]+/g;
  const hashtags = text.match(regex) || [];
  return hashtags;
}

export async function GetReelDetails(Reelurl:string,ShortTitle:string,Dwload_Flag : boolean) {
    
    const regex = /\/(?:p|reel|reels)\/([A-Za-z0-9_-]+)\/?(\?.*)?/;
    const match = Reelurl.match(regex);
    /*
    tiktokLink: string;
    title?:string,
    description?:string,
    dynamic_cover?:string,
    logo: boolean;
    filter: boolean;
    duration:number;
    isWorking:boolean
    */
    if (match && match[1]) {
        const reelId = match[1];
        console.log("Reel ID:", reelId);
        console.log(`https://www.instagram.com/graphql/query/?query_hash=b3055c01b4b222b8a47dc12b090e4e64&variables={"shortcode":"${reelId}"}`)
        const {data} = await axios.get<igTypes>(`https://www.instagram.com/graphql/query/?query_hash=b3055c01b4b222b8a47dc12b090e4e64&variables={"shortcode":"${reelId}"}`)
        
        // console.log(Reelurl);
        // console.log(data.data.shortcode_media.edge_media_to_caption.edges[0].node.text)
        // console.log(get_hashtags(data.data.shortcode_media.edge_media_to_caption.edges[0].node.text).join(' '))
        // console.log(data.data.shortcode_media.video_duration.toFixed(2));
        // console.log(data.data.shortcode_media.display_url)
        if(Dwload_Flag){
          DownloadReel(data.data.shortcode_media.video_url)
          return ;
        }else{
          return 
          {
              reelUrl : Reelurl,
              title : data.data.shortcode_media.edge_media_to_caption.edges[0].node.text,
              description : get_hashtags(data.data.shortcode_media.edge_media_to_caption.edges[0].node.text).join(' ') ,
              dynamic_cover  : data.data.shortcode_media.display_url,
              duration : data.data.shortcode_media.video_duration.toFixed(2)
          }
        }
    } else {
        console.log("Reel ID not found in the link. => "+ Reelurl);
        return ;
        //delete reel from db cuz of wrong link wla gha ana  hmar ma3rftch nhandlih
    }

  //  DownloadReel(data.data.urls[0],data.data.caption)
}

async function DownloadReel(url:string) {
    const filename = 'Motivation-N'+Math.floor(Math.random() * 10000)
    const downloader = new Downloader({
        url: url,
        directory: "./video/", //Sub directories will also be automatically created if they do not exist.
        fileName : `${filename}.mp4`,
       
      });
    
      try {
        await downloader.download();
        console.log('Done Downloading')
       // UploadShorts(filename,'title','desc')
      } catch (error) {
        console.log(error);
      }
}



GetReelDetails("https://www.instagram.com/reels/Cz4NR-KIu_H/","Be the 1% #DavidGoggins ",false)
