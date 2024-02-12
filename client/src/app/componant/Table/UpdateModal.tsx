/* This example requires Tailwind CSS v2.0+ */
import { Dispatch, Fragment, SetStateAction, useState, useTransition } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { AlertTriangle, X } from 'lucide-react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { TTlink } from './columns';
import TextareaAutosize from 'react-textarea-autosize';
import { useForm } from 'react-hook-form';
import { DevTool } from "@hookform/devtools";
import { data } from 'autoprefixer';

interface ChildPropsType {
    UpdateModal:boolean
    setUpdateModal: Dispatch<SetStateAction<boolean>>
    row:TTlink
  }
  type FormUpdateData = {
    ttlink:string
    title:string
    hashtags:string
    logo:boolean
    filter:boolean
  }
export default function UpdateDialog({UpdateModal,setUpdateModal,row}:ChildPropsType) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const {
        register,
        handleSubmit,
        setValue,
        reset,
        control,
        formState: { errors },
      } = useForm<FormUpdateData>();
  
  const onSubmit = async (dataform:FormUpdateData) => {
    const toastId = toast.loading("Please wait...")
    setUpdateModal(false);
    console.log(row._id)
    console.log(dataform)
    try{
      await axios.post(process.env.NEXT_PUBLIC_API_URL+'/UpdateLink',{
          id:row._id,
          tiktokLink:dataform.ttlink,
          title:dataform.title,
          description:dataform.hashtags,
          logo:dataform.logo,
          filter:dataform.filter
          
      })
      toast.success('Tiktok Link Was Updated!', {
        id: toastId,
      })
      startTransition(() => {
        // Refresh the current route and fetch new data from the server without
        // losing client-side browser or React state.
        router.refresh();
      });
    
  }catch(e){
    toast.error('Something went wrong ', {
      id: toastId,
    });
  }
}


  return (
    <Transition.Root show={UpdateModal} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setUpdateModal}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-5 transition-opacity backdrop-blur-sm" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => setUpdateModal(false)}
                >
                  <span className="sr-only">Close</span>
                  <X color="#b30000" />
                  
                </button>
              </div>
              <div className="">
                
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <Dialog.Title as="h3" className="text-xl leading-6 font-medium text-gray-900">
                    Update Tiktok
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      {/* TT link */}
                    <div>
                      <label htmlFor="ttlink" className="block text-sm font-medium text-gray-700">
                        TikTok Link
                      </label>
                      <div className="mt-1">
                        <input
                         {...register("ttlink",{value:row.tiktokLink})}
                          name='ttlink'
                          type="text"
                          id="ttlink"
                          className="text-black shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-500 rounded-md cursor-not-allowed "
                          disabled
                        />
                      </div>
                    </div>

                    {/**Title **/}
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                      </label>
                      <div className="mt-1">
                        <input
                         {...register("title",{value:row.title})}
                          type="text"
                          name="title"
                          id="title"
                          className="shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-500 rounded-md text-black"
                        />
                      </div>
                    </div>

                    {/**Hashtags */}
                    <div>
                      <label htmlFor="hashtags" className="block text-sm font-medium text-gray-700">
                        Hashtags
                      </label>
                      <div className="mt-1">
                        <TextareaAutosize
                        {...register("hashtags",{value:row.description})}
                          key='hashtags'
                          name="hashtags"
                          id="hastags"
                          className="h-full shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-500 rounded-md text-black "                          
                        />
                      </div>
                    </div>

                    <div className='ml-1'>
                   { /**logo */}
                    <div className="relative flex items-start mt-3">
                    <div className="flex items-center h-5 ">
                      <input
                      {...register("logo")}
                        id="logo"
                        name="logo"
                        type="checkbox"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        defaultChecked={row.logo}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="logo" className="font-medium text-gray-700">
                        Logo
                      </label>

                    </div>
                  </div>

                   {/**filter */}
                  <div className="relative flex items-start mt-3 ">
                    <div className="flex items-center h-5 ">
                      <input
                      {...register("filter")}
                        id="filter"
                        name="filter"
                        type="checkbox"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        defaultChecked={row.filter}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="filter" className="font-medium text-gray-700">
                        Filter
                      </label>
                    </div>
                  </div>
                   

                    </div>
                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-500 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm transition delay-150 "
                  // onClick={() => HandleClick(row._id)}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setUpdateModal(false)}
                >
                  Cancel
                </button>
              </div>
                    </form>
                  </div>
                </div>
              </div>
              {/* <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => HandleClick(row._id)}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setUpdateModal(false)}
                >
                  Cancel
                </button>
              </div> */}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
