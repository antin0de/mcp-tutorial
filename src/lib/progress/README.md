# Progress Tracking Store

A Zustand-based state management solution for tracking user progress through the MCP tutorial, with automatic localStorage persistence.

## Features

- **Module-level progress**: Track which modules have been completed
- **Section-level progress**: Track individual section completion within modules
- **Quiz score tracking**: Save quiz scores with attempt history
- **Timestamp tracking**: Monitor when users started and last accessed the tutorial
- **Export/Import**: Backup and restore progress data
- **SSR-safe**: Handles server-side rendering gracefully
- **TypeScript**: Fully typed with TypeScript

## File Structure

```
src/lib/progress/
├── types.ts       # TypeScript interfaces and types
├── storage.ts     # localStorage wrapper utilities
├── store.ts       # Zustand store implementation
├── index.ts       # Barrel exports
└── README.md      # This file
```

## Usage

### Basic Usage

```tsx
import { useProgressStore } from '@/lib/progress'

function MyComponent() {
  const { currentModule, startModule } = useProgressStore()

  const handleStart = () => {
    startModule('intro-to-mcp')
  }

  return (
    <div>
      <p>Current: {currentModule}</p>
      <button onClick={handleStart}>Start Module</button>
    </div>
  )
}
```

### Using Selector Hooks

```tsx
import { useCurrentModule, useCompletedModules, useModuleProgress } from '@/lib/progress'

function ModuleList() {
  const currentModule = useCurrentModule()
  const completedModules = useCompletedModules()

  return (
    <ul>
      {modules.map((module) => {
        const { isCompleted, isCurrent } = useModuleProgress(module.id)

        return (
          <li key={module.id} className={isCompleted ? 'completed' : ''}>
            {module.name} {isCurrent && '(Current)'}
          </li>
        )
      })}
    </ul>
  )
}
```

### Completing Sections

```tsx
function SectionComplete({ moduleId, sectionId }) {
  const { completeSection } = useProgressStore()

  const handleComplete = () => {
    completeSection(moduleId, sectionId)
    // Show success message, navigate to next section, etc.
  }

  return <button onClick={handleComplete}>Mark Complete</button>
}
```

### Saving Quiz Scores

```tsx
function Quiz({ quizId }) {
  const { saveQuizScore } = useProgressStore()

  const handleSubmit = (score: number, passed: boolean) => {
    saveQuizScore(quizId, score, passed)
  }

  return <QuizForm onSubmit={handleSubmit} />
}
```

### Export/Import Progress

```tsx
function Settings() {
  const { exportProgress, importProgress, resetProgress } = useProgressStore()

  const handleExport = () => {
    const data = exportProgress()
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'mcp-tutorial-progress.json'
    a.click()
  }

  const handleImport = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)
        importProgress(data)
      } catch (error) {
        console.error('Failed to import progress:', error)
      }
    }
    reader.readAsText(file)
  }

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all progress?')) {
      resetProgress()
    }
  }

  return (
    <div>
      <button onClick={handleExport}>Export Progress</button>
      <input type="file" onChange={(e) => e.target.files?.[0] && handleImport(e.target.files[0])} />
      <button onClick={handleReset}>Reset Progress</button>
    </div>
  )
}
```

## API Reference

### State

| Property | Type | Description |
|----------|------|-------------|
| `completedModules` | `string[]` | Array of completed module IDs |
| `currentModule` | `string \| null` | Currently active module ID |
| `completedSections` | `Record<string, boolean>` | Map of section keys to completion status |
| `currentSection` | `string \| null` | Currently active section ID |
| `quizScores` | `Record<string, QuizScore>` | Map of quiz keys to score data |
| `startedAt` | `number \| null` | Timestamp when user started (milliseconds) |
| `lastAccessedAt` | `number \| null` | Timestamp of last access (milliseconds) |

### Actions

#### `startModule(moduleId: string)`
Sets the current module and initializes the start timestamp if not already set.

#### `completeSection(moduleId: string, sectionId: string)`
Marks a section as complete and updates the current section. The section key is formatted as `moduleId:sectionId`.

#### `saveQuizScore(key: string, score: number, passed: boolean)`
Saves a quiz score with automatic attempt tracking. Increments attempt count if quiz was previously attempted.

#### `resetProgress()`
Clears all progress data and resets to initial state.

#### `exportProgress(): ProgressExport`
Exports current progress state as a JSON-serializable object for backup.

#### `importProgress(data: ProgressExport)`
Imports progress data from a previously exported backup.

### Selector Hooks

- `useCurrentModule()` - Returns the current module ID
- `useCompletedModules()` - Returns array of completed module IDs
- `useQuizScores()` - Returns all quiz scores
- `useModuleProgress(moduleId: string)` - Returns `{ isCompleted, isCurrent }` for a specific module

## Data Persistence

Progress is automatically saved to localStorage under the key `mcp-tutorial-progress` on every state change. The storage layer handles:

- SSR compatibility (no-op on server)
- Error handling for quota exceeded or disabled storage
- JSON serialization/deserialization
- Type-safe default values

## TypeScript Types

All types are exported from `@/lib/progress/types`:

```typescript
import type { ProgressState, QuizScore, ProgressExport } from '@/lib/progress'
```

## Testing

See `src/lib/progress/__tests__/store.test.ts` for usage examples and testing patterns.
