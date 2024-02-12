
'use client';
import { MoonLoader } from "react-spinners"

function LoadingTable() {
  return (
    <div className="container mx-auto py-10 flex justify-center items-center">
    <MoonLoader
      color="#e122ac"
      loading
    />
    </div>
  )
}

export default LoadingTable