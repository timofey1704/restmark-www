'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FaTrash } from 'react-icons/fa'
import DashboardNav from '../../components/dashboardNav/DashboardNav'

const DeleteProductPage = () => {
  const [products, setProducts] = useState<any[]>([])
  const router = useRouter()
  const API_URL = process.env.NEXT_PUBLIC_API_URL

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

  const handleDelete = async (id: number) => {
    if (confirm('Вы уверены, что хотите удалить этот продукт?')) {
      try {
        const token = localStorage.getItem('token')
        await axios.delete(`${API_URL}/products/${id}`, {
          headers: {
            Authorization: token,
          },
        })
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
      <DashboardNav />
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
