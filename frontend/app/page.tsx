import React from 'react'
import Banners from './components/ProductContainer/Banners'
import CallButton from './components/LeadPopup/CallButton'
import Customers from './components/Customers/Customers'

const Home = () => {
  return (
    <main className="">
      <div className="font-bold font-unbounded-variable text-6xl ml-20">
        <p>Комплексное оснащение</p>
        <p>ресторанов, баров и гостинниц</p>
      </div>

      <div className="py-6 ml-20 font-fivo-sans font-thin text-lg">
        Мы помогаем реализовывать Ваши идеи
      </div>
      <Banners />

      <Customers />
    </main>
  )
}

export default Home
