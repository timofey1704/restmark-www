'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DashboardNav from '../components/dashboardNav/dashboardNav'

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
      <DashboardNav />
    </>
  )
}

export default Dashboard
