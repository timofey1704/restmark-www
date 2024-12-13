import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import { fetchSitemapLinks } from '@/lib/fetchSitemapLinks'

export const metadata: Metadata = {
  title: 'Карта сайта | Restmark',
  description:
    'Карта сайта Restmark — полный список страниц, включая продукты, контакты и многое другое. Легко находите нужную информацию.',
  openGraph: {
    title: 'Карта сайта | Restmark',
    description:
      'Карта сайта Restmark — полный список страниц, включая продукты, контакты и многое другое. Легко находите нужную информацию.',
    url: 'https://restmark.by/sitemap/',
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
    title: 'Карта сайта | Restmark',
    description:
      'Карта сайта Restmark — полный список страниц, включая продукты, контакты и многое другое. Легко находите нужную информацию.',
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
    canonical: 'https://restmark.by/sitemap/',
  },
  robots: {
    index: true,
    follow: true,
  },
}

// export const revalidate = 2592000 // 30 дней

export default async function Sitemap() {
  const sections = (await fetchSitemapLinks()) || []

  return (
    <main className="w-3/4 mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8 text-center">Карта сайта</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {sections.length > 0 ? (
          sections.map((section, index) => (
            <div key={index} className="p-4 shadow-md">
              <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
              <ul>
                {section.links.map((link, idx) => (
                  <li key={idx} className="mb-2">
                    <Link
                      href={link.href}
                      className="text-blue-500 hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <div className="text-center">Тут пока ничего нет!</div>
        )}
      </div>
    </main>
  )
}
