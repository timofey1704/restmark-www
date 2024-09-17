'use client'
import React, { useState } from 'react'
import ImageSlider from '../ImagesSlider/ImagesSlider'
import { ItemCardProps, Collection } from '../../types'

const ItemCard: React.FC<ItemCardProps> = ({
  brandName,
  collections,
  catalog_url,
}) => {
  const [selectedCollection, setSelectedCollection] = useState<Collection>(
    collections[0]
  )

  const defaultImageUrl = 'https://i.ibb.co/7tvdz4K/no-photo.png'
  const imageUrls = selectedCollection.photos.length
    ? selectedCollection.photos.map((photo) => photo.path)
    : [defaultImageUrl]

  return (
    <div className="bg-banners text-white py-4 pl-4 rounded-2xl shadow-md flex">
      <div className="flex-none w-3/5 h-auto rounded-md overflow-hidden">
        <ImageSlider images={imageUrls} />
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
            {collections.map((collection) => (
              <label
                key={collection.id}
                className="flex items-center cursor-pointer"
              >
                <input
                  type="radio"
                  name="collection"
                  checked={selectedCollection.id === collection.id}
                  onChange={() => setSelectedCollection(collection)}
                  className="mr-2"
                />
                {collection.name}
              </label>
            ))}
          </div>
        </div>

        <div className="flex">
          <button className="border py-4 px-6 rounded-md mr-10 hover:bg-gray-700">
            Посмотреть коллекцию
          </button>
          <a
            href={catalog_url}
            className="border py-4 px-6 rounded-md hover:bg-gray-700 flex justify-center items-center"
          >
            Каталог
          </a>
        </div>
      </div>
    </div>
  )
}

export default ItemCard
