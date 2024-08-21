import React from 'react'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <Link href="/">
        <h1 className="text-3xl font-bold ml-5">RestMark</h1>
      </Link>
    </header>
  )
}
