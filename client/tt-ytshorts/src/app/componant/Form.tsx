"use client";
import { useForm } from 'react-hook-form';
import { DevTool } from "@hookform/devtools";
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import {ImagePlus , SlidersHorizontal} from 'lucide-react'
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

type FormData = {
    ttLink : string;
    filter : boolean;
    logo   : boolean
}
function Form() {
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
      } = useForm<FormData>();
      

      const tiktokVideoRegex = /tiktok\.com(.*)\//;
      const router = useRouter();
      const [isPending, startTransition] = useTransition();
      

      const onSubmit = async (dataform:FormData) => {
        console.log(dataform)
        console.log(process.env.NEXT_PUBLIC_API_URL+'/AddNewLinkToWaitList')
        const toastId = toast.loading("Please wait...")
        try{
            const {data} = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/AddNewLinkToWaitList', {
                tiktokLink:dataform.ttLink,
                logo:dataform.logo,
                filter:dataform.filter,
              })

              toast.success('Tiktok Link Was Saved!', {
                id: toastId,
              });
              reset();

              startTransition(() => {
                // Refresh the current route and fetch new data from the server without
                // losing client-side browser or React state.
                router.refresh();
              });
              
              
        }catch(e){
            console.log("Axios Error")
            toast.error('Something went wrong', {
                id: toastId,
              });
        }
       
      }

      const handlePaste = async (event:any) => {
        event.preventDefault();
        try {
          const clipboardData = await navigator.clipboard.readText();
          setValue('ttLink',clipboardData);
        } catch (error) {
          console.error('Failed to read clipboard data:', error);
        }
      };
  return (
    <>
    
             <form
                  onSubmit={handleSubmit(onSubmit)}
                  className=""
                  >
               <div className="relative justify-center items-center gap-x-3 ">
                  <input {...register("ttLink",{required:true,
                    pattern: {
                        value: tiktokVideoRegex,
                        message: 'Invalid TikTok video link',
                      },
                    
                })}  type="text" id="helper-text" aria-describedby="helper-text-explanation" className="block p-2.5 w-full z-20  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your tiktok Link">
                </input>
                <button className='absolute top-0 right-0 p-2.5 ml-2 bg-purple-700 rounded-r-lg border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800' onClick={handlePaste}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5  font-medium text-white rounded-r-lg " >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                        </svg>
                    </button>

               
                  </div>  
                  {errors.ttLink?.message && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium"> {errors.ttLink?.message} </span> </p>}
                  
                  <div className="grid gap-6 mt-5 md:grid-cols-2">
                            {/* options */}
                    <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700 ">
                            <input  id="bordered-checkbox-1" type="checkbox" {...register("filter")} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 "/>
                            <label htmlFor="bordered-checkbox-1" className="flex justify-center w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 ">Filter <SlidersHorizontal color="#991b1b" className='ml-2 h-5 w-5' /></label>
                        </div>
                        <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                            <input   id="bordered-checkbox-2" type="checkbox" {...register("logo")} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            
                            <label htmlFor="bordered-checkbox-2" className="flex justify-center w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Logo <ImagePlus color="#991b1b" className='ml-2 h-5 w-5' /> </label>

                        </div>
                    </div>
                    <button
                        className="group relative inline-block text-sm font-medium text-white focus:outline-none focus:ring mt-5"
                        type="submit"
                        >
                        <span
                            className="absolute inset-0 border border-violet-600 group-active:border-violet-500"
                        ></span>
                        <span
                            className="block border border-pruple-600 bg-violet-600 px-12 py-3 transition-transform active:border-pruple-500 active:bg-violet-500 group-hover:-translate-x-1 group-hover:-translate-y-1"
                        >
                            Add Links
                        </span>
                    </button>
                
                  
              </form>
              {/* <DevTool control={control} /> */}
              <Toaster 
              position='top-center'
              toastOptions={{
                duration:5000
              }}
              />
    </>    
  )
}

export default Form