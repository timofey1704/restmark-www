import React from 'react'
import ItemCard from '../../components/ItemCard/ItemCard'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'

interface Photo {
  id: number
  filename: string
  path: string
}

interface Collection {
  id: number
  name: string
  price: number
  discount_price: number
  discount_percent: number
  photos: Photo[]
}

interface Product {
  id: number
  title: string
  country_prod: string
  collections: Collection[]
}

interface SearchPageProps {
  category: string
  products: Product[]
}

// Function to fetch data from the API
async function fetchProducts(category: string): Promise<Product[]> {
  try {
    const res = await fetch(`http://localhost:4000/api/products`)
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
  const products = await fetchProducts(params.category)

  return (
    <>
      <Breadcrumbs category={params.category} />
      <h1 className="font-bold font-unbounded-variable text-6xl ml-24 mt-5">
        Бренды
      </h1>

      <div className="min-h-screen bg-black text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => {
              // Flatten collections and photos for simplicity
              const collections = product.collections.map((col) => col.name)
              const img_urls = product.collections.flatMap((col) =>
                col.photos.map((photo) => photo.path)
              )

              return (
                <ItemCard
                  key={product.id}
                  brandName={product.title}
                  collections={collections}
                  img_url={img_urls}
                  catalog_url={`/products/${product.id}`}
                />
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default SearchPage
