/**
 * Example components demonstrating progress store usage
 */

import { useProgressStore, useModuleProgress } from '@/lib/progress'

/**
 * Example 1: Track module progress
 */
export function ModuleTracker({ moduleId }: { moduleId: string }) {
  const { startModule } = useProgressStore()
  const { isCompleted, isCurrent } = useModuleProgress(moduleId)

  return (
    <div className="module-card">
      <h3>Module {moduleId}</h3>
      <div className="status">
        {isCompleted && <span className="badge completed">Completed</span>}
        {isCurrent && <span className="badge current">In Progress</span>}
      </div>
      {!isCurrent && (
        <button onClick={() => startModule(moduleId)}>
          Start Module
        </button>
      )}
    </div>
  )
}

/**
 * Example 2: Section completion tracker
 */
export function SectionContent({
  moduleId,
  sectionId,
  children,
}: {
  moduleId: string
  sectionId: string
  children: React.ReactNode
}) {
  const { completeSection, completedSections } = useProgressStore()
  const sectionKey = `${moduleId}:${sectionId}`
  const isCompleted = completedSections[sectionKey]

  const handleMarkComplete = () => {
    completeSection(moduleId, sectionId)
  }

  return (
    <section className="section">
      {children}
      {!isCompleted && (
        <button onClick={handleMarkComplete} className="mark-complete-btn">
          Mark as Complete
        </button>
      )}
      {isCompleted && (
        <p className="completion-message">✓ Section completed!</p>
      )}
    </section>
  )
}

/**
 * Example 3: Progress overview dashboard
 */
export function ProgressDashboard() {
  const {
    completedModules,
    currentModule,
    startedAt,
    lastAccessedAt,
  } = useProgressStore()

  return (
    <div className="dashboard">
      <h2>Learning Progress</h2>

      <div className="stats">
        <div className="stat">
          <h3>Modules Completed</h3>
          <p>{completedModules.length}</p>
        </div>

        <div className="stat">
          <h3>Current Module</h3>
          <p>{currentModule || 'Not started'}</p>
        </div>

        <div className="stat">
          <h3>Started Learning</h3>
          <p>{startedAt ? new Date(startedAt).toLocaleDateString() : 'Not started'}</p>
        </div>
      </div>

      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <p>Last accessed: {lastAccessedAt ? new Date(lastAccessedAt).toLocaleString() : 'Never'}</p>
      </div>
    </div>
  )
}
