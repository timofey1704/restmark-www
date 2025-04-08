'use client'
import { useState } from 'react'

interface ShowMoreProps {
  text?: string
}

const ShowMore = ({ text }: ShowMoreProps) => {
  const [isExpandedMobile, setIsExpandedMobile] = useState(false)
  const [isExpandedDesktop, setIsExpandedDesktop] = useState(false)

  if (!text) return null

  const maxLength = {
    mobile: 250,
    desktop: 500,
  }

  return (
    <div className="pb-5 px-2 mr-3">
      {/* Mobile */}
      <div
        className={`lg:hidden text-justify overflow-hidden transition-all duration-300 ease-in-out 
          ${isExpandedMobile ? 'max-h-[2000px]' : 'max-h-[300px]'}`}
      >
        {isExpandedMobile || text.length <= maxLength.mobile
          ? text
          : `${text.slice(0, maxLength.mobile)}...`}
      </div>
      {text.length > maxLength.mobile && (
        <button
          onClick={() => setIsExpandedMobile(!isExpandedMobile)}
          className="lg:hidden text-blue-600 hover:text-blue-800 mt-2 text-sm font-medium transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          <span className="flex items-center gap-2">
            {isExpandedMobile ? 'Скрыть' : 'Показать больше'}
            <svg
              className={`w-4 h-4 transition-transform duration-300 
                ${isExpandedMobile ? 'rotate-180' : 'rotate-0'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </button>
      )}

      {/* Desktop */}
      <div
        className={`hidden lg:block text-justify overflow-hidden transition-all duration-300 ease-in-out 
          ${isExpandedDesktop ? 'max-h-[2000px]' : 'max-h-[300px]'}`}
      >
        {isExpandedDesktop || text.length <= maxLength.desktop
          ? text
          : `${text.slice(0, maxLength.desktop)}...`}
      </div>
      {text.length > maxLength.desktop && (
        <button
          onClick={() => setIsExpandedDesktop(!isExpandedDesktop)}
          className="hidden lg:inline-block text-blue-600 hover:text-blue-800 mt-2 text-sm font-medium transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          <span className="flex items-center gap-2">
            {isExpandedDesktop ? 'Скрыть' : 'Показать больше'}
            <svg
              className={`w-4 h-4 transition-transform duration-300 
                ${isExpandedDesktop ? 'rotate-180' : 'rotate-0'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </button>
      )}
    </div>
  )
}

export default ShowMore
