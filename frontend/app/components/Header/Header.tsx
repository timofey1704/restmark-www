import React from 'react'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-800">
      <div className="text-white">
        <Link href="/">
          <h1 className="text-3xl font-bold ml-5">RestMark</h1>
        </Link>
      </div>
      <div className="text-white  mr-4">
        <a href="tel:+37544790-93-81" className="hover:underline">
          +375 (44) 790-93-81
        </a>
      </div>
    </header>
  )
}
