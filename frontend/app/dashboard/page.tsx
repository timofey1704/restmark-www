'use client'

import React from 'react'
import Link from 'next/link'

const page = () => {
  return (
    <>
      <h1 className="text-white text-5xl p-5">Доступный функционал:</h1>

      <Link href={'/dashboard/add-product'}>
        <div className=" text-white  text-4xl p-5 hover:underline">
          Добавить продукт
        </div>
      </Link>

      <Link href={'/dashboard/edit-product'}>
        <div className=" text-white  text-4xl p-5 hover:underline">
          Редактировать продукт
        </div>
      </Link>

      <Link href={'/dashboard/delete-product'}>
        <div className=" text-white  text-4xl p-5 hover:underline">
          Удалить продукт
        </div>
      </Link>
    </>
  )
}

export default page
