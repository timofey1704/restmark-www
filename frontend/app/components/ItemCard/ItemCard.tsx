'use client'

import React, { useState } from 'react'

interface ItemCardProps {
  brandName: string
  collections: string[]
  img_url: React.ReactNode // Измените тип на React.ReactNode
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
        {/* Используйте компонент слайдера */}
        <div className="h-64 w-full mb-4 rounded-md">{img_url}</div>
        <h2 className="text-xl font-unbounded-variable font-bold">
          {brandName}
        </h2>
        <p className="text-sm font-fivo-sans mb-4">
          Выберите коллекцию или посмотрите каталог
        </p>
        <div className="flex flex-wrap font-fivo-sans gap-2">
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
        <button className="bg-black py-2 px-4 rounded-md mr-4 hover:bg-gray-700">
          Посмотреть коллекцию
        </button>
        <a
          href={catalog_url}
          className="bg-black py-2 px-4 rounded-md hover:bg-gray-700"
        >
          Каталог
        </a>
      </div>
    </div>
  )
}

export default ItemCard
