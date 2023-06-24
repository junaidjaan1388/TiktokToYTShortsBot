import Image from 'next/image'
import { Nav } from './componant/Nav'
import { Header } from './componant/Header'
import Footer from './componant/Footer'

export default function Home() {
  return (
    <>
    <div className="bg-gray-900  h-screen">
        <Nav />  
        <Header />
        <Footer />
    </div>
      
    
 </>
      )
}
