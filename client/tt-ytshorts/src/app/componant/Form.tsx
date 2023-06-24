"use client";
import { useForm } from 'react-hook-form';

type FormData = {
    ttLink : string;
    filter : boolean;
    logo   : boolean
}
function Form() {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<FormData>();

      const onSubmit = (data:FormData) => {
        console.log(data)
      
      }
  return (
             <form
                  onSubmit={handleSubmit(onSubmit)}
                  className=""
                  >
               <div className="justify-center items-center gap-x-3 sm:flex">
                  
                  <input {...register("ttLink",{required:true})} type="text" id="helper-text" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your tiktok Link"></input>
                      
                  </div>  
                  
                  <div className="grid gap-6 mt-5 md:grid-cols-2">
                            {/* options */}
                    <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                            <input  id="bordered-checkbox-1" type="checkbox" {...register("filter")} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            <label htmlFor="bordered-checkbox-1" className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Filter 🎭</label>
                        </div>
                        <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                            <input   id="bordered-checkbox-2" type="checkbox" {...register("logo")} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            <label htmlFor="bordered-checkbox-2" className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Logo </label>
                            
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
                            Add Link
                        </span>
                    </button>
                  
              </form>
  )
}

export default Form