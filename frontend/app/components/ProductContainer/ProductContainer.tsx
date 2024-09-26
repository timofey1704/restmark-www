import React from 'react'
import Image from 'next/image'
import { ProductDisplayProps } from '../../types/index'

const ProductContainer: React.FC<ProductDisplayProps> = ({
  title,
  img_url,
}) => {
  return (
    <div className="relative w-full h-64 mb-5 mr-5 bg-banners flex items-start justify-end shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl">
      <div className="absolute">
        <Image
          src={img_url}
          alt={title}
          height={1078}
          width={565}
          className="w-full h-full object-cover"
          priority
        />
      </div>

      <div className="absolute bottom-4 left-4 ml-3 mb-4 text-white font-unbounded text-2xl sm:text-4xl md:text-3xl lg:text-4xl">
        {title}
      </div>
    </div>
  )
}

export default ProductContainer
