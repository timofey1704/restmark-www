'use client'

import React, { useState } from 'react'
import LeadPopup from '../LeadPopup/LeadPopup'
import { CallButtonProps } from '@/app/types'

const CallButton: React.FC<CallButtonProps> = ({ text }) => {
  const [isPopupVisible, setPopupVisible] = useState(false)

  const handleOpenPopup = () => {
    setPopupVisible(true)
  }

  const handleClosePopup = () => {
    setPopupVisible(false)
  }

  return (
    <>
      {isPopupVisible && <LeadPopup onClose={handleClosePopup} />}
      <button
        className="mt-2 px-2 py-1 text-opacity-70 text-white rounded-lg underline"
        onClick={handleOpenPopup}
      >
        {text}
      </button>
    </>
  )
}

export default CallButton
