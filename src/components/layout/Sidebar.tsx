"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { tutorialModules } from '@/lib/navigation'
import { useProgressStore } from '@/stores/progressStore'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ChevronRight, CheckCircle2, Circle, BookOpen, Zap } from 'lucide-react'
import { useState } from 'react'

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const chapters = useProgressStore((state) => state.chapters)
  const [collapsedModules, setCollapsedModules] = useState<Set<string>>(new Set())

  const toggleModule = (moduleId: string) => {
    setCollapsedModules(prev => {
      const next = new Set(prev)
      if (next.has(moduleId)) {
        next.delete(moduleId)
      } else {
        next.add(moduleId)
      }
      return next
    })
  }

  const isModuleActive = (module: typeof tutorialModules[0]) => {
    return pathname.startsWith(`/tutorials/${module.id}`)
  }

  const isSectionActive = (moduleId: string, sectionSlug: string) => {
    return pathname === `/tutorials/${moduleId}/${sectionSlug}`
  }

  const getSectionProgress = (moduleId: string, sections: typeof tutorialModules[0]['sections']) => {
    const completedCount = sections.filter(section =>
      chapters[`${moduleId}/${section.slug}`]?.completed
    ).length
    return { completedCount, totalCount: sections.length }
  }

  return (
    <aside className={cn("border-r border-border/40 bg-background/50 backdrop-blur-sm", className)}>
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <nav className="space-y-1 p-4">
          {/* Home Link */}
          <Link
            href="/"
            className={cn(
              "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
              pathname === "/"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
            )}
          >
            <BookOpen className={cn("h-4 w-4", pathname === "/" && "text-primary-foreground")} />
            <span>Overview</span>
          </Link>

          <div className="my-3 border-t border-border/40" />

          {/* Modules */}
          {tutorialModules.map((module) => {
            const isCollapsed = collapsedModules.has(module.id)
            const isActive = isModuleActive(module)
            const { completedCount, totalCount } = getSectionProgress(module.id, module.sections)
            const isComplete = completedCount === totalCount && totalCount > 0
            const progressRatio = totalCount > 0 ? completedCount / totalCount : 0

            return (
              <div key={module.id} className="space-y-1">
                {/* Module Header */}
                <button
                  onClick={() => toggleModule(module.id)}
                  className={cn(
                    "flex w-full items-center justify-between gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary/10 text-primary shadow-sm"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="relative">
                      {isComplete ? (
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                        </div>
                      ) : isActive ? (
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20">
                          <Zap className="h-3 w-3 text-primary" />
                        </div>
                      ) : (
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted/50">
                          <Circle className="h-3 w-3 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <span className="truncate">{module.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Progress indicator */}
                    <div className="flex items-center gap-1.5">
                      <div className="h-1.5 w-12 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary transition-all duration-300"
                          style={{ width: `${progressRatio * 100}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-muted-foreground tabular-nums">
                        {completedCount}/{totalCount}
                      </span>
                    </div>
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 transition-transform duration-200 text-muted-foreground",
                        !isCollapsed && "rotate-90"
                      )}
                    />
                  </div>
                </button>

                {/* Sections */}
                {!isCollapsed && (
                  <div className="ml-2 space-y-0.5 border-l border-border/40 pl-2">
                    {module.sections.map((section, sectionIndex) => {
                      const isSectionCompleted = chapters[`${module.id}/${section.slug}`]?.completed
                      const isSectionActivePath = isSectionActive(module.id, section.slug)

                      return (
                        <Link
                          key={section.id}
                          href={`/tutorials/${module.id}/${section.slug}`}
                          className={cn(
                            "group flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all duration-200",
                            isSectionActivePath
                              ? "bg-primary/15 text-primary font-medium"
                              : "text-muted-foreground/80 hover:bg-accent/30 hover:text-accent-foreground"
                          )}
                        >
                          <span className="text-[10px] text-muted-foreground/50 w-4">
                            {sectionIndex + 1}
                          </span>
                          {isSectionCompleted ? (
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                          ) : (
                            <Circle className={cn(
                              "h-3.5 w-3.5 flex-shrink-0",
                              isSectionActivePath ? "fill-primary/20 text-primary" : "text-muted-foreground/30"
                            )} />
                          )}
                          <span className="truncate flex-1">{section.title}</span>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </ScrollArea>
    </aside>
  )
}
