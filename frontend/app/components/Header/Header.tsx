import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import HeaderPhoto from '../../../public/images/White (Horizontal).png'

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-black">
      <div className="text-white">
        <Link href="/">
          <Image src={HeaderPhoto} alt="header logo" className="ml-8" />
        </Link>
      </div>
      <div className="flex flex-col text-white  mr-4">
        <a href="tel:+375 44 790 9381" className="mr-9 hover:underline">
          +375 (44) 790-93-81
        </a>
        <div>Заказать звонок</div>
      </div>
    </header>
  )
}
