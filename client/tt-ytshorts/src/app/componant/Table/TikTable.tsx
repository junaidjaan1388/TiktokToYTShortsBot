import { TTlink, columns } from "./columns"
import { DataTable } from "./data-table"
import axios from "axios"


async function getData(): Promise<TTlink[]> {
  // Fetch data from your API here.
  return axios(process.env.NEXT_PUBLIC_API_URL+'/GetWaitList').then((res)=>res.data)
    // ...
}

export default async function TikTable() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
