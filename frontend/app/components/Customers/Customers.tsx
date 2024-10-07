'use client'
import React, { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { Customer } from '@/app/types'

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([])
  // const API_URL = process.env.NEXT_PUBLIC_API_URL
  const API_URL = 'http://127.0.0.1:8000/api/v1'

  const fetchCustomers = useMemo(() => {
    return async () => {
      try {
        const response = await fetch(`${API_URL}/customers`)
        if (!response.ok) {
          throw new Error('Network response failed')
        }
        const data = await response.json()
        setCustomers(data.objects || [])
      } catch (error) {
        console.error('Error fetching customers:', error)
      }
    }
  }, [API_URL])

  useEffect(() => {
    fetchCustomers()
  }, [fetchCustomers])

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {customers.map((customer) => (
          <a
            key={customer.id}
            href={customer.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl no-underline"
          >
            <div className="flex items-center justify-center mb-4 text-4xl">
              <Image
                src={customer.img_url}
                alt={customer.customer_name}
                height={1078}
                width={565}
                className="rounded-lg object-cover"
                priority
              />
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default Customers
