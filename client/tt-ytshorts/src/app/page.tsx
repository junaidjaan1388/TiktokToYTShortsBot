import Image from 'next/image'
import { Nav } from './componant/Nav'
import { Header } from './componant/Header'

export default function Home() {
  return (
    <>
    <div className="bg-gray-900 min-h-screen">
        <Nav />  
        <Header />
    </div>
      
    
 </>
      )
}
