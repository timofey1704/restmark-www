'use client'

import React, { useState } from 'react'
import { Provider } from 'react-redux'
import store from '../../redux/store'
import LeadPopupContent from './LeadPopupContent'

export default function LeadPopup() {
  const [isPopupVisible, setPopupVisible] = useState(true)

  const handleClosePopup = () => {
    setPopupVisible(false)
  }

  if (!isPopupVisible) {
    return null
  }

  return (
    <Provider store={store}>
      <LeadPopupContent onClose={handleClosePopup} />
    </Provider>
  )
}
