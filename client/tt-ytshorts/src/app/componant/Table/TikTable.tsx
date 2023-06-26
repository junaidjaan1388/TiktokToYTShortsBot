import { TTlink, columns } from "./columns"
import { DataTable } from "./data-table"


async function getData(): Promise<TTlink[]> {
  // Fetch data from your API here.
  const res =   await fetch(process.env.NEXT_PUBLIC_API_URL+'/GetWaitList', { cache: 'no-store' });
  return res.json();
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
