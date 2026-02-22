/**
 * Progress tracking store with localStorage persistence
 *
 * Example usage:
 * ```tsx
 * import { useProgressStore } from '@/lib/progress'
 *
 * function Component() {
 *   const { startModule, currentModule } = useProgressStore()
 *   const handleClick = () => startModule('module-1')
 * }
 * ```
 */

export * from './types'
export * from './store'
export { loadProgressState, saveProgressState, clearProgressState } from './storage'
