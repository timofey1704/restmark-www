import React from 'react'
import Banners from './components/ProductContainer/Banners'
import LeadPopup from './components/LeadPopup/LeadPopup'

const Home = () => {
  return (
    <>
      <LeadPopup />
      <main className="">
        <div className="font-bold text-8xl ml-20">
          <p>Посуда и принадлежности</p>
          <p>для ресторанов, баров и гостинниц</p>
        </div>

        <div className="py-6 ml-20 font-thin text-lg">
          Качественная продукция как для демократичных заведений, так и
          заведений класса люкс
        </div>

        <Banners />
      </main>
    </>
  )
}

export default Home
