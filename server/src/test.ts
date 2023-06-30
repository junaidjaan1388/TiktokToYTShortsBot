import { TiktokDL } from "@tobyg74/tiktok-api-dl";
import getVideoDurationInSeconds from 'get-video-duration';




TiktokDL("https://www.tiktok.com/@boxingdrill/video/7241760759108111643").then(async (result) => {
    if(typeof result.result?.video != 'undefined'){
        console.log(result.result.cover)
        // From a URL...
           
            
    }
    
})

