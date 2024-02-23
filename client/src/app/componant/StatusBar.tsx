'use client';

import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

type Status_t = {
    status:string
}

function StatusBar() {
    
    // const [oldStatus,setOldStatus] = useState<string>("IDLE");
    const [status,setStatus] = useState<string>("IDLE");
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const fetchStatus = async () => {

        const res = await fetch(process.env.NEXT_PUBLIC_API_URL+'/status',{ cache: 'no-store' })
        const data : Status_t = await res.json()
        // setOldStatus(status);
        setStatus(status => {
            if (status == 'UPLOADING ...' && data.status == 'IDLE')
            {
                startTransition(() => {
                    // Refresh the current route and fetch new data from the server without
                    // losing client-side browser or React state.
                    router.refresh();
                  });
            }
            return (data.status)
        });
    }

    useEffect(()=>{
        const interval = setInterval(()=>{
           fetchStatus(); 
        },5000)
    return () => clearInterval(interval)
    },[])
 
    return (
     <p className=" text-gray-400 ">
       Status : <p className="font-bold inline-block">{status}</p>
     </p>
  )
}

export default StatusBar