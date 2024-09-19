'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaTrash } from 'react-icons/fa'

const DeleteProductPage = () => {
  const [products, setProducts] = useState<any[]>([])
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('${API_URL}/items')
        setProducts(response.data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProducts()
  }, [])

  const handleDelete = async (id: number) => {
    if (confirm('Вы уверены, что хотите удалить этот продукт?')) {
      try {
        await axios.delete(`${API_URL}/products/${id}`)
        setProducts(products.filter((product) => product.id !== id))
        alert('Продукт удален успешно')
      } catch (error) {
        console.error('Error deleting product:', error)
        alert('Ошибка при удалении продукта')
      }
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Удалить продукт</h1>
      {products.length > 0 ? (
        <ul className="space-y-4">
          {products.map((product) => (
            <li
              key={product.id}
              className="flex items-center justify-between border p-4 rounded-md shadow-sm"
            >
              <div className="text-lg font-medium">{product.title}</div>
              <button
                onClick={() => handleDelete(product.id)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash size={20} />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center text-lg text-gray-500">
          Нет продуктов для удаления.
        </div>
      )}
    </div>
  )
}

export default DeleteProductPage
