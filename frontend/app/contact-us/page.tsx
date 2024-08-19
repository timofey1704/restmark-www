'use client'

import dynamic from 'next/dynamic'
import React from 'react'

// динамический импорт MapComponent
const MapComponent = dynamic(
  () => import('../components/MapContainer/MapComponent'),
  {
    ssr: false, // отключаем серверный рендеринг для компонента
  }
)

export default function ContactUsPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold mb-8">Cвязаться с нами</h1>
      <h2 className="text-2xl font-bold mb-4">Мы находимся здесь:</h2>
      <MapComponent />
      <div className="flex flex-col text-xl font-bond my-4">
        Наши контакты:
        <span>
          {' '}
          <a
            href="https://t.me/RestMarkBY"
            className="text-blue-400 hover:text-blue-600"
          >
            {' '}
            Telegram
          </a>
        </span>
        <span>
          <a
            href="viber://chat?number=%2B375447909381"
            className="text-blue-400 hover:text-blue-600"
          >
            {' '}
            Viber
          </a>
        </span>
      </div>
    </div>
  )
}
