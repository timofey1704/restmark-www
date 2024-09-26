'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { Customer } from '@/app/types'

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([])
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/customers`)
        setCustomers(response.data)
      } catch (error) {
        console.error('Error fetching customers', error)
      }
    }
    if (API_URL) {
      fetchData()
    }
  }, [API_URL])

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
