import { configureStore } from '@reduxjs/toolkit'
import leadReducer from './slices/leadSlice'
import authReducer from './slices/authSlice'
import notificationReducer from './slices/notificationSlice'

const store = configureStore({
  reducer: {
    leads: leadReducer, //управление лидами
    auth: authReducer, //управление авторизацией
    notification: notificationReducer, //управление тостами
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
