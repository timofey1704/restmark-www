'use client'

import React, { useState } from 'react'
import LeadPopupContent from './LeadPopupContent'
import { CallButtonProps } from '@/app/types'

const CallButton: React.FC<CallButtonProps> = ({ text }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-gray-300 hover:text-white transition-colors underline"
      >
        {text}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <LeadPopupContent onClose={() => setIsOpen(false)} />
        </div>
      )}
    </>
  )
}

export default CallButton
