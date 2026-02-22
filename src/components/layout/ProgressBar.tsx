"use client"

import { tutorialModules } from '@/lib/navigation'
import { useProgressStore } from '@/lib/progress'
import { cn } from '@/lib/utils'
import { Progress } from '@/components/ui/progress'

interface ProgressBarProps {
  className?: string
}

export function ProgressBar({ className }: ProgressBarProps) {
  const { completedSections } = useProgressStore()

  // Calculate total sections and completed sections
  const totalSections = tutorialModules.reduce(
    (acc, module) => acc + module.sections.length,
    0
  )

  const completedCount = Object.values(completedSections).filter(Boolean).length
  const progressPercent = totalSections > 0 ? (completedCount / totalSections) * 100 : 0

  return (
    <div className={cn("w-full", className)}>
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="flex items-center justify-between gap-4 py-2">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">Progress</span>
            <span className="text-muted-foreground">
              {completedCount} / {totalSections} sections
            </span>
          </div>
          <span className="text-sm font-medium text-primary">
            {Math.round(progressPercent)}%
          </span>
        </div>
        <Progress value={progressPercent} className="h-2" />
      </div>
    </div>
  )
}
