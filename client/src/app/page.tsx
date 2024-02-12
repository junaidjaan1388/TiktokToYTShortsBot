import Image from 'next/image'
import { Nav } from './componant/Nav'
import { Header } from './componant/Header'
import Footer from './componant/Footer'
import TikTable from './componant/Table/TikTable'

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
