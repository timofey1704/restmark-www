'use client'

import React, { useState } from 'react'

interface ItemCardProps {
  brandName: string
  collections: string[]
  img_url: string[]
  catalog_url: string
}

const ItemCard: React.FC<ItemCardProps> = ({
  brandName,
  collections,
  img_url,
  catalog_url,
}) => {
  const [selectedCollection, setSelectedCollection] = useState<string>(
    collections[0]
  )

  return (
    <div className="bg-banners text-white p-6 max-w-md mx-auto rounded-md shadow-md">
      <div className="mb-6">
        {/* Display the first image from img_url array */}
        {img_url.length > 0 && (
          <img
            src={img_url[0]}
            alt={`${brandName} image`}
            className="h-64 w-full object-cover mb-4 rounded-md"
          />
        )}
        <h2 className="text-xl font-unbounded-variable font-bold">
          {brandName}
        </h2>
        <p className="text-sm font-fivo-sans mb-4">
          Выберите коллекцию или посмотрите каталог
        </p>
        <div className="flex flex-wrap gap-2">
          {collections.map((collection, index) => (
            <label key={index} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="collection"
                checked={selectedCollection === collection}
                onChange={() => setSelectedCollection(collection)}
                className="mr-2"
              />
              {collection}
            </label>
          ))}
        </div>
      </div>
      <div className="flex justify-between">
        <button className="bg-gray-800 py-2 px-4 rounded-md hover:bg-gray-700">
          Посмотреть коллекцию
        </button>
        <a
          href={catalog_url}
          className="bg-gray-800 py-2 px-4 rounded-md hover:bg-gray-700"
        >
          Каталог
        </a>
      </div>
    </div>
  )
}

export default ItemCard
