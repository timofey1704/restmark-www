import { createSlice } from '@reduxjs/toolkit'

// проверка на клиентскую среду
const isClient = typeof window !== 'undefined'

const initialState = {
  isAuthenticated: isClient ? !!localStorage.getItem('token') : false,
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true
      state.user = action.payload.user
      if (isClient) {
        localStorage.setItem('token', action.payload.token)
      }
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      if (isClient) {
        localStorage.removeItem('token')
      }
    },
  },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
