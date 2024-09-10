import React from 'react'
import ItemCard from '../../components/ItemCard/ItemCard'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import { Product } from '../../types'

async function fetchProducts(): Promise<Product[]> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'

  try {
    const res = await fetch(`${API_URL}/products`)
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    return res.json()
  } catch (error) {
    console.error('Error fetching data:', error)
    return []
  }
}

const SearchPage = async ({ params }: { params: { category: string } }) => {
  // получаем все продукты
  const products = await fetchProducts()

  // фильтруем продукты по категории
  const filteredProducts = products.filter(
    (product) => product.category === params.category
  )
  return (
    <>
      <Breadcrumbs category={params.category} />
      <h1 className="font-bold font-unbounded-variable text-6xl ml-24 mt-5">
        Бренды
      </h1>

      <div className="min-h-screen bg-black text-white py-10">
        <div className="container px-4">
          <div className="grid grid-cols-1">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => {
                const collections = product.collections.map((col) => col.name)
                const img_urls = product.collections.flatMap((col) =>
                  col.photos.map((photo) => photo.path)
                )

                return (
                  <ItemCard
                    key={product.id}
                    brandName={product.title}
                    collections={product.collections}
                    catalog_url={`/products/${product.id}`}
                  />
                )
              })
            ) : (
              <div className="text-center font-fivo-sans text-2xl text-white">
                К сожалению, нам пока нечего вам предложить. Следите за
                объявлениями!
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default SearchPage
