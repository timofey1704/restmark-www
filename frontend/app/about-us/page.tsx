import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us - Restmark',
  description:
    'Свяжитесь с нами для покупки и оснащения ресторанов, баров и кафе в Беларуси.',
  openGraph: {
    title: 'About Us - Restmark',
    description:
      'Свяжитесь с нами для покупки и оснащения ресторанов, баров и кафе в Беларуси.',
    url: 'https://restmark.by/about-us',
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
    title: 'About Us - Restmark',
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
    canonical: 'https://restmark.by/about-us',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const AboutUsPage = () => {
  return (
    <div className="w-3/4 mx-auto py-12 px-6 text-justify">
      <h1 className="text-4xl font-bold mb-8">О Нас</h1>
      <p className="mb-6">
        Наша компания — ваш надежный партнер в мире профессионального оснащения
        для гостиниц, ресторанов и баров. Мы предлагаем широкий ассортимент
        посуды, кухонных и барных принадлежностей, а также мебели, которые
        идеально подойдут как для демократичных заведений, так и для роскошных
        интерьеров.
      </p>
      <p className="mb-6">
        Как официальный дилер таких известных брендов, как Rona, Pasabahce,
        Churchill, Schott Zwiesel, Contacto, Sola и других, мы обеспечиваем
        доступ к продукции высочайшего качества, отвечающей потребностям самых
        требовательных клиентов. Наше участие в специализированных выставках и
        многочисленные награды подтверждают наше стремление быть лучшими в своей
        сфере и заслуженное доверие не только наших клиентов, но и ведущих
        производителей.
      </p>
      <p className="mb-6">
        Мы стремимся сделать ваше сотрудничество с нами максимально комфортным и
        выгодным. Ассортимент нашей продукции постоянно расширяется и
        совершенствуется, чтобы всегда соответствовать вашим ожиданиям.
        Свяжитесь с нами по телефону
        <a
          href="tel:+375447909381"
          className="text-blue-400 hover:text-blue-600"
        >
          {' '}
          +375(44)790-93-81
        </a>
        , и наши опытные менеджеры помогут вам подобрать именно то, что вам
        нужно.
      </p>
    </div>
  )
}

export default AboutUsPage
