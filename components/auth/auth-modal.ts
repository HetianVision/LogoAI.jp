'use client'

import { create } from 'zustand'

export interface AuthUser {
  id: string
  email: string
  createdAt: string
}

export interface PurchasedLogo {
  id: string
  brandName: string
  industryLabel: string
  plan: 'standard' | 'premium'
  options: string[]
  previewUrl: string
  purchasedAt: string
  downloadUrls: {
    svg: string
    png: string
    pdf: string
    certificate: string
  }
}

export interface Order {
  id: string
  brandName: string
  logoThumbUrl: string
  plan: 'standard' | 'premium'
  options: string[]
  total: number
  createdAt: string
}

interface AuthState {
  isOpen: boolean
  mode: 'login' | 'register' | 'reset-password'
  user: AuthUser | null
  isLoading: boolean
  error: string | null
  successMessage: string | null

  // Actions
  openModal: (mode?: 'login' | 'register' | 'reset-password') => void
  closeModal: () => void
  setMode: (mode: 'login' | 'register' | 'reset-password') => void
  setUser: (user: AuthUser | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setSuccessMessage: (message: string | null) => void
  clearMessages: () => void

  // Auth actions
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
}

// Mock user for demo
const MOCK_USER: AuthUser = {
  id: 'user-001',
  email: 'yamamoto@example.com',
  createdAt: '2024-08-15'
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isOpen: false,
  mode: 'login',
  user: null,
  isLoading: false,
  error: null,
  successMessage: null,

  openModal: (mode = 'login') => set({ isOpen: true, mode, error: null, successMessage: null }),
  closeModal: () => set({ isOpen: false, error: null, successMessage: null }),
  setMode: (mode) => set({ mode, error: null, successMessage: null }),
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setSuccessMessage: (successMessage) => set({ successMessage }),
  clearMessages: () => set({ error: null, successMessage: null }),

  login: async (email: string, password: string) => {
    const { setLoading, setError, closeModal, setUser } = get()
    setLoading(true)
    setError(null)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Mock validation
      if (!email || !password) {
        throw new Error('メールアドレスとパスワードを入力してください')
      }

      // Mock success - in real app, this would call your API
      const user: AuthUser = {
        id: 'user-001',
        email,
        createdAt: new Date().toISOString().split('T')[0]
      }

      setUser(user)
      closeModal()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'ログインに失敗しました')
      throw err
    } finally {
      setLoading(false)
    }
  },

  register: async (email: string, password: string) => {
    const { setLoading, setError, closeModal, setUser } = get()
    setLoading(true)
    setError(null)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Mock validation
      if (!email || !password) {
        throw new Error('メールアドレスとパスワードを入力してください')
      }

      if (password.length < 8) {
        throw new Error('パスワードは8文字以上必要です')
      }

      // Mock success
      const user: AuthUser = {
        id: `user-${Date.now()}`,
        email,
        createdAt: new Date().toISOString().split('T')[0]
      }

      setUser(user)
      closeModal()
    } catch (err) {
      setError(err instanceof Error ? err.message : '登録に失敗しました')
      throw err
    } finally {
      setLoading(false)
    }
  },

  logout: async () => {
    const { setUser } = get()
    setUser(null)
  },

  resetPassword: async (email: string) => {
    const { setLoading, setError, setSuccessMessage } = get()
    setLoading(true)
    setError(null)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (!email) {
        throw new Error('メールアドレスを入力してください')
      }

      setSuccessMessage('パスワードリセット手順をメール送信しました')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'リセットに失敗しました')
      throw err
    } finally {
      setLoading(false)
    }
  }
}))

// Dashboard store for logos and orders data
interface DashboardState {
  logos: PurchasedLogo[]
  orders: Order[]
  activeSection: 'logos' | 'orders' | 'account'
  isLoading: boolean

  // Actions
  setActiveSection: (section: 'logos' | 'orders' | 'account') => void
  setLogos: (logos: PurchasedLogo[]) => void
  setOrders: (orders: Order[]) => void
  setLoading: (loading: boolean) => void

  // Data fetching (mock)
  fetchLogos: () => Promise<void>
  fetchOrders: () => Promise<void>
}

// Mock data
const MOCK_LOGOS: PurchasedLogo[] = [
  {
    id: 'logo-001',
    brandName: 'cafe-amber',
    industryLabel: 'カフェ・咖啡庁',
    plan: 'premium',
    options: ['brand-guideline', 'sns-icon-set'],
    previewUrl: '/placeholder-logo-1.png',
    purchasedAt: '2025-01-15',
    downloadUrls: {
      svg: '/api/download/logo-001/svg',
      png: '/api/download/logo-001/png',
      pdf: '/api/download/logo-001/pdf',
      certificate: '/api/download/logo-001/certificate'
    }
  },
  {
    id: 'logo-002',
    brandName: 'yoga-studio-lotus',
    industryLabel: 'フィットネス・健身',
    plan: 'standard',
    options: [],
    previewUrl: '/placeholder-logo-2.png',
    purchasedAt: '2025-02-20',
    downloadUrls: {
      svg: '/api/download/logo-002/svg',
      png: '/api/download/logo-002/png',
      pdf: '/api/download/logo-002/pdf',
      certificate: '/api/download/logo-002/certificate'
    }
  }
]

const MOCK_ORDERS: Order[] = [
  {
    id: 'order-001',
    brandName: 'cafe-amber',
    logoThumbUrl: '/placeholder-logo-1.png',
    plan: 'premium',
    options: ['brand-guideline', 'sns-icon-set'],
    total: 24800,
    createdAt: '2025-01-15'
  },
  {
    id: 'order-002',
    brandName: 'yoga-studio-lotus',
    logoThumbUrl: '/placeholder-logo-2.png',
    plan: 'standard',
    options: [],
    total: 9800,
    createdAt: '2025-02-20'
  }
]

export const useDashboardStore = create<DashboardState>((set) => ({
  logos: [],
  orders: [],
  activeSection: 'logos',
  isLoading: false,

  setActiveSection: (activeSection) => set({ activeSection }),
  setLogos: (logos) => set({ logos }),
  setOrders: (orders) => set({ orders }),
  setLoading: (isLoading) => set({ isLoading }),

  fetchLogos: async () => {
    set({ isLoading: true })
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    set({ logos: MOCK_LOGOS, isLoading: false })
  },

  fetchOrders: async () => {
    set({ isLoading: true })
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    set({ orders: MOCK_ORDERS, isLoading: false })
  }
}))
