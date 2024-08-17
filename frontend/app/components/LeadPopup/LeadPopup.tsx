'use client'

import React from 'react'
import { Provider } from 'react-redux'
import store from '../../redux/store'
import LeadPopupContent from './LeadPopupContent'

export default function LeadPopup() {
  return (
    <Provider store={store}>
      <LeadPopupContent />
    </Provider>
  )
}
