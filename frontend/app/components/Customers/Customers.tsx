'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Customer } from '@/app/types'

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([])
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/customers`)
        setCustomers(response.data)
      } catch (error) {
        console.error('Error fetching customers', error)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="mt-2 text-3xl font-unbounded-variable tracking-tight text-center mb-8 text-white sm:text-4xl">
        Нам доверяют такие компании как
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {customers.map((customer) => (
          <a
            key={customer.id}
            href={customer.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl no-underline"
          >
            <div className="flex items-center justify-center mb-4 text-4xl">
              <img
                src={customer.img_url}
                alt={customer.customer_name}
                className="rounded-lg object-cover"
              />
            </div>

            <div className="text-xl text-center font-semibold mb-4 text-black">
              {customer.customer_name}
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default Customers
