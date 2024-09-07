'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaEdit, FaSave } from 'react-icons/fa'
import { Product, Collection } from '@/app/types'

const EditProductPage = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isEditing, setIsEditing] = useState<boolean>(false)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/products')
        setProducts(response.data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProducts()
  }, [])

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
      await axios.put(`/api/products/${selectedProduct.id}`, selectedProduct)
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
    <div className="container mx-auto p-4">
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
                <FaEdit />
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
                      className="mt-1 block w-full rounded-md border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-black focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                      {/* Фотографии */}
                      {collection.photos.map((photo) => (
                        <div key={photo.id} className="mt-2">
                          <img
                            src={photo.path}
                            alt={photo.filename}
                            className="w-32 h-32 object-cover"
                          />
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
