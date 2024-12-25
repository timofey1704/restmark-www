import React from 'react'
import ItemCard from '../../components/ItemCard/ItemCard'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import { fetchProducts } from '@/lib/fetchProducts'
import { Metadata } from 'next'

const categoryDict: { [key: string]: string } = {
  steklo: 'Стекло',
  inventar: 'Инвентарь',
  bar: 'Бар',
  sales: 'Акции',
  farfor: 'Фарфор',
  'stolovie-pribori': 'Столовые приборы',
}

// генерируем метаданные динамически
export async function generateMetadata({
  params,
}: {
  params: { category: string }
}): Promise<Metadata> {
  const readableCategory = categoryDict[params.category] || params.category // получаем категорию из урла и форматируем, если такая есть в словаре

  return {
    title: `Restmark - Предлагаем Вам лучшие товары в категории ${readableCategory}`,
    description:
      'Свяжитесь с нами для покупки и оснащения ресторанов, баров и кафе в Беларуси.',
    keywords: [
      readableCategory,
      'Рестораны',
      'Оборудование для кафе',
      'Оснащение баров',
      'Покупка для ресторанов',
    ],

    openGraph: {
      title: `Restmark - Предлагаем Вам лучшие товары в категории ${readableCategory}`,
      description:
        'Свяжитесь с нами для покупки и оснащения ресторанов, баров и кафе в Беларуси.',
      url: `https://restmark.by/search/${params.category}`,
      siteName: 'Restmark',
      images: [
        {
          url: 'https://i.ibb.co/gmqzzmb/header-logo-mod-1200x630.png',
          width: 1200,
          height: 630,
          alt: 'Restmark Logo',
        },
      ],
      locale: 'ru_RU',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Restmark - Предлагаем Вам лучшие товары в категории ${readableCategory}`,
      description:
        'Свяжитесь с нами для покупки и оснащения ресторанов, баров и кафе в Беларуси.',
      images: [
        {
          url: 'https://i.ibb.co/gmqzzmb/header-logo-mod-1200x630.png',
          width: 1200,
          height: 630,
          alt: 'Restmark Logo',
        },
      ],
    },
    alternates: {
      canonical: `https://restmark.by/search/${params.category}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

const SearchPage = async ({ params }: { params: { category: string } }) => {
  const products = await fetchProducts()

  //фильтруем по категории
  const filteredProducts = products.filter(
    (product) => product.category === params.category
  )

  return (
    <div className="w-3/4 mx-auto">
      <Breadcrumbs category={params.category} />
      <h1 className="font-unbounded text-4xl sm:text-5xl md:text-6xl mt-5">
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
