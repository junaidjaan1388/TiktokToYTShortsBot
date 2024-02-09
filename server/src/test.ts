import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg';
import {path as ffmpegProbe} from '@ffprobe-installer/ffprobe';
import ffmpeg from 'fluent-ffmpeg';
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffmpegProbe);


async function ScaledOnly(filename:string){
    return new Promise<void>((resolve,reject)=>{
    ffmpeg('ffmpeg-auto/'+filename+'.mp4')
    .videoFilters([
      'scale=1440:2560:flags=lanczos,unsharp=7:7:1:7:7:0'
    ])
    // .outputOptions('-c:v h264_qsv')
    .outputOptions('-r 60')
    .outputOptions('-qp 19')
    .outputOptions('-c:a copy')
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

ScaledOnly("input");
