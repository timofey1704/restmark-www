'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductContainer from '../ProductContainer/ProductContainer'
import { TitleItem } from '../../types/index'

const Banners = () => {
  const [titles, setTitles] = useState<TitleItem[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          'http://localhost:4000/api/products/banners'
        )

        setTitles(
          data.map((item: TitleItem) => ({
            title: item.title,
            img_url: item.img_url,
          }))
        )
      } catch (error) {
        console.error('Error fetching titles:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      {titles.map((item: TitleItem, index: number) => (
        <ProductContainer
          key={index}
          title={item.title}
          img_url={item.img_url}
        />
      ))}
    </div>
  )
}

export default Banners
