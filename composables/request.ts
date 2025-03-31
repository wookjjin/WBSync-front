import axios from 'axios'

import { useLoadingStore } from '~/store/progress'

declare module 'axios' {
  interface AxiosRequestMeta {
    meta?: {
      timeout?: number,
    },
  }
}

const baseURL: string = 'http://localhost:5000'

const instance = axios.create({
  baseURL,
  headers: { }
})

instance.interceptors.request.use(
  (config) => {
    const loadingStore = useLoadingStore()
    loadingStore.startLoading()
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },

  (error) => {
    const loadingStore = useLoadingStore()
    loadingStore.stopLoading()
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    const loadingStore = useLoadingStore()
    loadingStore.stopLoading()
    return response
  },
  async (error) => {
    const loadingStore = useLoadingStore()
    loadingStore.stopLoading()

    const status = error.response?.status
    const originalRequest = error.config

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      const refreshToken = localStorage.getItem('refresh-token')
      if (!refreshToken) {
        localStorage.removeItem('token')
        return navigateTo('/auth/sign-in')
      }

      try {
        const result = await request.post('/auth/refresh-token', {
          refreshToken
        })
        const newAccessToken = result.data.accessToken
        localStorage.setItem('token', newAccessToken)
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return instance(originalRequest)
      } catch (accessError) {
        console.error(accessError)
        localStorage.removeItem('token')
        localStorage.removeItem('refresh-token')
        return navigateTo('/auth/sign-in')
      }
    }

    return Promise.reject(error)
  }
)

export default instance
