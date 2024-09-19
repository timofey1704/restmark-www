'use client'

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { login } from '../redux/slices/authSlice'
import { showSuccess, showError } from '../redux/slices/notificationSlice'
import withReduxProvider from '../components/HOC/withReduxProvider'

const Login = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL

  const dispatch = useDispatch()
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${API_URL}/login`, {
        username,
        password,
      })

      if (response.status === 200 && response.data.success) {
        const { token, user } = response.data
        localStorage.setItem('token', token)
        dispatch(login({ token, user }))
        dispatch(
          showSuccess({
            message: 'Вход выполнен успешно!',
            position: 'top-center',
          })
        )
        router.push('/dashboard')
      } else {
        console.error(response.data.message)
      }
      if (response.data.reason === 'USER_NOT_ACTIVE') {
        dispatch(
          showError({
            message: 'Пользователь не активен!',
            position: 'bottom-center',
          })
        )
      }
    } catch (error) {
      dispatch(
        showError({
          message: 'Неверный логин или пароль!',
          position: 'bottom-center',
        })
      )
      console.error('Ошибка в авторизации', error)
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 pt-24">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
          Войдите в аккаунт администратора
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6"
            >
              Логин
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="username"
                autoComplete="username"
                required
                className="block w-full rounded-md border-0 py-1.5 shadow-sm pl-3 ring-1 ring-inset text-black ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-dark-red sm:text-sm sm:leading-6"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6"
              >
                Пароль
              </label>
              <div className="text-sm">
                <a
                  href="/password-recovery"
                  className="font-semibold hover:text-dark-red"
                >
                  Забыли пароль?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 shadow-sm pl-3 ring-1 ring-inset text-black ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-dark-red sm:text-sm sm:leading-6"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-red-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
            >
              Войти
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default withReduxProvider(Login)
