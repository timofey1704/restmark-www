'use client'

import React, { useState, ChangeEvent } from 'react'
import InputMask from 'react-input-mask-next'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { toast } from 'react-hot-toast'
import { sendLead } from '../../redux/slices/leadSlice'
import { showSuccess, showError } from '../../redux/slices/notificationSlice'
import { LeadPopupContentProps } from '@/app/types'

const LeadPopupContent: React.FC<LeadPopupContentProps> = ({ onClose }) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const [clientName, setClientName] = useState('')
  const [phone, setPhone] = useState('')
  const [isClientNameEmpty, setIsClientNameEmpty] = useState(true)
  const dispatch = useDispatch<AppDispatch>()

  const handleTelegramRequest = async () => {
    if (!phone || !phone) {
      toast.error('Поля не могут быть пустыми!', { icon: '❗️' })
      return
    }

    const leadDetails = {
      message: `Клиент - ${clientName}, номер - ${phone} `,
    }

    try {
      await dispatch(
        sendLead({
          url: `${API_URL}/send-message`,
          data: leadDetails,
        })
      )
      onClose()
      dispatch(
        showSuccess({
          message: 'Заявка успешно отправлена!',
          position: 'top-center',
        })
      )
    } catch (error) {
      console.error('Ошибка при отправке сообщения:', error)
      dispatch(
        showError({
          message: 'Ошибка при отправке сообщения',
          position: 'top-center',
        })
      )
    }
  }

  const handleClientNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setClientName(e.target.value)
    setIsClientNameEmpty(e.target.value === '')
  }

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const phoneValue = e.target.value.replace(/\D/g, '')
    setPhone(phoneValue)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 relative max-w-md w-full border-2 border-gray-300">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &#10005;
        </button>

        <div className="text-xl font-semibold mb-4">Оставить заявку</div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="clientName">
              Ваше имя:
            </label>
            <div className="relative">
              <input
                type="text"
                id="clientName"
                value={clientName}
                onChange={handleClientNameChange}
                className="pl-3 pr-3 py-2 border border-gray-300 text-black rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="phone">
              Контактный телефон:
            </label>
            <div className="relative">
              <InputMask
                mask="+375 (99) 999-99-99"
                placeholder="+375 (__) ___-__-__"
                type="text"
                id="phone"
                value={phone}
                onChange={handlePhoneChange}
                className="px-3 py-2 border border-gray-300 rounded-md text-black w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleTelegramRequest}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
          >
            Оставить заявку
          </button>
        </form>
      </div>
    </div>
  )
}

export default LeadPopupContent
