"use client"

import { ColumnDef } from "@tanstack/react-table"
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import Image from "next/image"
import {BadgeCheck , BadgeX , ArrowUpDown} from 'lucide-react'
import { Button } from "@/components/ui/button"
TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type TTlink = {
    _id:string
    tiktokLink: string
    logo: boolean
    filter: boolean
    duration:number
    isWorking:boolean
    createdAt:Date,
    updatedAt:Date
}

export const columns: ColumnDef<TTlink>[] = [
  {
     accessorKey: "_id",
      header: "ID",
     cell:({row})=> (row.index + 1)
  },
  {
    accessorKey: "tiktokLink",
    header: "Tiktok",
    cell:({row})=> {
        return (
            <a target="_blank" href={row.getValue('tiktokLink')} rel="noopener noreferrer">
                    <Image src='/template.jpg' alt='david' width={120} height={250} />
            </a>
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
            // <div className="text-center">
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                CreatedAt
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
            // </div>
          
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
]
