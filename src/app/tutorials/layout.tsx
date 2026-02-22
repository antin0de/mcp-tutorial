"use client"

import Link from "next/link"
import { BookOpen, Home } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { tutorialModules } from "@/lib/navigation"
import { cn } from "@/lib/utils"
import { useProgressStore } from "@/stores/progressStore"

export default function TutorialsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const chapters = useProgressStore((state) => state.chapters)

  const calculateModuleProgress = (module: typeof tutorialModules[0]) => {
    const sectionIds = module.sections.map((s) => `${module.id}/${s.slug}`)
    const completed = sectionIds.filter(
      (id) => chapters[id]?.completed
    ).length
    return (completed / sectionIds.length) * 100
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-80 border-r bg-muted/10 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <Home className="h-5 w-5" />
            <span className="font-semibold">MCP Tutorial</span>
          </Link>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <BookOpen className="h-4 w-4" />
            <span>Learning Path</span>
          </div>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-4">
          <nav className="space-y-6 py-4">
            {tutorialModules.map((module) => {
              const progress = calculateModuleProgress(module)

              return (
                <div key={module.id} className="space-y-2">
                  <Link
                    href={`/tutorials/${module.id}`}
                    className="block group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-sm group-hover:text-primary transition-colors">
                        {module.order}. {module.title}
                      </h3>
                      <span className="text-xs text-muted-foreground">
                        {Math.round(progress)}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {module.description}
                    </p>
                  </Link>

                  <div className="pl-3 space-y-1">
                    {module.sections.map((section) => {
                      const sectionId = `${module.id}/${section.slug}`
                      const isCompleted = chapters[sectionId]?.completed

                      return (
                        <Link
                          key={section.id}
                          href={`/tutorials/${module.id}/${section.slug}`}
                          className={cn(
                            "flex items-center gap-2 py-1.5 px-2 rounded-md text-sm transition-colors",
                            "hover:bg-accent hover:text-accent-foreground",
                            isCompleted && "text-muted-foreground"
                          )}
                        >
                          <div
                            className={cn(
                              "h-1.5 w-1.5 rounded-full",
                              isCompleted
                                ? "bg-primary"
                                : "bg-muted-foreground/30"
                            )}
                          />
                          <span className="flex-1 truncate">
                            {section.title}
                          </span>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </nav>
        </ScrollArea>

        {/* Footer */}
        <div className="p-4 border-t">
          <div className="text-xs text-muted-foreground text-center">
            {Object.values(chapters).filter((c) => c.completed).length} sections completed
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="mx-auto w-full max-w-4xl py-8 px-8">
          {children}
        </div>
      </main>
    </div>
  )
}
