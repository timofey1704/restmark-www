'use client'

import React, { useState } from 'react'
import axios from 'axios'
import DashboardNav from '@/app/components/dashboardNav/dashboardNav'

const AddProductPage = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL

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
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

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
    setIsLoading(true)
    setSuccessMessage('')
    try {
      await axios.post(`${API_URL}/products/create`, {
        title,
        country_prod: countryProd,
        category,
        collections,
      })
      setSuccessMessage('Product added successfully')

      // Reset form
      setTitle('')
      setCountryProd('')
      setCategory('')
      setCollections([
        {
          name: '',
          price: 0,
          discount_price: 0,
          photos: [{ filename: '', path: '' }],
        },
      ])
    } catch (error) {
      console.error('Error adding product:', error)
      alert('Failed to add product')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <DashboardNav />
      <h1 className="text-4xl font-bold mb-8 text-center">Добавить продукт</h1>
      {successMessage && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <span className="block sm:inline">{successMessage}</span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
        </div>
        <div>
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
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Коллекции</h2>
          {collections.map((collection, colIndex) => (
            <div
              key={colIndex}
              className="mb-6 border p-4 rounded-md bg-gray-50"
            >
              <h3 className="text-lg font-medium mb-2">
                Коллекция {colIndex + 1}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
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
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
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
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
              </div>
              <div className="mt-4">
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
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mt-4">
                <h4 className="text-md font-medium mb-2">Фотографии</h4>
                {collection.photos.map((photo, photoIndex) => (
                  <div key={photoIndex} className="mb-4 p-3 border rounded-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
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
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addPhoto(colIndex)}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Добавить фотографию
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addCollection}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            Добавить коллекцию
          </button>
        </div>
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full px-4 py-2 ${
              isLoading ? 'bg-gray-400' : 'bg-indigo-500 hover:bg-indigo-600'
            } text-white rounded-md transition-colors`}
          >
            {isLoading ? 'Сохранение...' : 'Сохранить продукт'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddProductPage
