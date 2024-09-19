'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductContainer from '../ProductContainer/ProductContainer'
import Link from 'next/link'
import { TitleItem } from '../../types/index'

const Banners = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'
  const [titles, setTitles] = useState<TitleItem[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/banners`)

        setTitles(data)
      } catch (error) {
        console.error('Error fetching titles:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {titles.map((item: TitleItem, index: number) => (
        <Link href={`/search${item.url}`} key={index}>
          <ProductContainer title={item.title} img_url={item.img_url} />
        </Link>
      ))}
    </div>
  )
}

export default Banners
