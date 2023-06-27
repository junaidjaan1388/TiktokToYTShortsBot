import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg';
import ffmpeg from 'fluent-ffmpeg';
import { TiktokDL } from "@tobyg74/tiktok-api-dl"
import Downloader from "nodejs-file-downloader"
import { UploadShorts } from './UploadShorts';
import getVideoDurationInSeconds from 'get-video-duration';


ffmpeg.setFfmpegPath(ffmpegPath);

let Title :string ;
let Description :string | undefined ;
let LinkID : string ;

//ScaledOnly('input')
//RenderWithLogoAndFilter()
// AddFilterAndScaleUP('input')
//RenderWithLogoWithOutFilter();
async function RenderWithLogoAndFilter() {
  return new Promise<void>((resolve,reject)=>{
    ffmpeg()
    .input('ffmpeg-auto/input.mp4')
    .input('ffmpeg-auto/Logo.png')
    .complexFilter([
      '[1][0]scale2ref=w=iw/3:h=ow/mdar[logo][main]',
      '[main][logo]overlay=x=(main_w-overlay_w)/2:y=(main_h-overlay_h)-10'
    ])
    .outputOptions('-vcodec h264_nvenc')
    .outputOptions('-c:v libx264')
    .outputOptions('-c:a copy')
    .output('ffmpeg-auto/logoded.mp4')
    .on('end',async () => {
      console.log('Processing finished , Logo Added');
      console.log(Title +' '+Description)
      await AddFilterAndScaleUP('logoded');
    })
    .on('progress', function(progress) {
      //console.log('Processing: ' + progress.percent.toFixed(2) + '%');
      process.stdout.write('Processing: ' + progress.percent.toFixed(2) + '% \r')
    })
    .on('error', (err) => {
      console.error('Error:', err);
    })
    .run();
  })
   
}

async function RenderWithLogoWithOutFilter() {
  return new Promise<void>((resolve,reject)=>{
    ffmpeg()
    .input('ffmpeg-auto/input.mp4')
    .input('ffmpeg-auto/Logo.png')
    .complexFilter([
      '[1][0]scale2ref=w=iw/3:h=ow/mdar[logo][main]',
      '[main][logo]overlay=x=(main_w-overlay_w)/2:y=(main_h-overlay_h)-10'
    ])
    .outputOptions('-vcodec h264_nvenc')
    .outputOptions('-c:v libx264')
    .outputOptions('-c:a copy')
    .output('ffmpeg-auto/logoded.mp4')
    .on('end',async () => {
      console.log('Processing finished , Logo Added');
      console.log(Title +' '+Description)
      await ScaledOnly('logoded')
      resolve();
    })
    .on('progress', function(progress) {
      //console.log('Processing: ' + progress.percent.toFixed(2) + '%');
      process.stdout.write('Processing: ' + progress.percent.toFixed(2) + '% \r')
    })
    .on('error', (err) => {
      console.error('Error:', err);
      reject();
    })
    .run();

  })
   
}


async function AddFilterAndScaleUP(filename:string){
  return new Promise<void>((resolve,reject)=>{
    ffmpeg('ffmpeg-auto/'+filename+'.mp4')
    .videoFilters([
      'scale=1440:2560:flags=lanczos,eq=contrast=1.1:brightness=-0.07:saturation=1.2,unsharp=7:7:1:7:7:0'
    ])
    .outputOptions('-vcodec h264_nvenc')
    .outputOptions('-r 60')
    .outputOptions('-rc constqp')
    .outputOptions('-qp 19')
    .outputOptions('-c:a copy')
    .output('ffmpeg-auto/output.mp4')
    .on('end', async() => {
      console.log('Processing finished Ready To Upload');
      await UploadShorts('output',Title,Description,LinkID)
      resolve()
    })
    .on('progress', function(progress) {
      // console.log('Processing: ' + progress.percent.toFixed(2) + '%');
      process.stdout.write('Processing: ' + progress.percent.toFixed(2) + '% \r')
      
      })
    .on('error', (err) => {
      console.error('Error:', err);
      reject();
    })
    .run();
  })
    
}

async function ScaledOnly(filename:string){
  return new Promise<void>((resolve,reject)=>{
    ffmpeg('ffmpeg-auto/'+filename+'.mp4')
  .videoFilters([
    'scale=1440:2560:flags=lanczos,unsharp=7:7:1:7:7:0'
  ])
  .outputOptions('-vcodec h264_nvenc')
  .outputOptions('-r 60')
  .outputOptions('-rc constqp')
  .outputOptions('-qp 19')
  .outputOptions('-c:a copy')
  .output('ffmpeg-auto/output.mp4')
  .on('end', async () => {
    console.log('Processing finished Ready To Upload');
    await UploadShorts('output',Title,Description,LinkID)
    resolve();
  })
  .on('progress', function(progress) {
   // console.log('Processing: ' + progress.percent.toFixed(2) + '%');
    process.stdout.write('Processing: ' + progress.percent.toFixed(2) + '% \r')
    })
  .on('error', (err) => {
    console.error('Error:', err);
    reject();
  })
  .run();
  })
  
}


export async function HandleFromTiktok(tiktok_url:string,logo:boolean,filter:boolean,IdLink:string){

        return TiktokDL(tiktok_url).then(async (result) => {
            if(result.status == "success"){
                if(typeof result.result?.video != 'undefined'){
                    console.log(result.result?.video[0])
                    Title =  result.result.description.replace(/#[^\s#]+/g,'').replace(/-/g,'') // mera mera kikun --- f title 7ydo
                    Description =  result.result.description.match(/#[^\s#]+/g)?.join(' ') || undefined
                    LinkID = IdLink; //id dyal link f mongodb bsh npassih luploadShorts bsh ila tuploada n7ydu 

                    const downloader = new Downloader({
                        url: result.result?.video[0], //If the file name already exists, a new file with the name 200MB1.zip is created.
                        directory: "./ffmpeg-auto", //This folder will be created, if it doesn't exist.   
                        fileName:'input.mp4',
                        cloneFiles:false, //This will cause the downloader to re-write an existing file.
                        maxAttempts:3,
                        onProgress: function (percentage, chunk, remainingSize) {
                            //Gets called with each chunk.
                            process.stdout.write("Downloading tiktok % "+ percentage + "\r");
                          },
            
                    });
                    try {
                        const {filePath,downloadStatus} = await downloader.download(); //Downloader.download() resolves with some useful properties.
            
                        console.log("Download Tiktok Completed");
                        if(logo && filter) {
                          console.log('Rendering With Logo + Filter + ScaleUP ')
                          await RenderWithLogoAndFilter();
                        }
                        if(logo && !filter){
                          console.log('Rendering With Logo + ScaleUP ')
                          await RenderWithLogoWithOutFilter()
                        }
                        if(!logo && filter){
                          console.log('Rendering With Filter + ScaleUP ')
                          await AddFilterAndScaleUP('input')
                        }
                        if(!logo && !filter){
                          console.log('Rendering With ScaleUP Only')
                          await ScaledOnly('input')
                        }
                        
                    } catch (error) {
                        //IMPORTANT: Handle a possible error. An error is thrown in case of network errors, or status codes of 400 and above.
                        //Note that if the maxAttempts is set to higher than 1, the error is thrown only if all attempts fail.
                        console.log("Download failed", error);
                    }
                }
            }
        })

        
       

        

}

  const GetTiktokDuration = async (tiklink:string) => {
        try{
            return getVideoDurationInSeconds(tiklink)
        }catch{
            return 0
        }
    }
    



export const GetTiktokInfo = async (tiktokLink:string) => {
    return TiktokDL(tiktokLink).then(async(result)=>{
      if(result.status == "success"){
        if(typeof result.result?.video != 'undefined'){
          const duration = await GetTiktokDuration(result.result?.video[0])
          return {
            Title :  result.result.description.replace(/#[^\s#]+/g,'').replace(/-/g,'') ,
            Description :  result.result.description.match(/#[^\s#]+/g)?.join(' ') || undefined,
            dynamic_cover : result.result?.dynamic_cover?.[0] || undefined ,
            duration:duration
          }
          

        }
      }
    })
}

//HandleFromTiktok("https://www.tiktok.com/@vascolevrai/video/7240567363794504987",true,true)
