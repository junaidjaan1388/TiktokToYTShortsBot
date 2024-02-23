import Image from 'next/image'
import { Nav } from './componant/Nav'
import { Header } from './componant/Header'
import Footer from './componant/Footer'
import TikTable from './componant/Table/TikTable'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Terminal } from 'lucide-react'

export default function Home() {
  return (
    <>
    <div className="bg-gray-900  h-full">
        <Nav />  
        <Header />
          <TikTable />
        <Footer />
    </div>
      
    
 </>
      )
}
