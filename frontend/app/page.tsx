import React from 'react'
import Banners from './components/ProductContainer/Banners'
import Customers from './components/Customers/Customers'

const Home = () => {
  return (
    <main className="px-4 sm:px-6 lg:px-8">
      <div className=" font-unbounded-variable text-3xl sm:text-4xl md:text-4xl lg:text-5xl mb-4">
        <p>Комплексное оснащение</p>
        <p>ресторанов, баров и гостинниц</p>
      </div>

      <div className="py-1 font-fivo-sans font-thin text-gray-300 text-opacity-80 text-base lg:text-lg sm:text-sm">
        Мы помогаем реализовывать Ваши идеи
      </div>
      <Banners />

      <div className="border-t border-gray-600 my-8"></div>

      <div>
        <h2 className=" font-unbounded-variable text-3xl sm:text-4xl md:text-4xl lg:text-5xl mb-4">
          Наши клиенты
        </h2>
        <p className="py-1 font-fivo-sans font-thin text-gray-300 text-opacity-80 text-base lg:text-lg sm:text-sm">
          Вы будете в хорошей компании
        </p>
      </div>
      <Customers />
    </main>
  )
}

export default Home
