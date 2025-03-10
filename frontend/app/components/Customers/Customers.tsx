import React from 'react'
import Image from 'next/image'
import { CustomersProps } from '@/app/types'

const Customers = ({ customers }: CustomersProps) => {
  return (
    <div className="w-full mx-auto px-4 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {customers &&
          customers.length > 0 &&
          customers.map((customer) => (
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
                  className="rounded-lg w-auto h-auto object-cover"
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
