import { ChangeIsWorkingState, CheckifisWorking, GetAllWaitList, GetFirstWaitList, GetWaitListCount } from "./db/WaitList"
import { HandleFromInstagram, HandleFromTiktok } from "./tiktok";
//
export const cronjobFunc = async () => {
    // hadi function li ghatkhdm kola 30 min
    const count = await GetWaitListCount();

    if(count > 0){
        //now check if app is already workin ela chi vid (keeping in mind beli n9dro nproccessiw only 1 vid at time)
        if(await CheckifisWorking() == 0){
            //makhdam ela walo you can start 
            const result = await GetFirstWaitList();
            console.log(result?.id)
            //await ChangeIsWorkingState(result?.id,true)
            try{
                // now change isWorking
                if (result?.type == 'tiktok')
                    await HandleFromTiktok(result?.tiktokLink!,result?.logo!,result?.filter!,result?.id)
                else if (result?.type == 'instagram')
                    await HandleFromInstagram(result?.tiktokLink!,result?.logo!,result?.filter!,result?.id)
                console.log('Finished everything')
               // cronjobFunc()
            }catch{
                //so in case of error stop isworking 
                console.log('something went wrong while handling tiktok')
                await ChangeIsWorkingState(result?.id,false)
            }
           
        }else{
            //madir walo sf tsena 7ta ykml ou ghay3awd ysift ykhdm had fonc bsh ysayb  tani
            console.log('Already Working safi tan 3yto elik')
        }
    }else{
        //makaynch chi vid madir walo sir tal 30 min jaya ...
        console.log('No video Found in the WaitList')
    }

}

