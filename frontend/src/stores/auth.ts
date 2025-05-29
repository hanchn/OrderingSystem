import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/types'
import { authApi } from '@/api/modules/auth'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string>(localStorage.getItem('token') || '')
  const user = ref<User | null>(null)
  const loading = ref(false)

  const isLoggedIn = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  const isStaff = computed(() => user.value?.role === 'staff')

  // 登录
  const login = async (credentials: { username: string; password: string }) => {
    loading.value = true
    try {
      const response = await authApi.login(credentials)
      const { token: newToken, user: userData } = response.data.data
      
      token.value = newToken
      user.value = userData
      localStorage.setItem('token', newToken)
      
      return { success: true }
    } catch (error: any) {
      return { success: false, message: error.message }
    } finally {
      loading.value = false
    }
  }

  // 注册
  const register = async (userData: {
    username: string
    password: string
    phone: string
  }) => {
    loading.value = true
    try {
      const response = await authApi.register(userData)
      return { success: true, data: response.data.data }
    } catch (error: any) {
      return { success: false, message: error.message }
    } finally {
      loading.value = false
    }
  }

  // 获取用户信息
  const getUserInfo = async () => {
    if (!token.value) return
    
    try {
      const response = await authApi.getUserInfo()
      user.value = response.data.data
    } catch (error) {
      logout()
    }
  }

  // 登出
  const logout = () => {
    token.value = ''
    user.value = null
    localStorage.removeItem('token')
  }

  return {
    token,
    user,
    loading,
    isLoggedIn,
    isAdmin,
    isStaff,
    login,
    register,
    getUserInfo,
    logout
  }
})