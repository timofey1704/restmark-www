'use client'

import React, { useState } from 'react'
import LeadPopup from '../LeadPopup/LeadPopup'

const CallButton = () => {
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
        className="mt-8 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        onClick={handleOpenPopup}
      >
        Оставить заявку
      </button>
    </>
  )
}

export default CallButton
