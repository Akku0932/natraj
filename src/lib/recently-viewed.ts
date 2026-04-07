const STORAGE_KEY = 'natraj-recently-viewed'
const MAX_ITEMS = 8

export function addToRecentlyViewed(slug: string): void {
  if (typeof window === 'undefined') return
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    let items: string[] = stored ? JSON.parse(stored) : []
    // Remove if already exists (to move to front)
    items = items.filter((item) => item !== slug)
    // Add to front
    items.unshift(slug)
    // Limit
    items = items.slice(0, MAX_ITEMS)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {
    // Silently fail on storage errors
  }
}

export function getRecentlyViewed(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function clearRecentlyViewed(): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Silently fail
  }
}
