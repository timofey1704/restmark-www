'use client'

import React, { useState } from 'react'
import axios from 'axios'

const AddProductPage = () => {
  const [title, setTitle] = useState('')
  const [countryProd, setCountryProd] = useState('')
  const [category, setCategory] = useState('')
  const [collections, setCollections] = useState([
    {
      name: '',
      price: 0,
      discount_price: 0,
      photos: [{ filename: '', path: '' }],
    },
  ])

  const handleCollectionChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedCollections = [...collections]
    // @ts-ignore
    updatedCollections[index][field] = value
    setCollections(updatedCollections)
  }

  const handlePhotoChange = (
    colIndex: number,
    photoIndex: number,
    field: string,
    value: string
  ) => {
    const updatedCollections = [...collections]
    // @ts-ignore
    updatedCollections[colIndex].photos[photoIndex][field] = value
    setCollections(updatedCollections)
  }

  const addCollection = () => {
    setCollections([
      ...collections,
      {
        name: '',
        price: 0,
        discount_price: 0,
        photos: [{ filename: '', path: '' }],
      },
    ])
  }

  const addPhoto = (index: number) => {
    const updatedCollections = [...collections]
    updatedCollections[index].photos.push({ filename: '', path: '' })
    setCollections(updatedCollections)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.post('/api/products/create', {
        title,
        country_prod: countryProd,
        category,
        collections,
      })
      alert('Product added successfully')
    } catch (error) {
      console.error('Error adding product:', error)
      alert('Failed to add product')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Добавить продукт</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Название
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="country_prod"
            className="block text-sm font-medium text-gray-700"
          >
            Страна производства
          </label>
          <input
            type="text"
            id="country_prod"
            value={countryProd}
            onChange={(e) => setCountryProd(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Категория
          </label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Коллекции</h2>
          {collections.map((collection, colIndex) => (
            <div key={colIndex} className="mb-4 border p-4 rounded-md">
              <div className="mb-4">
                <label
                  htmlFor={`collection_name_${colIndex}`}
                  className="block text-sm font-medium text-gray-700"
                >
                  Название коллекции
                </label>
                <input
                  type="text"
                  id={`collection_name_${colIndex}`}
                  value={collection.name}
                  onChange={(e) =>
                    handleCollectionChange(colIndex, 'name', e.target.value)
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor={`collection_price_${colIndex}`}
                  className="block text-sm font-medium text-gray-700"
                >
                  Цена
                </label>
                <input
                  type="number"
                  id={`collection_price_${colIndex}`}
                  value={collection.price}
                  onChange={(e) =>
                    handleCollectionChange(colIndex, 'price', +e.target.value)
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor={`collection_discount_price_${colIndex}`}
                  className="block text-sm font-medium text-gray-700"
                >
                  Цена со скидкой
                </label>
                <input
                  type="number"
                  id={`collection_discount_price_${colIndex}`}
                  value={collection.discount_price}
                  onChange={(e) =>
                    handleCollectionChange(
                      colIndex,
                      'discount_price',
                      +e.target.value
                    )
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Фотографии</h3>
                {collection.photos.map((photo, photoIndex) => (
                  <div key={photoIndex} className="mb-4">
                    <div className="mb-2">
                      <label
                        htmlFor={`photo_filename_${colIndex}_${photoIndex}`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        Имя файла
                      </label>
                      <input
                        type="text"
                        id={`photo_filename_${colIndex}_${photoIndex}`}
                        value={photo.filename}
                        onChange={(e) =>
                          handlePhotoChange(
                            colIndex,
                            photoIndex,
                            'filename',
                            e.target.value
                          )
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={`photo_path_${colIndex}_${photoIndex}`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        Путь
                      </label>
                      <input
                        type="text"
                        id={`photo_path_${colIndex}_${photoIndex}`}
                        value={photo.path}
                        onChange={(e) =>
                          handlePhotoChange(
                            colIndex,
                            photoIndex,
                            'path',
                            e.target.value
                          )
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addPhoto(colIndex)}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Добавить фотографию
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addCollection}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Добавить коллекцию
          </button>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
        >
          Сохранить продукт
        </button>
      </form>
    </div>
  )
}

export default AddProductPage
