import { Github, Twitter } from "lucide-react"
import Image from "next/image"

function Footer() {
  return (
    <footer className="text-gray-400 bg-gray-900 body-font ">
  <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
    <a className="flex title-font font-medium items-center md:justify-start justify-center text-white">
           <Image
                    src="./tik_black_bg.svg"
                    width={150}
                    height={60}
                    alt="Tik to Shorts logo"
                />
    </a>
    <p className="text-sm text-gray-400 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-800 sm:py-2 sm:mt-0 mt-4">© 2023 Tik To Shorts —
      <a href="https://twitter.com/3IMXXD" className="text-gray-500 ml-1" target="_blank" rel="noopener noreferrer">@3IMXXD</a>
    </p>
    <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
      
      <a className="ml-3 text-gray-400">
        <Twitter className="w-h h-5"/>
      </a>
      
      <a className="ml-3 text-gray-400">
        <Github className="w-5 h-5"/>
      </a>
    </span>
  </div>
</footer>
  )
}

export default Footer