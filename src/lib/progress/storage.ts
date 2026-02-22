const STORAGE_KEY = 'mcp-tutorial-progress'

/**
 * Safely get item from localStorage
 * Returns null if localStorage is not available (SSR)
 */
function getStorage(): Storage | null {
  if (typeof window === 'undefined') return null
  try {
    return window.localStorage
  } catch {
    return null
  }
}

/**
 * Load data from localStorage
 */
export function loadFromStorage<T>(key: string, defaultValue: T): T {
  const storage = getStorage()
  if (!storage) return defaultValue

  try {
    const item = storage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error(`Failed to load from localStorage (${key}):`, error)
    return defaultValue
  }
}

/**
 * Save data to localStorage
 */
export function saveToStorage<T>(key: string, value: T): boolean {
  const storage = getStorage()
  if (!storage) return false

  try {
    storage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.error(`Failed to save to localStorage (${key}):`, error)
    return false
  }
}

/**
 * Remove data from localStorage
 */
export function removeFromStorage(key: string): boolean {
  const storage = getStorage()
  if (!storage) return false

  try {
    storage.removeItem(key)
    return true
  } catch (error) {
    console.error(`Failed to remove from localStorage (${key}):`, error)
    return false
  }
}

/**
 * Load progress state from localStorage
 */
export function loadProgressState<T>(defaultValue: T): T {
  return loadFromStorage(STORAGE_KEY, defaultValue)
}

/**
 * Save progress state to localStorage
 */
export function saveProgressState<T>(state: T): boolean {
  return saveToStorage(STORAGE_KEY, state)
}

/**
 * Clear progress from localStorage
 */
export function clearProgressState(): boolean {
  return removeFromStorage(STORAGE_KEY)
}
