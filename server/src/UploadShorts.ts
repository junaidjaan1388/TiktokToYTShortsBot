import { readFileSync, writeFileSync, existsSync } from 'fs';
import { Innertube, UniversalCache } from 'youtubei.js';
import { DeleteLink } from './db/WaitList';

const creds_path = './client_secret.json';
const creds = existsSync(creds_path) ? JSON.parse(readFileSync(creds_path).toString()) : undefined;

export async function UploadShorts (filename:string,ShortTitle:string,desc:string | undefined,LinkID:string) {
  const yt = await Innertube.create({ cache: new UniversalCache(false) });
  
  yt.session.on('auth-pending', (data) => {
    console.info(`Hello!\nOn your phone or computer, go to ${data.verification_url} and enter the code ${data.user_code}`);
  });

  yt.session.on('auth', (data) => {
    writeFileSync(creds_path, JSON.stringify(data.credentials));
    console.info('Successfully signed in!');
  });

  yt.session.on('update-credentials', (data) => {
    writeFileSync(creds_path, JSON.stringify(data.credentials));
    console.info('Credentials updated!', data);
  });

  await yt.session.signIn(creds);
  
  const file = readFileSync('./ffmpeg-auto/'+filename+'.mp4');
  
   const hashtags:string = '#motivation #fitnessmotivation #motivationalquotes #gymmotivation #gym #workoutmotivation #motivational #success #successquotes #successmindset #positivity #hustle #mind #mindsetiseverything'
   //ila makanuch hashtags dir hadu par default mn a7ssn ydaro fconfig.json tji easy tbdl mn acc l acc
  console.log(`UPLOADING ...`);
  try{
    const upload = await yt.studio.upload(file.buffer, {
      title: ShortTitle,
      description: desc || hashtags,
      privacy: 'PUBLIC'
    });
    
  
    console.info('Done!', upload);
    if(upload.success){
      console.log('Uploaded Succesfully')
      await DeleteLink(LinkID);
      return true
  
    }else{
      console.log('eerror while uploading')
      return false
    }
  }catch(error){
      console.log('Error While Uploading , '+error)
      UploadShorts(filename,ShortTitle,desc,LinkID)
  }
 
  //delete file
}
//UploadShorts('output',"You are in danger of living a life so comfortable and soft, that you will die without knowing your true potential. (they don't know me son)",undefined,'64a03e30d043e6457f0f4042')