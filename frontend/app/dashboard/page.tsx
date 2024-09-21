'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Dashboard = () => {
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token')
      if (!token) {
        router.push('/login')
      }
    }

    checkAuth()
  }, [router])

  return (
    <>
      <h1 className="text-white text-5xl p-5">Доступный функционал:</h1>
      <div className="flex flex-row">
        <Link href={'/dashboard/add-product'}>
          <button className=" bg-white text-black rounded-xl text-2xl p-5 ml-4 mt-4 hover:underline">
            Добавить продукт
          </button>
        </Link>

        <Link href={'/dashboard/edit-product'}>
          <div className=" bg-white text-black rounded-xl text-2xl p-5 ml-4 mt-4 hover:underline">
            Редактировать продукт
          </div>
        </Link>

        <Link href={'/dashboard/delete-product'}>
          <div className=" bg-white text-black rounded-xl text-2xl p-5 ml-4 mt-4 hover:underline">
            Удалить продукт
          </div>
        </Link>
      </div>
    </>
  )
}

export default Dashboard
