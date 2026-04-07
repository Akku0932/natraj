'use client'

import { create } from 'zustand'

export type PageView = 'home' | 'about' | 'products' | 'contact' | 'terms' | 'privacy' | 'sitemap'

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

  // Comparison feature
  compareList: string[]
  compareOpen: boolean
  setCompareOpen: (open: boolean) => void
  addToCompare: (productId: string) => void
  removeFromCompare: (productId: string) => void
  clearCompare: () => void
  isInCompare: (productId: string) => boolean
  toggleCompare: (productId: string) => void

  // Wishlist feature
  wishlist: string[]
  toggleWishlist: (productId: string) => void
  isInWishlist: (productId: string) => boolean

  // Enquiry Cart feature
  enquiryCart: Array<{ slug: string; name: string; quantity: number; price: number | null }>
  enquiryCartOpen: boolean
  setEnquiryCartOpen: (open: boolean) => void
  addToEnquiryCart: (product: { slug: string; name: string; price: number | null }) => void
  removeFromEnquiryCart: (slug: string) => void
  updateEnquiryQuantity: (slug: string, quantity: number) => void
  clearEnquiryCart: () => void
  getEnquiryCartTotal: () => number
  getEnquiryCartCount: () => number
  isInEnquiryCart: (slug: string) => boolean
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

  // Comparison feature
  compareList: [],
  compareOpen: false,
  setCompareOpen: (open) => set({ compareOpen: open }),
  addToCompare: (productId) =>
    set((state) => {
      if (state.compareList.length >= 4) return state
      if (state.compareList.includes(productId)) return state
      return { compareList: [...state.compareList, productId] }
    }),
  removeFromCompare: (productId) =>
    set((state) => ({
      compareList: state.compareList.filter((id) => id !== productId),
    })),
  clearCompare: () => set({ compareList: [], compareOpen: false }),
  isInCompare: (productId) => {
    const state = useStore.getState()
    return state.compareList.includes(productId)
  },
  toggleCompare: (productId) =>
    set((state) => {
      if (state.compareList.includes(productId)) {
        return { compareList: state.compareList.filter((id) => id !== productId) }
      }
      if (state.compareList.length >= 4) return state
      return { compareList: [...state.compareList, productId] }
    }),

  // Wishlist feature
  wishlist: [],
  toggleWishlist: (productId) =>
    set((state) => {
      if (state.wishlist.includes(productId)) {
        return { wishlist: state.wishlist.filter((id) => id !== productId) }
      }
      return { wishlist: [...state.wishlist, productId] }
    }),
  isInWishlist: (productId) => {
    const state = useStore.getState()
    return state.wishlist.includes(productId)
  },

  // Enquiry Cart feature
  enquiryCart: [],
  enquiryCartOpen: false,
  setEnquiryCartOpen: (open) => set({ enquiryCartOpen: open }),
  addToEnquiryCart: (product) =>
    set((state) => {
      if (state.enquiryCart.some((item) => item.slug === product.slug)) return state
      return { enquiryCart: [...state.enquiryCart, { ...product, quantity: 1 }] }
    }),
  removeFromEnquiryCart: (slug) =>
    set((state) => ({
      enquiryCart: state.enquiryCart.filter((item) => item.slug !== slug),
    })),
  updateEnquiryQuantity: (slug, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        return { enquiryCart: state.enquiryCart.filter((item) => item.slug !== slug) }
      }
      return {
        enquiryCart: state.enquiryCart.map((item) =>
          item.slug === slug ? { ...item, quantity } : item
        ),
      }
    }),
  clearEnquiryCart: () => set({ enquiryCart: [], enquiryCartOpen: false }),
  getEnquiryCartTotal: () => {
    const state = useStore.getState()
    return state.enquiryCart.reduce(
      (total, item) => (item.price !== null ? total + item.price * item.quantity : total),
      0
    )
  },
  getEnquiryCartCount: () => {
    const state = useStore.getState()
    return state.enquiryCart.reduce((count, item) => count + item.quantity, 0)
  },
  isInEnquiryCart: (slug) => {
    const state = useStore.getState()
    return state.enquiryCart.some((item) => item.slug === slug)
  },
}))
