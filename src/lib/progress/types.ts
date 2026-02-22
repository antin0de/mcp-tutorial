/**
 * Progress export format for backup/restore
 */
export interface ProgressExport {
  completedModules: string[]
  currentModule: string | null
  completedSections: Record<string, boolean>
  currentSection: string | null
  startedAt: number | null
  lastAccessedAt: number | null
  version: string
}

/**
 * Module progress status
 */
export interface ModuleProgress {
  isCompleted: boolean
  isCurrent: boolean
}

/**
 * Main progress state interface
 */
export interface ProgressState {
  // Module-level progress
  completedModules: string[]
  currentModule: string | null

  // Section-level progress
  completedSections: Record<string, boolean>
  currentSection: string | null

  // Timestamps
  startedAt: number | null
  lastAccessedAt: number | null

  // Actions
  startModule: (moduleId: string) => void
  completeSection: (moduleId: string, sectionId: string) => void
  resetProgress: () => void
  exportProgress: () => ProgressExport
  importProgress: (data: ProgressExport) => void
}
