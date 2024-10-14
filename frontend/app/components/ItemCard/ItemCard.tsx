'use client'
import React, { useState } from 'react'
import ImageSlider from '../ImagesSlider/ImagesSlider'
import { ItemCardProps, Collection } from '../../types'
import CallButton from '../LeadPopup/CallButton'

const ItemCard: React.FC<ItemCardProps> = ({
  brandName,
  collections,
  catalog_url,
}) => {
  const [selectedCollection, setSelectedCollection] = useState<Collection>(
    collections[0]
  )

  const defaultImageUrl = 'https://i.ibb.co/jyNWgb5/image-2.webp'

  // Проверяем, что selectedCollection существует и имеет свойство photos
  const imageUrls = selectedCollection?.photos?.length
    ? selectedCollection.photos.map((photo) => photo.path)
    : [defaultImageUrl]

  return (
    <div className="bg-banners text-white py-4 rounded-2xl shadow-md flex flex-col md:flex-row">
      <div className="relative w-full md:w-3/5 aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden mb-4 md:mb-0 flex-none">
        <ImageSlider images={imageUrls} />

        {/* Проверка на наличие selectedCollection и его фотографий */}
        {(!selectedCollection ||
          !selectedCollection.photos ||
          selectedCollection.photos.length === 0) && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
            <span className="text-white text-center font-velasans text-opacity-70 text-sm sm:text-base md:text-xl">
              Фотографии коллекции еще не загружены.
            </span>
            <span className="text-white text-center font-velasans text-opacity-70 text-sm sm:text-base md:text-xl">
              Пожалуйста, <CallButton text="свяжитесь с нами" /> и мы вышлем
              фото Вам на почту.
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-grow md:ml-8 justify-between">
        <div>
          <h2 className="text-3xl md:text-4xl 2xl:text-5xl font-unbounded font-bold mb-4 pl-1 sm:pl-2">
            {brandName}
          </h2>
          <p className="text-base font-thin font-velasans my-3 pl-1 sm:pl-2">
            Выберите коллекцию или посмотрите каталог
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 text-base font-thin font-velasans gap-2 mb-4 pl-1 sm:pl-2">
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

        <div className="flex flex-col sm:flex-row gap-4">
          <button className="border py-2 px-4 rounded-md hover:bg-gray-700 w-full sm:w-auto">
            Посмотреть коллекцию
          </button>
          <a
            href={catalog_url}
            className="border py-2 px-4 rounded-md hover:bg-gray-700 flex justify-center items-center w-full sm:w-auto"
          >
            Каталог
          </a>
        </div>
      </div>
    </div>
  )
}

export default ItemCard
