'use client'

import React, { useState } from 'react'
import axios from 'axios'
import DashboardNav from '../../components/dashboardNav/DashboardNav'

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
      photos: [{ file: null as File | null }],
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

  const handleFileChange = (
    colIndex: number,
    photoIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      const updatedCollections = [...collections]
      updatedCollections[colIndex].photos[photoIndex].file = file // сохраняем сам файл
      setCollections(updatedCollections)
    }
  }

  const handleRemovePhoto = (colIndex: number, photoIndex: number) => {
    const updatedCollections = [...collections]
    updatedCollections[colIndex].photos[photoIndex].file = null
    setCollections(updatedCollections)
  }

  const handleAddPhoto = (colIndex: number) => {
    const updatedCollections = [...collections]
    updatedCollections[colIndex].photos.push({ file: null }) // Добавляем фото с file: null
    setCollections(updatedCollections)
  }

  const addCollection = () => {
    setCollections([
      ...collections,
      {
        name: '',
        price: 0,
        discount_price: 0,
        photos: [{ file: null }],
      },
    ])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setSuccessMessage('')
    try {
      const token = localStorage.getItem('token')

      // Создаем объект FormData для отправки данных и файлов
      const formData = new FormData()
      formData.append('title', title)
      formData.append('country_prod', countryProd)
      formData.append('category', category)

      // Добавляем коллекции и файлы в FormData
      collections.forEach((collection, index) => {
        formData.append(`collections[${index}][name]`, collection.name)
        formData.append(
          `collections[${index}][price]`,
          collection.price.toString()
        )
        formData.append(
          `collections[${index}][discount_price]`,
          collection.discount_price.toString()
        )

        // Добавляем файлы в коллекцию
        if (collection.photos) {
          collection.photos.forEach((photo, photoIndex) => {
            if (photo.file) {
              formData.append(`collections[${index}][photos][]`, photo.file)
            }
          })
        }
      })

      // Отправляем запрос с FormData
      await axios.post(`${API_URL}/products/create`, formData, {
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data',
        },
      })

      setSuccessMessage('Product added successfully')

      // Сброс формы
      setTitle('')
      setCountryProd('')
      setCategory('')
      setCollections([
        {
          name: '',
          price: 0,
          discount_price: 0,
          photos: [{ file: null }],
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
              className="mt-1 block w-full border border-gray-300 text-black rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
              className="mt-1 block w-full border border-gray-300 text-black rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
            className="mt-1 block w-full border border-gray-300 text-black rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                    className="mt-1 block w-full border border-gray-300 text-black rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                    className="mt-1 block w-full border border-gray-300 text-black rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                  className="mt-1 block w-full border border-gray-300 text-black rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                          Фотографии
                        </label>
                        <input
                          type="file"
                          id={`photo_filename_${colIndex}_${photoIndex}`}
                          onChange={(e) =>
                            handleFileChange(colIndex, photoIndex, e)
                          }
                          className="mt-1 block w-full border border-gray-300 text-black rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {photo.file?.name && (
                          <div className="flex items-center mt-2">
                            <span className="text-sm">{photo.file?.name}</span>
                            <button
                              type="button"
                              onClick={() =>
                                handleRemovePhoto(colIndex, photoIndex)
                              }
                              className="ml-2 text-red-500 text-sm hover:text-red-700"
                            >
                              Удалить
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddPhoto(colIndex)}
                  className="text-indigo-500 hover:text-indigo-700 mt-2"
                >
                  Добавить фотографию
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addCollection}
            className="text-indigo-500 hover:text-indigo-700"
          >
            Добавить коллекцию
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={isLoading}
        >
          {isLoading ? 'Добавление...' : 'Добавить продукт'}
        </button>
      </form>
    </div>
  )
}

export default AddProductPage
