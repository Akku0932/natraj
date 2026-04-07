'use client'

import { create } from 'zustand'

export type PageView = 'home' | 'about' | 'products' | 'contact' | 'terms' | 'privacy'

interface StoreState {
  currentPage: PageView
  setCurrentPage: (page: PageView) => void

  selectedCategory: string | null
  setSelectedCategory: (slug: string | null) => void

  selectedProduct: string | null
  setSelectedProduct: (slug: string | null) => void

  productDetailOpen: boolean
  setProductDetailOpen: (open: boolean) => void

  // Mobile menu
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void

  // Modals
  termsOpen: boolean
  setTermsOpen: (open: boolean) => void

  privacyOpen: boolean
  setPrivacyOpen: (open: boolean) => void
}

export const useStore = create<StoreState>((set) => ({
  currentPage: 'home',
  setCurrentPage: (page) => {
    set({ currentPage: page, selectedCategory: null, selectedProduct: null, productDetailOpen: false })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  },

  selectedCategory: null,
  setSelectedCategory: (slug) => set({ selectedCategory: slug }),

  selectedProduct: null,
  setSelectedProduct: (slug) => set({ selectedProduct: slug }),

  productDetailOpen: false,
  setProductDetailOpen: (open) => set({ productDetailOpen: open }),

  mobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),

  termsOpen: false,
  setTermsOpen: (open) => set({ termsOpen: open }),

  privacyOpen: false,
  setPrivacyOpen: (open) => set({ privacyOpen: open }),
}))
