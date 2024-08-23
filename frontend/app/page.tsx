import React from 'react'
import Banners from './components/ProductContainer/Banners'

const Home = () => {
  return (
    <main className="">
      <div className="font-bold text-8xl ml-20">
        <p>Посуда и принадлежности</p>
        <p>для гостиниц и ресторанов</p>
      </div>

      <div className="py-6 pl-24 font-thin text-lg">
        Качественная продукция как для демократичных заведений, так и заведений
        класса люкс
      </div>

      <Banners />
    </main>
  )
}

export default Home
