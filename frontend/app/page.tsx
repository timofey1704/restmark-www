import React from 'react'
import Banners from './components/ProductContainer/Banners'
import Customers from './components/Customers/Customers'

const Home = () => {
  return (
    <main className="w-3/4 mx-auto">
      <div className="font-unbounded text-3xl font-semibold sm:text-4xl md:text-4xl lg:text-5xl mb-4 mt-7">
        <p>Комплексное оснащение</p>
        <p>ресторанов, баров и гостинниц</p>
      </div>

      <div className="py-2 font-velasans font-thin text-gray-300 mb-4 text-base lg:text-lg sm:text-sm">
        Мы помогаем реализовывать Ваши идеи
      </div>
      <Banners />

      <div className="border-t border-gray-600 my-8"></div>

      <div>
        <h2 className="font-unbounded text-3xl sm:text-4xl md:text-4xl lg:text-5xl mb-4">
          Наши клиенты
        </h2>
        <p className="py-1 font-velasans font-thin text-gray-300  text-base lg:text-lg sm:text-sm">
          Вы будете в хорошей компании
        </p>
      </div>
      <Customers />
    </main>
  )
}

export default Home
