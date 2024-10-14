import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import HeaderLogo from '../../../public/images/header_logo.png'

export default function Header() {
  return (
    <header className="flex flex-col sm:flex-row items-center justify-between py-4 w-3/4 mx-auto bg-black">
      <div className="text-white mb-4 sm:mb-0">
        <Link href="/">
          <Image
            src={HeaderLogo}
            alt="header logo"
            className="w-64 sm:w-48 md:w-64 "
            priority
          />
        </Link>
      </div>
      <div className="hidden md:flex flex-col text-white ">
        <a
          href="tel:+375 44 790 9381"
          className="hover:underline font-velasans text-lg sm:text-lg md:text-lg lg:text-lg 2xl:text-xl text-center sm:text-right"
        >
          +375 (44) 790-93-81
          <div className="font-velasans text-lg sm:text-lg md:text-lg lg:text-lg 2xl:text-2xl cursor-pointer">
            Позвонить нам
          </div>
        </a>
      </div>
    </header>
  )
}
