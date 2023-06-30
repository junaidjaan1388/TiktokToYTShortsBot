"use client"

import { ColumnDef } from "@tanstack/react-table"
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import Image from "next/image"
import {BadgeCheck , BadgeX , ArrowUpDown , MoreHorizontal ,Edit, Trash2} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import DeleteDialog from "./DeleteModal"
import UpdateDialog from "./UpdateModal"

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
function classNames(...classes:any[]) {
  return classes.filter(Boolean).join(' ')
}

export type TTlink = {
    _id:string
    tiktokLink: string
    title?:string
    description?:string
    dynamic_cover?:string
    logo: boolean
    filter: boolean
    duration:number
    isWorking:boolean
    createdAt:Date,
    updatedAt:Date
}

export const columns: ColumnDef<TTlink>[] = [
  
  {
     accessorKey: "id",
      header: "ID",
     cell:({row})=> (row.index + 1)
  },
  {
    accessorKey: "tiktokLink",
    header: "Tiktok",
    cell:({row})=> {
        return (
            <a  target="_blank" href={row.getValue('tiktokLink')} rel="noopener noreferrer">
                    <Image src={row.original.dynamic_cover || './template.jpg'} alt='david' width={120} height={200} />
            </a>
        )
    }
  },
  {
    accessorKey: "title",
     header: "Title",
     cell:({row})=>{
      return(
        <div className='text-sm text-ellipsis overflow-hidden ...'>
           {row.getValue('title')}
        </div>
      )
     }
 },
  {
    accessorKey: "logo",
    header: "Logo",
    cell:({row}) =>  row.getValue("logo") ?  <BadgeCheck color="#17c200" /> : <BadgeX color="#e60000" />
  },
  {
    accessorKey: "filter",
    header: "Filter",
    cell:({row}) =>  row.getValue("filter") ?  <BadgeCheck color="#17c200" /> : <BadgeX color="#e60000" />
  },
  {
    accessorKey: "isWorking",
    header: "Status",
    cell : ({row}) => {
        if( row.getValue('isWorking')){
        return (
        <>
            <span className="relative flex h-3 w-3 ">
                <span className="flex items-center text-sm font-medium text-white">
                    <span className="animate-ping absolute flex w-full h-full bg-green-400 rounded-full mr-1.5 flex-shrink-0 opacity-75"></span>
                    <span className="flex w-2.5 h-2.5 bg-green-600 rounded-full mr-1.5 flex-shrink-0"></span>
             Working
             </span>
            </span>
        </>)
        }else{
            return (                
                    <span className="flex items-center text-sm font-medium text-white"><span className="flex w-2.5 h-2.5 bg-red-600 rounded-full mr-1.5 flex-shrink-0"></span>Sleep</span>
            )
         }
        
       
       
      
    }
  },
  {
    accessorKey: "duration",
    header: "Duration",
    // cell : ({row}) => { return (row.getValue('_id')) }
  },
  {
    accessorKey: "createdAt",
    cell : info => (<div className="text-center">{timeAgo.format(new Date(info.row.getValue('createdAt')))}</div>) ,
    header: ({ column }) => {
        return (
            <div className="text-center">
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                CreatedAt
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
            </div>
          
        )
      },
  },
  {
    accessorKey: "updatedAt",
    cell : info =>  (<div className="text-center">{timeAgo.format(new Date(info.row.getValue('updatedAt')))}</div>) ,
    header: ({ column }) => {
        return (
         <div className="text-center">
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                UpdatedAt
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         </div>   
          
        )
      },
    
  },
  {
    id: "actions",
    header: ({ column }) => {
      return (
          <div className="text-center">
            Actions
          </div>
        
      )
    },
    cell: ({ row }) => {
      const [DeleteModal, setDeleteModal] = useState<boolean>(false)
      const [UpdateModal, setUpdateModal] = useState<boolean>(false)
      return (
        <div className='text-center'>
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 hover:bg-accent ">
          {/* <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" /> */}
          <MoreHorizontal color="#ffffff" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-900 ring-1 ring-white ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  onClick={()=>setUpdateModal(true)}
                  className={classNames(
                    active ? 'bg-gray-500 text-gray-400 ' : 'text-gray-200',
                    'group flex items-center px-4 py-2 text-sm cursor-pointer  hover:bg-gray-800 hover:text-gray-200'
                  )}
                >
                  <Edit color="#ffffff" className='mr-3 h-5 w-5'/>
                  Edit
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  onClick={()=>setDeleteModal(true)}
                  className={classNames(
                    active ? 'bg-gray-500 text-red-200 ' : 'text-red-500',
                    'group flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-red-600/10 hover:text-red-200'
                  )}
                >
                  <Trash2 color="#a30000" className="mr-3 h-5 w-5"/>
                  Delete
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
    <DeleteDialog DeleteModal={DeleteModal} setDeleteModal={setDeleteModal} id={row.original._id}/>
    <UpdateDialog UpdateModal={UpdateModal} setUpdateModal={setUpdateModal} row={row.original}/>
  </div>
      )
    },
  },
]
