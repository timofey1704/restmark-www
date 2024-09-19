import React from 'react'
import Banners from './components/ProductContainer/Banners'
import CallButton from './components/LeadPopup/CallButton'
import Customers from './components/Customers/Customers'

const Home = () => {
  return (
    <main className="px-4 sm:px-6 lg:px-8">
      <div className="font-bold font-unbounded-variable text-3xl sm:text-5xl md:text-5xl lg:text-6xl mb-4">
        <p>Комплексное оснащение</p>
        <p>ресторанов, баров и гостинниц</p>
      </div>

      <div className="py-4 font-fivo-sans font-thin text-base lg:text-lg sm:text-sm">
        Мы помогаем реализовывать Ваши идеи
      </div>
      <Banners />

      {/* <Customers /> */}
    </main>
  )
}

export default Home
