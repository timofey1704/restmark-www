import React from 'react'
import Link from 'next/link'
import { FaViber } from 'react-icons/fa'
import { IoIosCall } from 'react-icons/io'
import { FaTelegram } from 'react-icons/fa6'

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8 mt-auto">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-4">О нас</h3>
            <ul className="text-gray-400">
              <li className="mb-1">
                <Link href="/about-us" className="hover:underline">
                  Информация о компании
                </Link>
              </li>
              <li className="mb-1">
                <Link href="/contact-us" className="hover:underline">
                  Cвязаться с нами
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="hover:underline">
                  Карта сайта
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full text-2xl font-bold md:w-1/4 mb-6 md:mb-0">
            <a
              href="https://drive.google.com/drive/folders/1ifOXzKjgSUeBOZnH6DcxSbfK5QKtGjqQ"
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Каталоги
            </a>
          </div>

          <div className="w-full md:w-1/4">
            <h3 className="text-2xl font-bold mb-4">Наши контакты</h3>
            <div className="flex space-x-4 text-gray-400">
              <a
                href="tel:+375447909381"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IoIosCall className="h-6 w-6 hover:text-white" />
              </a>
              <a
                href="viber://chat?number=%2B375447909381"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaViber className="h-6 w-6 hover:text-white" />
              </a>
              <a
                href="https://t.me/RestMarkBY"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTelegram className="h-6 w-6 hover:text-white" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-600 pt-4">
          <p className="text-center text-gray-400">
            &copy; {new Date().getFullYear()} Created by{' '}
            <a
              href="https://t.me/mnk_mac1ntosh"
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              mnk_mac1ntosh
            </a>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
