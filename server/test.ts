import { TiktokDL } from "@tobyg74/tiktok-api-dl";
import getVideoDurationInSeconds from 'get-video-duration';




TiktokDL("https://www.tiktok.com/@boxingdrill/video/7241760759108111643").then(async (result) => {
    if(typeof result.result?.video != 'undefined'){
        console.log(result.result?.video[0])
        // From a URL...
            getVideoDurationInSeconds(
                result.result?.video[0]
            ).then((duration) => {
                console.log(duration)
            })
            
    }
    
})

