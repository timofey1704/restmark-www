import React from 'react'
import ItemCard from '../../components/ItemCard/ItemCard'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import { fetchProducts } from '@/lib/fetchProducts'

const SearchPage = async ({ params }: { params: { category: string } }) => {
  const products = await fetchProducts()

  //фильтруем по категории
  const filteredProducts = products.filter(
    (product) => product.category === params.category
  )

  return (
    <div className="w-3/4 mx-auto">
      <Breadcrumbs category={params.category} />
      <h1 className="font-unbounded text-4xl sm:text-5xl md:text-6xl mt-5 text-center sm:text-left">
        Бренды
      </h1>

      <div className="min-h-screen bg-black text-white py-10">
        <div className="grid grid-cols-1">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ItemCard
                key={product.id}
                brandName={product.title}
                collections={product.collections}
                catalog_url={`${product.pdf}`}
              />
            ))
          ) : (
            <div className="text-center font-velasans text-2xl text-white">
              К сожалению, нам пока нечего вам предложить. Следите за
              объявлениями!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchPage
