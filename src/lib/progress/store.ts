import { create } from 'zustand'
import { ProgressState, ProgressExport, ModuleProgress } from './types'
import { loadProgressState, saveProgressState, clearProgressState } from './storage'

const STORAGE_VERSION = '1.0.0'

/**
 * Initial state for progress tracking
 */
const initialState = {
  completedModules: [],
  currentModule: null,
  completedSections: {},
  currentSection: null,
  startedAt: null,
  lastAccessedAt: null,
}

/**
 * Create the progress store with localStorage persistence
 */
export const useProgressStore = create<ProgressState>()((set, get) => ({
  ...loadProgressState(initialState),

  /**
   * Start a module - sets it as current and initializes timestamp
   */
  startModule: (moduleId: string) => {
    set((state) => {
      const newState = {
        ...state,
        currentModule: moduleId,
        startedAt: state.startedAt || Date.now(),
        lastAccessedAt: Date.now(),
      }
      saveProgressState(newState)
      return newState
    })
  },

  /**
   * Mark a section as completed within a module
   * If all sections in a module are complete, marks module as complete
   */
  completeSection: (moduleId: string, sectionId: string) => {
    set((state) => {
      const sectionKey = `${moduleId}:${sectionId}`
      const newCompletedSections = {
        ...state.completedSections,
        [sectionKey]: true,
      }

      const newState = {
        ...state,
        completedSections: newCompletedSections,
        currentSection: sectionId,
        lastAccessedAt: Date.now(),
      }

      // Check if all sections for this module are complete
      // This would need to be configured based on actual module structure
      // For now, just mark the module as complete if this section is done
      if (!state.completedModules.includes(moduleId)) {
        newState.completedModules = [...state.completedModules, moduleId]
      }

      saveProgressState(newState)
      return newState
    })
  },

  /**
   * Reset all progress to initial state
   */
  resetProgress: () => {
    const newState = {
      ...initialState,
      lastAccessedAt: Date.now(),
    }
    set(newState)
    saveProgressState(newState)
    clearProgressState()
  },

  /**
   * Export progress for backup
   */
  exportProgress: (): ProgressExport => {
    const state = get()
    return {
      completedModules: state.completedModules,
      currentModule: state.currentModule,
      completedSections: state.completedSections,
      currentSection: state.currentSection,
      startedAt: state.startedAt,
      lastAccessedAt: state.lastAccessedAt,
      version: STORAGE_VERSION,
    }
  },

  /**
   * Import progress from backup
   */
  importProgress: (data: ProgressExport) => {
    const newState = {
      completedModules: data.completedModules || [],
      currentModule: data.currentModule || null,
      completedSections: data.completedSections || {},
      currentSection: data.currentSection || null,
      startedAt: data.startedAt || null,
      lastAccessedAt: Date.now(),
    }
    set(newState)
    saveProgressState(newState)
  },
}))

/**
 * Selector hooks for common use cases
 */
export const useCurrentModule = () => useProgressStore((state) => state.currentModule)
export const useCompletedModules = () => useProgressStore((state) => state.completedModules)
export const useModuleProgress = (moduleId: string): ModuleProgress => {
  const isCompleted = useProgressStore((state) => state.completedModules.includes(moduleId))
  const isCurrent = useProgressStore((state) => state.currentModule === moduleId)
  return { isCompleted, isCurrent }
}
