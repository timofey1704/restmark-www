import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {},
  reducers: {
    showSuccess: (state, action) => {
      const { message, position } = action.payload
      toast.success(message, { position })
    },
    showError: (state, action) => {
      const { message, position } = action.payload
      toast.error(message, { position })
    },
    showInfo: (state, action) => {
      const { message, icon, position } = action.payload
      const messageWithIcon = icon ? `${icon} ${message}` : message
      toast(messageWithIcon, { position })
    },
  },
})

export const { showSuccess, showError, showInfo } = notificationSlice.actions

export default notificationSlice.reducer

// Примеры использования:
// dispatch(showSuccess({ message: 'Вход выполнен успешно!', position: 'top-right' })) -- на успешное действие
// dispatch(showError({ message: 'Ошибка при входе!', position: 'bottom-center' })) -- на ошибку
// dispatch(showInfo({ message: 'Вход выполнен успешно!', icon: '✅', position: 'top-right' })) -- обычное с эмодзи
// dispatch(showInfo({ message: 'Ошибка при входе!', position: 'bottom-center' })) -- обычное без эмодзи
