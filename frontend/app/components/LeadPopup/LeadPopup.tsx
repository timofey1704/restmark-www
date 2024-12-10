'use client'

import React from 'react'
import { Provider } from 'react-redux'
import store from '../../redux/store'
import LeadPopupContent from './LeadPopupContent'
import { LeadPopupProps } from '@/app/types'

const LeadPopup: React.FC<LeadPopupProps> = ({ onClose }) => {
  return (
    <Provider store={store}>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <LeadPopupContent onClose={onClose} />
      </div>
    </Provider>
  )
}

export default LeadPopup
