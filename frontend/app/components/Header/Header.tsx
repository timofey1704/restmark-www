import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import HeaderPhoto from '../../../public/images/White (Horizontal).png'

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-black">
      <div className="text-white">
        <Link href="/">
          <Image
            src={HeaderPhoto}
            alt="header logo"
            className="ml-20"
            priority
          />
        </Link>
      </div>
      <div className="flex flex-col text-white mr-20 ">
        <a href="tel:+375 44 790 9381" className="mr-9 hover:underline">
          +375 (44) 790-93-81
          <div className="text-red-400 cursor-pointer">Позвонить нам</div>
        </a>
      </div>
    </header>
  )
}
