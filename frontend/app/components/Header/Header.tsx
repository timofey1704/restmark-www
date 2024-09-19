import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import HeaderPhoto from '../../../public/images/White (Horizontal).png'

export default function Header() {
  return (
    <header className="flex flex-col sm:flex-row items-center justify-between p-4 bg-black">
      <div className="text-white mb-4 sm:mb-0">
        <Link href="/">
          <Image
            src={HeaderPhoto}
            alt="header logo"
            className="w-64 sm:w-48 md:w-64 sm:ml-4 md:ml-20"
            priority
          />
        </Link>
      </div>
      <div className="hidden md:flex flex-col text-white sm:mr-4 md:mr-20">
        <a
          href="tel:+375 44 790 9381"
          className="hover:underline text-center sm:text-right"
        >
          +375 (44) 790-93-81
          <div className="text-red-400 cursor-pointer">Позвонить нам</div>
        </a>
      </div>
    </header>
  )
}
