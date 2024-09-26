'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FaSave } from 'react-icons/fa'
import { Product, Collection } from '@/app/types'
import DashboardNav from '../../components/dashboardNav/DashboardNav'

const EditProductPage = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isEditing, setIsEditing] = useState<boolean>(false)
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
  }, [API_URL])

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product)
    setIsEditing(false)
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Product
  ) => {
    if (!selectedProduct) return

    setSelectedProduct({
      ...selectedProduct,
      [field]: e.target.value,
    })
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

    setSelectedProduct({
      ...selectedProduct,
      collections: updatedCollections,
    })
  }

  const handleSaveChanges = async () => {
    if (!selectedProduct) return

    try {
      const token = localStorage.getItem('token')
      const API_URL = process.env.NEXT_PUBLIC_API_URL
      await axios.put(
        `${API_URL}/products/${selectedProduct.id}`,
        selectedProduct,
        {
          headers: {
            Authorization: token,
          },
        }
      )
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
                      {collection.photos.map((photo) => (
                        <div key={photo.id} className="mt-2">
                          <Image
                            src={photo.path}
                            alt={photo.filename}
                            height={1078}
                            width={565}
                            className="w-32 h-32 object-cover"
                            priority
                          />

                          {/* <img
                            src={photo.path}
                            alt={photo.filename}
                            className="w-32 h-32 object-cover"
                          /> */}
                        </div>
                      ))}
                    </div>
                  ))}

                  <button
                    onClick={handleSaveChanges}
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <FaSave className="mr-2" /> Сохранить изменения
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center text-lg text-gray-500">
          Нет продуктов для редактирования.
        </div>
      )}
    </div>
  )
}

export default EditProductPage
