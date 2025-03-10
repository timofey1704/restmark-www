'use client'

import { useState } from 'react'
import LeadPopupContent from './LeadPopupContent'

export default function LeadPopup() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Оставить заявку
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <LeadPopupContent onClose={() => setIsOpen(false)} />
        </div>
      )}
    </>
  )
}
