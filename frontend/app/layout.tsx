import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Restmark',
  description: 'Best Horeca supply company in Belarus',
  openGraph: {
    title: 'Restmark',
    description: 'Продажа посуды, полное оснащение ресторанов, баров и кафе',
    url: 'https://restmark.by',
    siteName: 'Restmark',
    images: [
      {
        url: 'https://i.ibb.co/gmqzzmb/header-logo-mod-1200x630.png',
        width: 1200,
        height: 630,
        alt: 'Restmark Logo',
      },
      {
        url: 'https://i.ibb.co/jhjh8vD/header-logo-mod.png',
        width: 344,
        height: 344,
        alt: 'Restmark Logo',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Restmark',
    description: 'Продажа посуды, полное оснащение ресторанов, баров и кафе',
    images: [
      {
        url: 'https://i.ibb.co/gmqzzmb/header-logo-mod-1200x630.png',
        width: 1200,
        height: 630,
        alt: 'Restmark Logo',
      },
      {
        url: 'https://i.ibb.co/jhjh8vD/header-logo-mod.png',
        width: 344,
        height: 344,
        alt: 'Restmark Logo',
      },
    ],
  },
  alternates: {
    canonical: 'https://restmark.by/',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta
          name="google-site-verification"
          content="hq2PDzQpvdhkcbqPe2GEORgm1_V3cKzBfCFZP7nF2PM"
        />
      </head>
      <body
        className={`${inter.className} bg-black text-white flex flex-col min-h-screen`}
      >
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
