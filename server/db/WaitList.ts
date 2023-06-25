import { Schema, model } from 'mongoose';


interface ILinks {
    tiktokLink: string;
    logo: boolean;
    filter: boolean;
    duration:number;
    isWorking:boolean
  }

  const WaitListSchema = new Schema<ILinks>({
    tiktokLink: { type: String, required: true },
    logo: { type: Boolean, required: true },
    filter: { type: Boolean, required: true },
    duration: { type: Number, required: true },
    isWorking: { type: Boolean, required: true },
  });

    //MODAL 
  export const WaitList = model<ILinks>('waitlists', WaitListSchema);

  export const GetWaitListCount = () => WaitList.countDocuments({});

  export const GetAllWaitList = () => WaitList.find()

  export const GetFirstWaitList = () => WaitList.findOne()

  export const CheckifisWorking = () => WaitList.countDocuments({isWorking:true})

  export const ChangeIsWorkingState = (id:string,state:boolean) => WaitList.findByIdAndUpdate(id,{isWorking:state})
  
  export const CreateLink = (values:ILinks) => new WaitList(values).save().then((link)=>console.log('saved Link : '+link))

  export const DeleteLink = (id:string) => WaitList.findOneAndDelete({_id:id}).then(()=>console.log("Deleted Succesully"))