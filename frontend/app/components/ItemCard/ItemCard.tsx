'use client'

import React, { useState } from 'react'

interface ItemCardProps {
  brandName: string
  collections: string[]
  img_url: React.ReactNode
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
    <div className="bg-banners text-white py-4 pl-4 rounded-2xl shadow-md flex">
      <div className="flex-none w-3/5 h-auto rounded-md overflow-hidden">
        {img_url}
      </div>

      <div className="flex flex-col flex-grow ml-8 justify-between">
        <div>
          <h2 className="text-5xl font-unbounded-variable font-bold">
            {brandName}
          </h2>
          <p className="text-base font-thin font-fivo-sans my-3">
            Выберите коллекцию или посмотрите каталог
          </p>
          <div className="grid grid-cols-2 text-base font-thin font-fivo-sans gap-2 mb-4">
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

        <div className="flex">
          <button className="bg-black py-2 px-4 rounded-md mr-10 hover:bg-gray-700">
            Посмотреть коллекцию
          </button>
          <a
            href={catalog_url}
            className="bg-black py-2 px-4 rounded-md hover:bg-gray-700 flex justify-center items-center"
          >
            Каталог
          </a>
        </div>
      </div>
    </div>
  )
}

export default ItemCard
