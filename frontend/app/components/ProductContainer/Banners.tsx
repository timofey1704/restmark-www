import React from 'react'
import ProductContainer from '../ProductContainer/ProductContainer'
import Link from 'next/link'
import { TitleItem } from '../../types/index'

const Banners = ({ titles }: { titles: TitleItem[] }) => {
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
