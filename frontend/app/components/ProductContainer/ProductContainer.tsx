import React from 'react'
import { ProductDisplayProps } from '../../types/index'

const ProductContainer: React.FC<ProductDisplayProps> = ({
  title,
  img_url,
}) => {
  return (
    <div className="relative w-full max-w-sm h-64 bg-banners flex items-start justify-end">
      <div className="absolute top-0 right-0">
        <img src={img_url} alt={title} className="w-1/2 object-cover" />
      </div>

      <div className="absolute bottom-4 left-4 text-white text-4xl font-bold">
        {title}
      </div>
    </div>
  )
}

export default ProductContainer
