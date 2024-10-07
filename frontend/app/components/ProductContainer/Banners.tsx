'use client'

import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import ProductContainer from '../ProductContainer/ProductContainer'
import Link from 'next/link'
import { TitleItem } from '../../types/index'

const Banners = () => {
  const [titles, setTitles] = useState<TitleItem[]>([])
  // const API_URL = process.env.NEXT_PUBLIC_API_URL

  const API_URL = 'http://127.0.0.1:8000/api/v1'

  const fetchBanners = useMemo(() => {
    return async () => {
      try {
        const response = await fetch(`${API_URL}/banners`)
        if (!response.ok) {
          throw new Error('Network response failed')
        }
        const data = await response.json()
        setTitles(data.objects || [])
      } catch (error) {
        console.error('Error fetching banners:', error)
      }
    }
  }, [API_URL])

  useEffect(() => {
    fetchBanners()
  }, [fetchBanners])

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
