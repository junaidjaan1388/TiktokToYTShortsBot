import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg';
import {path as ffmpegProbe} from '@ffprobe-installer/ffprobe';
import { TiktokDL } from '@tobyg74/tiktok-api-dl';
import ffmpeg from 'fluent-ffmpeg';
import Downloader from 'nodejs-file-downloader';
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffmpegProbe);


async function ScaledOnly(filename:string){
    return new Promise<void>((resolve,reject)=>{
    ffmpeg('ffmpeg-auto/'+filename+'.mp4')

    .videoCodec('libx264')
    .audioCodec('copy')
    .videoFilters([
      'scale=1440:2560:flags=lanczos,setdar=9/16,unsharp=7:7:1:7:7:0'
    ])
    .duration(59)
    .output('ffmpeg-auto/output.mp4')
    .on('end', async () => {
      console.timeEnd("time : ");
      console.log('Processing finished Ready To Upload');
      resolve();
    })    
    .on('progress', function(progress) {
      process.stdout.write('Processing: ' + progress?.percent?.toFixed(2) + '% \r')
      })
    .on('error', (err) => {
      console.error('Error:', err);
      reject();
    })
    .run();
    })
    
  }

  export async function HandleFromTiktok(tiktok_url:string,logo:boolean,filter:boolean){

    return TiktokDL(tiktok_url).then(async (result) => {
        if(result.status == "success"){
            if(typeof result.result?.video != 'undefined'){
                console.log(result.result?.video[0])


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
                  console.time("time : ");  
                  await ScaledOnly('input')
              } catch (error) {
                  //IMPORTANT: Handle a possible error. An error is thrown in case of network errors, or status codes of 400 and above.
                  //Note that if the maxAttempts is set to higher than 1, the error is thrown only if all attempts fail.
                  console.log("Download failed", error);
              }

            }
        }else{
          throw new Error('Something went wrong while getting tiktok details');
        }
    })
}
console.time("time : ");
  ScaledOnly("input");
//  HandleFromTiktok("https://www.tiktok.com/@musclemichael/video/7311747072347180331?lang=en",false,false)
//HandleFromTiktok("https://www.tiktok.com/@tbvnks_clipz/video/7307308778288975134?is_from_webapp=1&sender_device=pc&web_id=7336501286944556550",false,false)
