'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FaSave, FaTrash } from 'react-icons/fa'
import { Product, Collection, PhotoWithFile } from '@/app/types'
import DashboardNav from '../../components/dashboardNav/DashboardNav'

const EditProductPage = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [category, setCategory] = useState('')
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const router = useRouter()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${API_URL}/products/get`, {
          headers: {
            Authorization: token,
          },
        })
        setProducts(response.data)
      } catch (error) {
        console.error('Error fetching products:', error)
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          localStorage.removeItem('token')
          router.push('/login')
        }
      }
    }

    fetchProducts()
  }, [API_URL, router])

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product)
    setIsEditing(true)
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Product
  ) => {
    if (!selectedProduct) return
    setSelectedProduct({ ...selectedProduct, [field]: e.target.value })
  }

  const handleCollectionChange = (
    collectionIndex: number,
    field: keyof Collection,
    value: string | number
  ) => {
    if (!selectedProduct) return
    const updatedCollections = selectedProduct.collections.map(
      (collection, index) =>
        index === collectionIndex
          ? { ...collection, [field]: value }
          : collection
    )
    setSelectedProduct({ ...selectedProduct, collections: updatedCollections })
  }

  const handleFileChange = (
    collectionIndex: number,
    photoIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (file && selectedProduct) {
      const updatedCollections = [...selectedProduct.collections]
      const updatedPhotos = [
        ...updatedCollections[collectionIndex].photos,
      ] as PhotoWithFile[]
      updatedPhotos[photoIndex].file = file
      updatedCollections[collectionIndex].photos = updatedPhotos
      setSelectedProduct({
        ...selectedProduct,
        collections: updatedCollections,
      })
    }
  }

  const handleRemovePhoto = (collectionIndex: number, photoIndex: number) => {
    if (selectedProduct) {
      const updatedCollections = [...selectedProduct.collections]
      updatedCollections[collectionIndex].photos.splice(photoIndex, 1)
      setSelectedProduct({
        ...selectedProduct,
        collections: updatedCollections,
      })
    }
  }

  const handleAddPhoto = (collectionIndex: number) => {
    if (selectedProduct) {
      const updatedCollections = [...selectedProduct.collections]
      const newPhoto: PhotoWithFile = {
        id: Date.now(),
        filename: '',
        path: '',
        file: null,
      } // Create a new photo with a temporary ID
      updatedCollections[collectionIndex].photos.push(newPhoto)
      setSelectedProduct({
        ...selectedProduct,
        collections: updatedCollections,
      })
    }
  }

  const handleSaveChanges = async () => {
    if (!selectedProduct) return
    setIsLoading(true)
    try {
      const token = localStorage.getItem('token')
      const formData = new FormData()

      formData.append('title', selectedProduct.title)
      formData.append('category', category)

      selectedProduct.collections.forEach((collection, colIndex) => {
        formData.append(`collections[${colIndex}][name]`, collection.name)
        formData.append(
          `collections[${colIndex}][price]`,
          collection.price.toString()
        )

        collection.photos.forEach((photo, photoIndex) => {
          if (photo.file instanceof File) {
            formData.append(`collections[${colIndex}][photos][]`, photo.file)
          }
        })
      })

      await axios.put(`${API_URL}/products/${selectedProduct.id}`, formData, {
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data',
        },
      })

      setProducts(
        products.map((product) =>
          product.id === selectedProduct.id ? selectedProduct : product
        )
      )
      alert('Продукт успешно обновлен')
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating product:', error)
      alert('Ошибка при обновлении продукта')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4 bg-white">
      <DashboardNav />
      <h1 className="text-3xl font-bold mb-4">Изменить продукт</h1>
      {products.length > 0 ? (
        <ul className="space-y-4">
          {products.map((product) => (
            <li
              key={product.id}
              className={`border p-4 rounded-md shadow-sm cursor-pointer ${
                selectedProduct?.id === product.id ? 'bg-white' : ''
              }`}
              onClick={() => handleSelectProduct(product)}
            >
              <div className="flex justify-between">
                <div className="text-lg font-medium text-black">
                  Продукт - {product.title}
                </div>
              </div>

              {selectedProduct?.id === product.id && (
                <div className="mt-4">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-black">
                      Название продукта
                    </label>
                    <input
                      type="text"
                      value={selectedProduct.title}
                      onChange={(e) => handleInputChange(e, 'title')}
                      className="mt-1 block w-full rounded-md border-black text-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
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

                  {/* Коллекции */}
                  {selectedProduct.collections.map((collection, index) => (
                    <div key={collection.id} className="mb-4">
                      <h3 className="text-xl text-black font-bold">
                        Коллекция {collection.name}
                      </h3>
                      <label className="block text-sm font-medium text-gray-700">
                        Название коллекции
                      </label>
                      <input
                        type="text"
                        value={collection.name}
                        onChange={(e) =>
                          handleCollectionChange(index, 'name', e.target.value)
                        }
                        className="mt-1 block w-full rounded-md border-black shadow-sm text-black focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                      <label className="block text-sm font-medium text-gray-700">
                        Цена
                      </label>
                      <input
                        type="number"
                        value={collection.price}
                        onChange={(e) =>
                          handleCollectionChange(
                            index,
                            'price',
                            Number(e.target.value)
                          )
                        }
                        className="mt-1 block w-full rounded-md border-black text-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />

                      {/* Фотографии */}
                      {collection.photos.map((photo, photoIndex) => (
                        <div key={photo.id} className="mt-2">
                          <div className="flex items-center space-x-4">
                            {photo.path ? (
                              <Image
                                src={photo.path}
                                alt={photo.filename}
                                height={100}
                                width={100}
                                className="w-24 h-24 object-cover"
                                priority
                              />
                            ) : null}
                            <button
                              type="button"
                              onClick={() =>
                                handleRemovePhoto(index, photoIndex)
                              }
                              className="inline-flex items-center px-2 py-1 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700"
                            >
                              <FaTrash className="mr-1" /> Удалить
                            </button>
                          </div>

                          <input
                            type="file"
                            onChange={(e) =>
                              handleFileChange(index, photoIndex, e)
                            }
                            className="mt-2 block text-black"
                          />
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() => handleAddPhoto(index)}
                        className="mt-2 inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700"
                      >
                        Добавить фото
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={handleSaveChanges}
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Сохранение...' : 'Сохранить изменения'}
                    <FaSave className="ml-2" />
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-black">Нет продуктов</p>
      )}
    </div>
  )
}

export default EditProductPage
