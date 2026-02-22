/**
 * Manual test component for progress store
 *
 * This file demonstrates how to use the progress store
 * In a real application, you would use a testing framework like Vitest
 */

import { useProgressStore } from '../store'

export function demoProgressStore() {
  // Get store methods
  const { startModule, completeSection, saveQuizScore, exportProgress, importProgress, resetProgress } = useProgressStore.getState()

  console.log('=== Progress Store Demo ===\n')

  // 1. Start a module
  console.log('1. Starting module-1...')
  startModule('module-1')
  console.log('Current state:', useProgressStore.getState())

  // 2. Complete a section
  console.log('\n2. Completing section-1 in module-1...')
  completeSection('module-1', 'section-1')
  console.log('Current state:', useProgressStore.getState())

  // 3. Save a quiz score
  console.log('\n3. Saving quiz score...')
  saveQuizScore('quiz-1', 85, true)
  console.log('Current state:', useProgressStore.getState())

  // 4. Export progress
  console.log('\n4. Exporting progress...')
  const exported = exportProgress()
  console.log('Exported data:', exported)

  // 5. Reset progress
  console.log('\n5. Resetting progress...')
  resetProgress()
  console.log('Current state:', useProgressStore.getState())

  // 6. Import progress
  console.log('\n6. Importing progress...')
  importProgress(exported)
  console.log('Current state:', useProgressStore.getState())

  console.log('\n=== Demo Complete ===')
}

// Uncomment to run in browser console:
// demoProgressStore()
